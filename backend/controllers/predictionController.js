const tf = require('@tensorflow/tfjs-node');
const ort = require('onnxruntime-node');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const Prediction = require('../models/predictionModel');

// Load models
let kerasModel = null;
let onnxModel = null;

const loadModels = async () => {
  try {
    // Load Keras model
    kerasModel = await tf.loadLayersModel('file://path/to/your/keras/model.json');
    
    // Load ONNX model
    const modelPath = path.join(__dirname, '../models/retina_segmentation.onnx');
    onnxModel = await ort.InferenceSession.create(modelPath);
    
    console.log('Models loaded successfully');
  } catch (error) {
    console.error('Error loading models:', error);
    throw error;
  }
};

// Initialize models when server starts
loadModels().catch(console.error);

const preprocessImage = async (imagePath, targetSize) => {
  const image = await sharp(imagePath)
    .resize(targetSize[0], targetSize[1])
    .normalize()
    .toBuffer();
  
  const tensor = tf.node.decodeImage(image, 3);
  return tensor.expandDims(0);
};

const runPrediction = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Preprocess image for both models
    const imageTensorKeras = await preprocessImage(req.file.path, [224, 224]);
    const imageTensorOnnx = await preprocessImage(req.file.path, [512, 512]);

    // Run Keras classification
    const classificationResult = await kerasModel.predict(imageTensorKeras).array();

    // Run ONNX segmentation
    const feeds = { input: imageTensorOnnx.arraySync() };
    const segmentationResult = await onnxModel.run(feeds);

    // Save results to MongoDB
    const prediction = new Prediction({
      userId: req.user.id,
      imagePath: req.file.path,
      classificationResult: classificationResult[0],
      segmentationResult: segmentationResult.output.data
    });
    await prediction.save();

    // Clean up tensors
    tf.dispose([imageTensorKeras, imageTensorOnnx]);

    res.json({
      message: 'Prediction completed successfully',
      classification: classificationResult[0],
      segmentation: segmentationResult.output.data
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ message: 'Error processing image' });
  }
};

module.exports = { runPrediction };
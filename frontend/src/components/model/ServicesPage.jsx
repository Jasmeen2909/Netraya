import './ServicesPage.css';
import eyeImage from '../../assets/exImage1.png';
import exImage1 from '../../assets/exImage1.png';
import exImage2 from '../../assets/exImage2.png';
import exImage3 from '../../assets/exImage3.png';
import exImage4 from '../../assets/exImage4.png';
import exImage5 from '../../assets/exImage5.png';
import { FaArrowUp, FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';

const ServicesPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setShowPreview(true);
        setResults(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runModel = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      // Convert base64 to blob
      const base64Response = await fetch(uploadedImage);
      const blob = await base64Response.blob();
      formData.append('image', blob, 'image.jpg');

      const response = await fetch('http://localhost:5000/api/users/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="services-container">
      <div className="content-section">
        <h1>Classify Image with automatic diabetic retinopathy detection system in seconds</h1>
        <p>Upload your retinal images to instantly detect diabetic retinopathy with our advanced AI-powered system.</p>
        <div className="button-container">
          <label htmlFor="file-upload" className="upload-button">
            <FaArrowUp className="icon-up-arrow" />
            Upload an Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>
        <p>Or select from below given examples</p>
        <div className="examples-container">
          <img src={exImage1} alt="Example 1" className="example-image" />
          <img src={exImage2} alt="Example 2" className="example-image" />
          <img src={exImage3} alt="Example 3" className="example-image" />
          <img src={exImage4} alt="Example 4" className="example-image" />
          <img src={exImage5} alt="Example 5" className="example-image" />
        </div>

        {showPreview && (
          <div className="preview-section">
            <h2>Preview of the Uploaded Image:</h2>
            {uploadedImage && (
              <>
                <img src={uploadedImage} alt="Uploaded Preview" className="uploaded-image" />
                <button 
                  className="run-model-button" 
                  onClick={runModel}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Run Model'}
                </button>

                {error && (
                  <div className="error-message">
                    Error: {error}
                  </div>
                )}

                {results && (
                  <div className="results-section">
                    <h3>Results:</h3>
                    <div className="classification-results">
                      <h4>Classification:</h4>
                      <pre>{JSON.stringify(results.classification, null, 2)}</pre>
                    </div>
                    <div className="segmentation-results">
                      <h4>Segmentation:</h4>
                      <pre>{JSON.stringify(results.segmentation, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="image-section">
        <img src={eyeImage} alt="Eye" className="main-image" />
      </div>
    </div>
  );
};

export default ServicesPage;
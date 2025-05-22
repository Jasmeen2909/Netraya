const express = require('express');
const { signup, login, completeProfile, upload } = require('../controllers/usercontroller');
const { runPrediction } = require('../controllers/predictionController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/complete-profile', authenticateToken, upload.single('file'), completeProfile);
router.post('/predict', authenticateToken, upload.single('image'), runPrediction);

module.exports = router;
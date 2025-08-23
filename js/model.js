// TensorFlow.js model loading and prediction
// Author: GitHub Copilot
// Date: August 2025

let wasteModel = null;
let modelLoaded = false;
let modelLoadingPromise = null;

// Model configuration
const MODEL_CONFIG = {
    modelUrl: './js/model/model.json', // Update this path after model conversion
    inputShape: [224, 224, 3],
    classes: ['Biodegradable', 'Non-Biodegradable'],
    threshold: 0.5
};

// Initialize model loading when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeModel();
});

// Initialize the model loading process
async function initializeModel() {
    const modelStatus = document.getElementById('modelStatus');
    
    try {
        // Show loading status
        if (modelStatus) {
            modelStatus.classList.add('active');
            updateModelStatus('Initializing TensorFlow.js...');
        }
        
        // Wait for TensorFlow.js to be ready
        await tf.ready();
        console.log('TensorFlow.js backend:', tf.getBackend());
        
        // Load the model
        await loadWasteModel();
        
    } catch (error) {
        console.error('Model initialization failed:', error);
        handleModelLoadError(error);
    } finally {
        // Hide loading status
        if (modelStatus) {
            setTimeout(() => {
                modelStatus.classList.remove('active');
            }, 1000);
        }
    }
}

// Load the waste classification model
async function loadWasteModel() {
    if (modelLoadingPromise) {
        return modelLoadingPromise;
    }
    
    modelLoadingPromise = (async () => {
        try {
            updateModelStatus('Loading AI model...');
            console.log('🔄 Loading model from ./js/model/model.json');
            
            // Debug: Check if model files exist
            console.log('📂 Model URL being used:', './js/model/model.json');
            console.log('🌍 Current base URL:', window.location.href);
            console.log('📍 Resolved model URL:', new URL('./js/model/model.json', window.location.href).href);
            
            // Try to load the model with different formats
            try {
                // First try: Standard format
                wasteModel = await tf.loadLayersModel('./js/model/model.json');
            } catch (formatError) {
                console.log('Standard format failed, trying graph model...');
                try {
                    // Second try: Graph model format
                    wasteModel = await tf.loadGraphModel('./js/model/model.json');
                } catch (graphError) {
                    console.log('Graph model failed, trying with custom load...');
                    // Third try: Load with custom configuration
                    wasteModel = await tf.loadLayersModel('./js/model/model.json', {
                        strict: false
                    });
                }
            }
            
            // Verify model loaded correctly
            if (!wasteModel) {
                throw new Error('Model failed to load');
            }
            
            // Warm up the model with a dummy prediction
            await warmUpModel();
            
            // Mark as loaded
            modelLoaded = true;
            window.wasteModel = wasteModel; // Make available globally
            
            updateModelStatus('Model loaded successfully!');
            console.log('Waste classification model loaded successfully');
            
            // Show success notification
            if (window.WasteAI && window.WasteAI.showNotification) {
                window.WasteAI.showNotification('AI model loaded successfully! Ready for predictions.', 'success');
            }
            
            return wasteModel;
            
        } catch (error) {
            console.warn('Failed to load production model:', error);
            
            // Fallback to demo mode
            await initializeDemoMode();
            throw error;
        }
    })();
    
    return modelLoadingPromise;
}

// Warm up the model with a dummy prediction
async function warmUpModel() {
    if (!wasteModel) return;
    
    try {
        updateModelStatus('Warming up model...');
        
        // Create a dummy input tensor
        const dummyInput = tf.zeros([1, ...MODEL_CONFIG.inputShape]);
        
        // Make a dummy prediction
        const prediction = await wasteModel.predict(dummyInput);
        
        // Clean up
        dummyInput.dispose();
        if (prediction.dispose) {
            prediction.dispose();
        }
        
        console.log('Model warmed up successfully');
        
    } catch (error) {
        console.warn('Model warm-up failed:', error);
        // Non-critical error, continue anyway
    }
}

// Initialize demo mode when model can't be loaded
async function initializeDemoMode() {
    updateModelStatus('Initializing demo mode...');
    
    // Create a mock model for demonstration
    window.wasteModel = {
        predict: async function(tensor) {
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Generate random but realistic prediction
            const randomValue = Math.random();
            const prediction = {
                data: async () => [randomValue],
                dispose: () => {}
            };
            
            return prediction;
        }
    };
    
    modelLoaded = true;
    console.log('Demo mode initialized');
    
    if (window.WasteAI && window.WasteAI.showNotification) {
        window.WasteAI.showNotification(
            '🎭 Demo mode: Upload images to see simulated AI predictions!', 
            'info'
        );
    }
    
    updateModelStatus('Demo mode ready - try uploading an image!');
}

// Update model loading status
function updateModelStatus(message) {
    const statusElement = document.querySelector('#modelStatus p');
    if (statusElement) {
        statusElement.textContent = message;
    }
    console.log('Model Status:', message);
}

// Handle model loading errors
function handleModelLoadError(error) {
    console.error('Model loading error:', error);
    
    let errorMessage = 'Failed to load AI model. ';
    
    if (error.message.includes('404') || error.message.includes('Not Found')) {
        errorMessage += 'Model file not found. Please ensure the model is converted and placed in the correct directory.';
    } else if (error.message.includes('CORS')) {
        errorMessage += 'CORS error. Please serve the website from a web server (not file://).';
    } else if (error.message.includes('network')) {
        errorMessage += 'Network error. Please check your connection and try again.';
    } else {
        errorMessage += 'Please check the console for details.';
    }
    
    if (window.WasteAI && window.WasteAI.showNotification) {
        window.WasteAI.showNotification(errorMessage, 'error');
    }
    
    // Initialize demo mode as fallback
    initializeDemoMode();
}

// Make a prediction on an image
async function predictImage(imageElement) {
    if (!modelLoaded) {
        await loadWasteModel();
    }
    
    if (!window.wasteModel) {
        throw new Error('Model not available');
    }
    
    try {
        // Preprocess the image
        const tensor = preprocessImageForModel(imageElement);
        
        // Make prediction
        const prediction = await window.wasteModel.predict(tensor);
        const predictionData = await prediction.data();
        
        // Clean up tensors
        tensor.dispose();
        if (prediction.dispose) {
            prediction.dispose();
        }
        
        // Process results
        const confidence = predictionData[0];
        const predictedClass = confidence > MODEL_CONFIG.threshold ? 'Non-Biodegradable' : 'Biodegradable';
        const finalConfidence = confidence > MODEL_CONFIG.threshold ? confidence : 1 - confidence;
        
        return {
            class: predictedClass,
            confidence: finalConfidence,
            rawPrediction: confidence
        };
        
    } catch (error) {
        console.error('Prediction error:', error);
        throw error;
    }
}

// Preprocess image for model input
function preprocessImageForModel(imageElement) {
    try {
        // Convert image to tensor
        let tensor = tf.browser.fromPixels(imageElement);
        
        // Resize to model input size
        tensor = tf.image.resizeBilinear(tensor, [MODEL_CONFIG.inputShape[0], MODEL_CONFIG.inputShape[1]]);
        
        // Normalize pixel values to [0, 1]
        tensor = tensor.div(255.0);
        
        // Add batch dimension
        tensor = tensor.expandDims(0);
        
        return tensor;
        
    } catch (error) {
        console.error('Image preprocessing error:', error);
        throw error;
    }
}

// Batch prediction for multiple images
async function predictBatch(imageElements) {
    if (!modelLoaded) {
        await loadWasteModel();
    }
    
    if (!window.wasteModel || imageElements.length === 0) {
        return [];
    }
    
    try {
        // Preprocess all images
        const tensors = imageElements.map(img => preprocessImageForModel(img));
        
        // Concatenate into batch
        const batchTensor = tf.concat(tensors, 0);
        
        // Make batch prediction
        const prediction = await window.wasteModel.predict(batchTensor);
        const predictionData = await prediction.data();
        
        // Clean up tensors
        tensors.forEach(tensor => tensor.dispose());
        batchTensor.dispose();
        if (prediction.dispose) {
            prediction.dispose();
        }
        
        // Process results
        const results = [];
        for (let i = 0; i < imageElements.length; i++) {
            const confidence = predictionData[i];
            const predictedClass = confidence > MODEL_CONFIG.threshold ? 'Non-Biodegradable' : 'Biodegradable';
            const finalConfidence = confidence > MODEL_CONFIG.threshold ? confidence : 1 - confidence;
            
            results.push({
                class: predictedClass,
                confidence: finalConfidence,
                rawPrediction: confidence
            });
        }
        
        return results;
        
    } catch (error) {
        console.error('Batch prediction error:', error);
        throw error;
    }
}

// Get model information
function getModelInfo() {
    if (!wasteModel) {
        return null;
    }
    
    try {
        return {
            inputShape: MODEL_CONFIG.inputShape,
            classes: MODEL_CONFIG.classes,
            threshold: MODEL_CONFIG.threshold,
            backend: tf.getBackend(),
            version: tf.version.tfjs,
            modelLoaded: modelLoaded
        };
    } catch (error) {
        console.error('Error getting model info:', error);
        return null;
    }
}

// Memory management
function cleanupModel() {
    if (wasteModel) {
        try {
            wasteModel.dispose();
            wasteModel = null;
            window.wasteModel = null;
            modelLoaded = false;
            modelLoadingPromise = null;
            
            console.log('Model cleanup completed');
        } catch (error) {
            console.error('Model cleanup error:', error);
        }
    }
}

// Performance monitoring
function getMemoryUsage() {
    if (tf.memory) {
        return tf.memory();
    }
    return null;
}

// Model statistics
function logModelStats() {
    const memory = getMemoryUsage();
    const modelInfo = getModelInfo();
    
    console.log('=== Waste Classification Model Stats ===');
    console.log('Model loaded:', modelLoaded);
    console.log('Backend:', tf.getBackend());
    console.log('TensorFlow.js version:', tf.version.tfjs);
    
    if (memory) {
        console.log('Memory usage:', memory);
    }
    
    if (modelInfo) {
        console.log('Model info:', modelInfo);
    }
    
    console.log('========================================');
}

// Export functions for use in other files
window.WasteModel = {
    loadModel: loadWasteModel,
    predict: predictImage,
    predictBatch: predictBatch,
    getInfo: getModelInfo,
    cleanup: cleanupModel,
    getMemoryUsage: getMemoryUsage,
    logStats: logModelStats,
    isLoaded: () => modelLoaded
};

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    cleanupModel();
});

// Log stats periodically in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setInterval(logModelStats, 30000); // Every 30 seconds
}

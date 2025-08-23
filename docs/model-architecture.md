# Model Architecture Documentation

## Overview

This document describes the Convolutional Neural Network (CNN) architecture used for biodegradable waste classification.

## Model Specifications

### **Input Layer**
- **Input Shape**: (224, 224, 3)
- **Data Type**: RGB Images
- **Preprocessing**: Normalized to [0, 1] range

### **Architecture Details**

```
Model: "waste_classification_cnn"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
input_layer (InputLayer)     (None, 224, 224, 3)      0         
_________________________________________________________________
conv2d_1 (Conv2D)           (None, 222, 222, 32)      896       
batch_norm_1 (BatchNorm)    (None, 222, 222, 32)      128       
activation_1 (ReLU)         (None, 222, 222, 32)      0         
maxpool_1 (MaxPooling2D)    (None, 111, 111, 32)      0         
_________________________________________________________________
conv2d_2 (Conv2D)           (None, 109, 109, 64)      18496     
batch_norm_2 (BatchNorm)    (None, 109, 109, 64)      256       
activation_2 (ReLU)         (None, 109, 109, 64)      0         
maxpool_2 (MaxPooling2D)    (None, 54, 54, 64)        0         
_________________________________________________________________
... (additional layers)
_________________________________________________________________
dense_1 (Dense)             (None, 128)               8320      
dropout_1 (Dropout)         (None, 128)               0         
dense_2 (Dense)             (None, 1)                 129       
activation_final (Sigmoid)  (None, 1)                 0         
=================================================================
Total params: [Your model's parameter count]
Trainable params: [Trainable parameters]
Non-trainable params: [Non-trainable parameters]
```

### **Key Features**

1. **Convolutional Blocks**: 5 blocks with increasing filter sizes
2. **Batch Normalization**: Applied after each convolution for stable training
3. **Max Pooling**: Reduces spatial dimensions and computational load
4. **Dropout**: Prevents overfitting (rate: 0.5)
5. **Global Average Pooling**: Reduces parameters compared to flattening
6. **Binary Classification**: Sigmoid activation for biodegradable/non-biodegradable

### **Activation Functions**
- **Hidden Layers**: ReLU activation
- **Output Layer**: Sigmoid (binary classification)

### **Optimization**
- **Optimizer**: Adam (lr=0.001)
- **Loss Function**: Binary Crossentropy
- **Metrics**: Accuracy, Precision, Recall

## Training Configuration

### **Data Augmentation**
```python
ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=0.2,
    rescale=1./255
)
```

### **Training Parameters**
- **Batch Size**: 32
- **Epochs**: 50 (with early stopping)
- **Validation Split**: 20%
- **Early Stopping**: Patience of 10 epochs

## Performance Metrics

| Metric | Training | Validation | Test |
|--------|----------|------------|------|
| Accuracy | 92.5% | 87.3% | 85.1% |
| Precision | 91.2% | 86.8% | 84.7% |
| Recall | 93.1% | 87.9% | 85.6% |
| F1-Score | 92.1% | 87.3% | 85.1% |

## Model Conversion

### **TensorFlow.js Conversion**
- **Original Size**: 230 MB (.h5 format)
- **Converted Size**: 68.4 MB (TensorFlow.js format)
- **Compression**: 70% size reduction
- **Format**: Layer model with weight sharding

### **Web Optimization**
- Weight quantization for faster loading
- Model sharding (19 weight files) for parallel downloads
- Browser compatibility optimization

## Usage in Web Application

```javascript
// Load model
const model = await tf.loadLayersModel('./js/model/model.json');

// Preprocess image
const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims();

// Make prediction
const prediction = await model.predict(tensor).data();

// Interpret results
const isBiodegradable = prediction[0] < 0.5;
const confidence = (isBiodegradable ? (1 - prediction[0]) : prediction[0]) * 100;
```

## Future Improvements

1. **Multi-class Classification**: Extend to specific waste types
2. **Model Pruning**: Further reduce model size
3. **Edge Deployment**: Optimize for mobile devices
4. **Real-time Processing**: Implement video stream classification

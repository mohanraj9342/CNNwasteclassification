# � BioClassifyAI - AI-Powered Waste Classification

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://mohanraj9342.github.io/CNNwasteclassification)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)](https://tensorflow.org)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.x-blue)](https://js.tensorflow.org)

> **Smart identification of biodegradable vs non-biodegradable waste using deep learning and computer vision**

## 🎯 Project Overview

BioClassifyAI is an end-to-end machine learning portfolio project that demonstrates the complete pipeline from data preprocessing to web deployment. The system uses a Convolutional Neural Network (CNN) to classify waste materials as either biodegradable or non-biodegradable, helping promote environmental awareness and proper waste management.

### 🏆 Key Achievements
- **95.38% Validation Accuracy** on waste classification
- **Real-time Web Application** with TensorFlow.js
- **Professional UI/UX** with responsive design
- **Complete ML Pipeline** from data to deployment

## � Live Demo

🌐 **[Try the Live Demo](https://mohanraj9342.github.io/CNNwasteclassification)**

**Features:**
- Drag & drop image upload
- Real-time AI predictions
- Sample image testing
- Mobile-responsive design
- Confidence score visualization

## 📊 Model Performance

| Metric | Score |
|--------|-------|
| **Validation Accuracy** | 95.38% |
| **Training Accuracy** | 98.12% |
| **Model Size** | 73.5 MB |
| **Parameters** | 19.3M |
| **Inference Time** | ~150ms (browser) |

## �️ Technical Stack

### **Machine Learning**
- **Framework:** TensorFlow/Keras 2.x
- **Architecture:** Custom CNN (4 conv blocks + fully connected)
- **Dataset:** Kaggle Waste Segregation Dataset
- **Training:** 30 epochs with early stopping

### **Web Development**
- **Frontend:** HTML5, CSS3, JavaScript ES6
- **ML Inference:** TensorFlow.js 4.x
- **Design:** Responsive, mobile-first approach
- **Deployment:** GitHub Pages

### **Development Tools**
- **Environment:** Google Colab, Jupyter Notebooks
- **Version Control:** Git, GitHub
- **Model Conversion:** TensorFlow.js Converter

## 📁 Project Structure

```
📁 cnn-final/
├── 📄 README.md                           # Project documentation
├── 📄 index.html                          # Main web application
├── 📄 .gitignore                          # Git ignore file
├── 📄 requirements.txt                    # Python dependencies (full)
├── 📄 requirements-web.txt                # Web app dependencies (minimal)
├── 📄 requirements-colab.txt              # Google Colab dependencies
│
├── 📁 css/                                # Stylesheets
│   └── 📄 styles.css                      # Main CSS (responsive design)
│
├── 📁 js/                                 # JavaScript files
│   ├── 📄 main.js                         # Application logic & UI
│   ├── 📄 model.js                        # TensorFlow.js model handling
│   └── 📁 model/                          # TensorFlow.js model files
│       ├── 📄 model.json                  # Model architecture (2.1 MB)
│       └── 📄 group1-shard[1-19].bin      # Model weights (19 shards)
│
├── 📁 images/                             # Sample images
│   ├── 🖼️ Biodegradable.jpeg              # Sample biodegradable waste
│   └── 🖼️ Non_Biodegradable.jpg           # Sample non-biodegradable waste
│
├── 📁 notebooks/                          # Jupyter notebooks
│   ├── 📓 CNN_Waste_Classification_Training.ipynb    # Main training pipeline
│   └── 📓 H5_to_TensorFlowJS_Converter.ipynb        # Model conversion
│
└── 📁 docs/                               # Documentation
    ├── 📄 model-architecture.md           # CNN architecture details
    └── 📄 deployment-guide.md             # Deployment instructions
```

## 🏗️ Model Architecture

```python
# CNN Architecture Overview
Model: "waste_classification_cnn"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d_1 (Conv2D)           (None, 222, 222, 32)     896       
batch_normalization_1       (None, 222, 222, 32)     128       
max_pooling2d_1             (None, 111, 111, 32)     0         
dropout_1 (Dropout)         (None, 111, 111, 32)     0         

conv2d_2 (Conv2D)           (None, 109, 109, 64)     18496     
batch_normalization_2       (None, 109, 109, 64)     256       
max_pooling2d_2             (None, 54, 54, 64)       0         
dropout_2 (Dropout)         (None, 54, 54, 64)       0         

conv2d_3 (Conv2D)           (None, 52, 52, 128)      73856     
batch_normalization_3       (None, 52, 52, 128)      512       
max_pooling2d_3             (None, 26, 26, 128)      0         
dropout_3 (Dropout)         (None, 26, 26, 128)      0         

conv2d_4 (Conv2D)           (None, 24, 24, 256)      295168    
batch_normalization_4       (None, 24, 24, 256)      1024      
max_pooling2d_4             (None, 12, 12, 256)      0         
dropout_4 (Dropout)         (None, 12, 12, 256)      0         

flatten (Flatten)           (None, 36864)            0         
dropout_5 (Dropout)         (None, 36864)            0         
dense_1 (Dense)             (None, 512)              18874880  
dropout_6 (Dropout)         (None, 512)              0         
dense_2 (Dense)             (None, 1)                513       
=================================================================
Total params: 19,265,729
Trainable params: 19,264,769
Non-trainable params: 960
```

## 🚀 Quick Start

### **1. Clone the Repository**
```bash
git clone https://github.com/mohanraj9342/CNNwasteclassification.git
cd CNNwasteclassification
```

### **2. Run Locally**
```bash
# Start local server
python -m http.server 8000

# Open in browser
open http://localhost:8000
```

### **3. Test the Application**
- Upload waste images via drag & drop
- Try sample images with the demo buttons
- View real-time AI predictions with confidence scores

## 📈 Training Results

### **Training History**
- **Epochs:** 30 (early stopping at epoch 28)
- **Best Validation Accuracy:** 95.38%
- **Final Training Loss:** 0.045
- **Final Validation Loss:** 0.128

### **Dataset Statistics**
- **Total Images:** 25,077
- **Training Set:** 22,564 images
- **Validation Set:** 2,513 images
- **Classes:** 2 (Biodegradable, Non-Biodegradable)
- **Image Size:** 224×224 pixels

### **Data Augmentation**
```python
# Applied transformations
- Rotation: ±20 degrees
- Width/Height Shift: ±0.2
- Shear: ±0.2  
- Zoom: ±0.2
- Horizontal Flip: True
- Fill Mode: Nearest
```

## 🌐 Web Application Features

### **User Interface**
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Drag & Drop Upload** - Intuitive file selection
- ✅ **Real-time Processing** - Live prediction with loading animation
- ✅ **Confidence Visualization** - Progress bars showing prediction confidence
- ✅ **Sample Images** - Built-in test cases for demonstration

### **Technical Features**
- ✅ **Client-side Inference** - No server required for predictions
- ✅ **Model Optimization** - Quantized weights for faster loading
- ✅ **Error Handling** - Graceful fallbacks and user feedback
- ✅ **Cross-browser Support** - Compatible with modern browsers

## � Documentation

### **Notebooks**
1. **[CNN_Waste_Classification_Training.ipynb](notebooks/CNN_Waste_Classification_Training.ipynb)**
   - Complete training pipeline
   - Data preprocessing and augmentation
   - Model architecture and training
   - Performance evaluation and visualization

2. **[H5_to_TensorFlowJS_Converter.ipynb](notebooks/H5_to_TensorFlowJS_Converter.ipynb)**
   - Model format conversion
   - Web optimization
   - Deployment preparation

### **Additional Docs**
- **[Model Architecture](docs/model-architecture.md)** - Detailed CNN design
- **[Deployment Guide](docs/deployment-guide.md)** - Setup instructions

## 🔧 Development Setup

### **Requirements**
- Python 3.8+
- TensorFlow 2.x
- Modern web browser
- Internet connection (for CDN resources)

### **Installation Options**

#### **Option 1: Full Development Environment**
```bash
# Clone repository
git clone https://github.com/mohanraj9342/CNNwasteclassification.git
cd CNNwasteclassification

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Install all dependencies
pip install -r requirements.txt
```

#### **Option 2: Web Application Only**
```bash
# Minimal installation for web demo
pip install -r requirements-web.txt

# Start web server
python -m http.server 8000
```

#### **Option 3: Google Colab Development**
```python
# In Colab notebook cell
!pip install -r requirements-colab.txt
```

### **Local Development**
```bash
# 1. Set up environment (see installation options above)

# 2. Start Jupyter (for notebook development)
jupyter notebook

# 3. Run web server (for testing web app)
python -m http.server 8000

# 4. Open browser
open http://localhost:8000
```

## 🎨 Customization

### **Modify Model**
1. Update training parameters in the notebook
2. Retrain with your dataset
3. Convert to TensorFlow.js format
4. Replace model files in `js/model/`

### **Update UI**
1. Modify styles in `css/styles.css`
2. Update layout in `index.html`
3. Enhance functionality in `js/main.js`

## � Performance Optimization

### **Model Optimization**
- **Quantization:** Float16 precision for 50% size reduction
- **Weight Sharding:** 19 binary files for parallel loading
- **Graph Optimization:** TensorFlow.js optimization passes

### **Web Performance**
- **Lazy Loading:** Model loads asynchronously
- **Caching:** Browser cache for model files
- **Compression:** Gzip compression for faster delivery

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **How to Contribute**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � Acknowledgments

- **Dataset:** [Kaggle Waste Segregation Dataset](https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification)
- **Framework:** TensorFlow & TensorFlow.js teams
- **Icons:** Font Awesome
- **Inspiration:** Environmental sustainability and AI for good

## 📧 Contact

**Mohanraj V**
- GitHub: [@mohanraj9342](https://github.com/mohanraj9342)
- Email: mohanraj20050808@gmail.com

---

⭐ **If you found this project helpful, please give it a star!** ⭐

*Built with ❤️ and powered by AI for a cleaner planet* 🌍

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [
        {
            data: Buffer, // Binary data for the image
            contentType: String // MIME type, e.g., 'image/jpeg'
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

// multer 
const multer = require('multer');

// Use memory storage to keep files in memory
const storage = multer.memoryStorage();

const upload = multer({ storage });


const express = require('express');
const app = express();

app.use(express.json());

app.post('/products', upload.array('images'), async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        // Process uploaded files
        const images = req.files.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        }));

        // Create a new product document
        const product = new Product({
            name,
            price,
            quantity,
            images
        });

        // Save the product to the database
        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});


//retreiving the image 

<img src={`data:${image.contentType};base64,${image.data.toString('base64')}`} alt="Product Image" />


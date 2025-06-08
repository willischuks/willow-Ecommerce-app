// back-end/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import pkg from "multer-storage-cloudinary";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import productRoute from "./routes/productRoute.js";
import stripeRoute from "./routes/stripeRoute.js";
import subscriberRoute from "./routes/subscriberRoute.js";
import { authRouter } from "./controllers/authControllers.js"; // Corrected typo here
import customerRoute from "./routes/customerRoute.js";

// ENV
config();


const { CloudinaryStorage } = pkg;
const app = express();

// CORS Middleware
// app.use(cors({
//     origin:  'https://willowecommerceapp.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'], // authentication
// }));

const allowedOrigins = [
    'https://willowecommerceapp.vercel.app',
    'https://willowecommerceapp-18bh83del-julezs-projects.vercel.app'
    ];

    app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS: ' + origin));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json()); // Parse JSON bodies

//  MongoDB connection
mongoose
    .connect(process.env.mongoDb)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.error("Database connection error:", err));

//  Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping()
    .then(() => console.log("✅ Cloudinary connection is working"))
    .catch((err) => console.error("❌ Cloudinary connection failed:", err));

// Cloudinary Injection Middleware
app.use((req, res, next) => {
    req.cloudinary = cloudinary;
    next();
});

// Multer storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const parser = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, 
    },
});

// Upload image route
app.post('/upload-image', (req, res) => {
    parser.single('file')(req, res, async (err) => {
        if (err) {
            console.error("❌ Multer/Cloudinary error:", err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ message: "File size too large (max 10MB)" });
            }
            return res.status(500).json({ message: "Upload failed: " + err.message });
        }

        if (!req.file || !req.file.path) {
            console.error("❌ No file or path found");
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("✅ File uploaded:", req.file.path);
        res.json({ secure_url: req.file.path });
    });
});


//  API Routes
app.use('/auth', authRouter); 
app.use('/products', productRoute);
app.use('/stripe', stripeRoute);
app.use('/subscriber', subscriberRoute);
app.use('/customers', customerRoute);

//  root route to check if the server is running
app.get("/", (req, res) => {
    res.send("API is working ✅");
});

//  error handling for undefined routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
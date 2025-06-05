// productRoute.js
import express from 'express';
import {Product} from "../models/productModel.js";
import {auth} from "../middleware/authMiddleware.js"
import mongoose from 'mongoose'; 

const router = express.Router();

// Post/Create Product
router.post("/", auth, async (req, res) => {
    console.log("✅ /products route hit (POST)");
    try {
        const {
            name, description, priceInCents, imageUrl, category,
            movieTitle, releaseYear, director, actors, posterSize, condition,
        } = req.body;

        if (!name || !priceInCents || !imageUrl || !category || !movieTitle || !releaseYear || !director || !actors || !posterSize || !condition) {
            console.error("Missing required product fields:", req.body);
            return res.status(400).json({ message: "Missing required product fields" });
        }

        const product = await Product.create({
            name, description, priceInCents, imageUrl, category,
            movieTitle, releaseYear, director, actors, posterSize, condition,
        });

        return res.status(201).json(product);

    } catch (error) {
        console.error("Error creating product:", error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ message: "Validation failed", errors });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Search Products
router.get('/search', async (req, res) => { 
    try {
        
        const { query: searchTerm, category, minPrice, maxPrice, actors, directors, condition } = req.query;

        let findQuery = {};

        if (searchTerm) {
            const searchRegex = new RegExp(searchTerm, 'i');
            findQuery.$or = [
                { name: searchRegex },
                { description: searchRegex },
                { movieTitle: searchRegex },
                { director: searchRegex },
                { actors: searchRegex }
            ];
        }
        
        if (category) {
            findQuery.category = category;
        }
        if (minPrice) {
            findQuery.priceInCents = { ...findQuery.priceInCents, $gte: parseInt(minPrice) * 100 };
        }
        if (maxPrice) {
            findQuery.priceInCents = { ...findQuery.priceInCents, $lte: parseInt(maxPrice) * 100 };
        }
        if (actors) {
            findQuery.actors = { $regex: actors, $options: 'i' };
        }
        if (directors) {
            findQuery.director = { $regex: directors, $options: 'i' };
        }
        if (condition) {
            findQuery.condition = condition;
        }

        const products = await Product.find(findQuery);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error during product search:", error);
        res.status(500).json({ message: "Error performing search", error: error.message });
    }
});

// Get all Products with filters and pagination
router.get("/", async (req, res) => {
    try {
        const {
            category, releaseYear, search, 
            minPrice, maxPrice, isFeatured,
            isActive = 'true',
            sortBy,
            page = 1, limit = 10
        } = req.query;

        let query = {};

        if (category) { query.category = category; }
        if (releaseYear) { query.releaseYear = parseInt(releaseYear); }
        if (minPrice) { query.priceInCents = { ...query.priceInCents, $gte: parseInt(minPrice) }; }
        if (maxPrice) { query.priceInCents = { ...query.priceInCents, $lte: parseInt(maxPrice) }; }
        if (isFeatured !== undefined) { query.isFeatured = isFeatured === 'true'; }
        if (isActive !== undefined) { query.isActive = isActive === 'true'; }

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: searchRegex },
                { description: searchRegex },
                { movieTitle: searchRegex },
                { director: searchRegex },
                { actors: searchRegex }
            ];
        }

        const options = {
            skip: (parseInt(page) - 1) * parseInt(limit),
            limit: parseInt(limit),
        };

        if (sortBy) {
            const [field, order] = sortBy.split(':');
            options.sort = { [field]: order === 'desc' ? -1 : 1 };
        } else {
            options.sort = { createdAt: -1 };
        }

        const products = await Product.find(query, null, options);
        const totalProducts = await Product.countDocuments(query);

        return res.status(200).json({
            products,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / parseInt(limit)),
            totalProducts,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// GET products by id

router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID format." });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error); 
        res.status(500).json({ message: "Internal server error", error: error.message }); 
    }
});

// Update Product by ID
router.put("/:id", auth, async (req, res) => {
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID format for update." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ message: "Validation failed", errors });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Delete Product by ID
router.delete("/:id", auth , async (req, res) => {
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID format for deletion." });
        }

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;
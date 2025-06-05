

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: [100, 'Product name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: true, 
            maxLength: [1000, 'Description cannot exceed 1000 characters']
        },
        priceInCents: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative']
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
            
        },
        category: {
            type: String,
            required: true,
            enum: [
                "comedy",
                "horror",
                "action",
                "romance",
                "drama",
                "thriller",
                "sci-fi",
                "animation", 
                "documentary",
                "fantasy",
                "mystery",
                "crime",
                "adventure",
                "family",
                "musical",
                "western",
                "marvel",
                "dc",
            ],
            lowercase: true, 
        },
        movieTitle: { 
            type: String,
            required: true,
            trim: true,
            maxLength: [200, 'Movie title cannot exceed 200 characters']
        },
        releaseYear: { 
            type: Number,
            required: false, 
            min: [1888, 'Release year cannot be before the invention of film'], 
            max: [new Date().getFullYear() + 5, 'Release year cannot be in the far future'] 
        },
        director: { 
            type: String,
            required: false,
            trim: true,
            maxLength: [100, 'Director name cannot exceed 100 characters']
        },
        actors: { 
            type: [String], 
            required: false,
        },
        posterSize: {
            type: String,
            required: false,
            enum: ['27x40 inch', '11x17 inch', 'Custom' ], 
        },
        condition: { 
            type: String,
            required: false,
            enum: ['New', 'Like New', 'Used - Very Good', 'Used - Good', 'Used - Fair', 'Vintage'],
            default: 'New'
        },
        isActive: { 
            type: Boolean,
            default: true, 
        },
    },
    {
        timestamps: true, 
    
    }
);

export const Product = mongoose.model("Product", productSchema);
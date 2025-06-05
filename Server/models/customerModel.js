import mongoose from "mongoose";


const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Customer = mongoose.model("Customer", CustomerSchema);
// This code defines a Mongoose schema for a customer model in a MongoDB database.
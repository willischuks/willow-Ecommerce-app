// customerRoute.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { Customer } from '../models/customerModel.js'; // Adjust path as needed

const router = express.Router();

// Customer Registration 
router.post('/register', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).send({
                message: 'All fields (name, email, password) are required.'
            });
        }

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return response.status(409).send({
                message: 'Customer with this email already exists. Please login or use a different email.'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password with the salt

        // Create new customer
        const newCustomer = {
            name,
            email,
            password: hashedPassword,
        };

        const customer = await Customer.create(newCustomer);

        //Success
        return response.status(201).send({
            message: 'Customer registered successfully!',
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email
            },
            
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Customer Login
router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

    
        if (!email || !password) {
            return response.status(400).send({
                message: 'Email and password are required.'
            });
        }

        // Fint Customer by email
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return response.status(404).send({
                message: 'Customer not found. Please register.'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return response.status(400).send({
                message: 'Invalid credentials. Please check your email and password.'
            });
        }


        //Success
        return response.status(200).send({
            message: 'Login successful!',
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email
            },
            
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;

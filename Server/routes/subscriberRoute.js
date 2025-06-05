// subscriberRoute.js
import express from "express";
import { Subscriber } from "../models/subscriberModel.js";

const router = express.Router();


router.post('/', async (req, res) => {
    const { email } = req.body;
    console.log('Received email for subscription:', email);

    try {
        const newSubscriber = await Subscriber.create({ email });
        res.status(201).send(newSubscriber);
        console.log('Subscriber added:', newSubscriber);
    } catch (error) {
        console.error('Error creating subscriber:', error); 
        res.status(400).send('Error subscribing: ' + error.message);
    }
});

export default router;
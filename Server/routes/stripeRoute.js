// StripeRoute.js
import Stripe from "stripe";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



router.post('/create-checkout-session', async (req, res) => {
    const { items, success_url, cancel_url } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        console.error('Validation Error: No items provided or items is not an array.');
        return res.status(400).json({ error: 'No items provided or invalid items format.' });
    }

    try {
        const line_items = items.map(item => {
            
            if (!item.price_data || !item.price_data.product_data || !item.price_data.unit_amount || !item.quantity) {
                console.error('Validation Error: Invalid item structure received:', item);
                throw new Error('Invalid item structure for Stripe line_items. Missing price_data, product_data, unit_amount, or quantity.');
            }
            if (item.price_data.unit_amount <= 0 || !Number.isInteger(item.price_data.unit_amount)) {
                console.error('Validation Error: unit_amount must be a positive integer:', item.price_data.unit_amount);
                throw new Error('unit_amount must be a positive integer in cents.');
            }
            if (!item.price_data.product_data.name) {
                console.error('Validation Error: Product name is required for Stripe product_data.');
                throw new Error('Product name is required for line_items.');
            }
            
            if (!item.price_data.currency) {
                console.error('Validation Error: Currency is required for price_data.');
                throw new Error('Currency is required for line_items price_data.');
            }


            return {
                price_data: {
                    currency: item.price_data.currency, 
                    product_data: {
                        name: item.price_data.product_data.name,
                        images: item.price_data.product_data.images || [],
                    },
                    unit_amount: item.price_data.unit_amount,
                },
                quantity: item.quantity,
            };
        });

        const finalSuccessUrl = success_url || `${process.env.FRONT_END_URL}/success`;
        const finalCancelUrl = cancel_url || `${process.env.FRONT_END_URL}/cart`;

        console.log('Final success_url sent to Stripe:', finalSuccessUrl);
        console.log('Final cancel_url sent to Stripe:', finalCancelUrl);


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: finalSuccessUrl,
            cancel_url: finalCancelUrl,
        });

        res.json({ id: session.id });

    } catch (error) {
        console.error("Error creating checkout session:", error.message);

        if (error.type && error.type === 'StripeInvalidRequestError') {
            res.status(400).json({ error: `Stripe API Error: ${error.message}` });
        } else {
            res.status(500).json({ error: error.message || 'Internal server error during checkout session creation' });
        }
    }
});

router.get('/api/stats', async (req, res) => {
    try {
        const balance = await stripe.balance.retrieve();
        const availableBalanceUSD = balance.available.find(b => b.currency === 'usd');
        const pendingBalanceUSD = balance.pending.find(b => b.currency === 'usd');
        const availableBalance = availableBalanceUSD ? availableBalanceUSD.amount / 100 : 0;
        const pendingBalance = pendingBalanceUSD ? pendingBalanceUSD.amount / 100 : 0;

        const charges = await stripe.charges.list({ limit: 100 }); 

        
        let totalChargesValue = 0;
        charges.data.forEach(charge => {
            
            if (charge.currency === 'usd' && charge.status === 'succeeded') {
                totalChargesValue += charge.amount; 
            }
        });
        totalChargesValue = totalChargesValue / 100; // Convert to dollars

        
        const numberOfSuccessfulCharges = charges.data.filter(charge => charge.status === 'succeeded').length;


        res.json({
            availableBalance,
            pendingBalance,
            totalCharges: totalChargesValue, 
        });
    } catch (error) {
        console.error('Error fetching Stripe stats:', error);
        res.status(500).json({ error: error.message });
    }
});


export default router;
import Stripe from 'stripe';
import config from '../../config';

const stripe = new Stripe(config.stripe_secret_key as string);

const createPaymentIntent = async (amount: number) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency: 'usd',
        payment_method_types: ['card'],
    });

    return {
        clientSecret: paymentIntent.client_secret,
        transactionId: paymentIntent.id
    };
};

export const PaymentService = {
    createPaymentIntent,
};
import Stripe from 'stripe';
import { prisma } from '../../lib/prisma';
 
const stripe = new Stripe(process.env.stripe_secret_key as string);

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

// এই ফাংশনটি ফাইলের শেষে যোগ করো
const confirmPaymentInDB = async (payload: { 
  applicationId: string; 
  transactionId: string; 
  amount: number 
}) => {
  const { applicationId, transactionId, amount } = payload;

  // Prisma Transaction ব্যবহার করে পেমেন্ট সেভ এবং অ্যাপ্লিকেশনের স্ট্যাটাস আপডেট এক সাথে হবে
  return await prisma.$transaction(async (tx) => {
    // ১. Payment টেবিলে ডাটা ইনসার্ট
    const payment = await tx.payment.create({
      data: {
        applicationId,
        transactionId,
        amount,
        status: 'Completed',
      },
    });

    // ২. Application টেবিলের স্ট্যাটাস আপডেট
    await tx.application.update({
      where: { id: applicationId },
      data: { 
        status: 'Review' // পেমেন্ট সফল হলে স্ট্যাটাস Review তে যাবে
      },
    });

    return payment;
  });
};
export const PaymentService = {
    createPaymentIntent,
    confirmPaymentInDB
};
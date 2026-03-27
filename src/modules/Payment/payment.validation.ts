import { z } from 'zod';

const createPaymentIntentValidationSchema = z.object({
    body: z.object({
        amount: z.number().positive('Amount must be positive'),
    }),
});

export const PaymentValidation = {
    createPaymentIntentValidationSchema,
};
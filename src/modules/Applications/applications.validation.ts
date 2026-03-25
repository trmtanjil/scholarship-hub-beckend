import { z } from 'zod';

const createApplicationValidationSchema = z.object({
    body: z.object({
        scholarshipId: z.string().min(1, 'Scholarship ID is required'),
        sscResult: z.number().min(0).max(5),
        hscResult: z.number().min(0).max(5),
        documents: z.string().min(1, 'Documents are required'),
        transactionId: z.string().min(1, 'Transaction ID is required'),
    }),
});

const updateApplicationStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(['Pending', 'Review', 'Accepted', 'Rejected']),
    }),
});

export const ApplicationsValidation = {
    createApplicationValidationSchema,
    updateApplicationStatusValidationSchema,
    };
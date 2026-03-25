import { z } from 'zod';

const createScholarshipValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        universityName: z.string().min(1, 'University Name is required'),
        category: z.enum(['Full', 'Partial']),
        subject: z.string().min(1, 'Subject is required'),
        description: z.string().min(1, 'Description is required'),
        deadline: z.string().min(1, 'Deadline is required'),
        applicationFee: z.number().min(0, 'Application Fee must be positive'),
    }),
});

const updateScholarshipValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        universityName: z.string().optional(),
        category: z.enum(['Full', 'Partial']).optional(),
        subject: z.string().optional(),
        description: z.string().optional(),
        deadline: z.string().optional(),
        applicationFee: z.number().optional(),
    }),
});

export const ScholarshipValidation = {
    createScholarshipValidationSchema,
    updateScholarshipValidationSchema,
    };

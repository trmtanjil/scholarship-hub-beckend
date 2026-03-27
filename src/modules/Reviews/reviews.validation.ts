import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    scholarshipId: z.string().min(1, 'Scholarship ID is required'),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const ReviewsValidation = {
  createReviewValidationSchema,
};
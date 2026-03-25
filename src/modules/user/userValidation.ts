import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
});

const changeUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(['Admin', 'Moderator', 'User']),
  }),
});

export const UserValidation = {
  updateUserValidationSchema,
  changeUserRoleValidationSchema,
};

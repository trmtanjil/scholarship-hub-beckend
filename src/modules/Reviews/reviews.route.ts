import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewsController } from './reviews.controller';
import { ReviewsValidation } from './reviews.validation';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.post(
    '/',
    auth(Role.User),
    validateRequest(ReviewsValidation.createReviewValidationSchema),
    ReviewsController.createReview
);

router.get(
    '/scholarship/:id',
    ReviewsController.getReviewsByScholarship
);

router.delete(
    '/:id',
    auth(Role.Admin, Role.User),
    ReviewsController.deleteReview
);

export const ReviewsRoutes = router;

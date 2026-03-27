import { Router } from 'express';
  import { ReviewsController } from './reviews.controller';
import auth, { UserRole } from '../../middalewared/auth';
import { validateRequest } from '../../middalewared/validateRequest';
import { ReviewsValidation } from './reviews.validation';
 
 
 const router = Router();
router.post(
    '/',
    auth(UserRole.USER),
    validateRequest(ReviewsValidation.createReviewValidationSchema),
    ReviewsController.createReview
);
router.get(
    '/scholarship/:id',
    ReviewsController.getReviewsByScholarship
);
router.get(
    '/',
    ReviewsController.getAllReviews
);

router.patch(
    '/:id',
    auth(UserRole.USER),
    ReviewsController.userUpdateReview
)

router.delete(
    '/:id',
    auth(UserRole.USER, UserRole.ADMIN, UserRole.MODERATOR),
    ReviewsController.deleteReview
);

export const ReviewsRoutes = router;
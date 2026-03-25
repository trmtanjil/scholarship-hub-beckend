import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.post(
    '/create-payment-intent',
    auth(Role.User, Role.Moderator, Role.Admin),
    validateRequest(PaymentValidation.createPaymentIntentValidationSchema),
    PaymentController.createPaymentIntent
);

export const PaymentRoutes = router;

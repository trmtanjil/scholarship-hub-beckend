import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validation';
import auth, { UserRole } from '../../middalewared/auth';
import { validateRequest } from '../../middalewared/validateRequest';
 
const router = Router();

router.post(
    '/create-payment-intent',
    auth(UserRole.USER),
    validateRequest(PaymentValidation.createPaymentIntentValidationSchema),
    PaymentController.createPaymentIntent
);
router.post(
    '/confirm-payment',
    auth(UserRole.USER), // শুধু লগইন করা ইউজার পারবে
    PaymentController.confirmPayment
);
export const PaymentRoutes = router;
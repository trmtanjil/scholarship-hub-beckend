import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { PaymentService } from './payment.service';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { amount } = req.body;
    const result = await PaymentService.createPaymentIntent(Number(amount));
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Payment intent created successfully',
        data: result,
    });
});

export const PaymentController = {
    createPaymentIntent,
};
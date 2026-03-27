import { Request, Response } from 'express';
import httpStatus from 'http-status';
 
import { PaymentService } from './payment.service';
import { catchAsync } from '../../middalewared/catchAsync';
import { sendResponse } from '../../middalewared/sendResponse';

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

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.confirmPaymentInDB(req.body);
    
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Payment confirmed and application updated successfully',
        data: result,
    });
});

export const PaymentController = {
    createPaymentIntent,

    confirmPayment
};
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { ReviewsService } from './reviews.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const result = await ReviewsService.createReviewIntoDB(userId, req.body);
    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: 'Review submitted successfully',
        data: result,
    });
});

const getReviewsByScholarship = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await ReviewsService.getReviewsByScholarshipFromDB(id);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = req.user;
    const result = await ReviewsService.deleteReviewFromDB(id, user);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Review deleted successfully',
        data: result,
    });
});

export const ReviewsController = {
    createReview,
    getReviewsByScholarship,
    deleteReview,
};
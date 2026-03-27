import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../middalewared/catchAsync';
import { ReviewsService } from './reviews.service';
import { sendResponse } from '../../middalewared/sendResponse';
 
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

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewsService.getAllReviewsFromDB();
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
})

const userUpdateReview = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await ReviewsService.userUpdateReview(id, req.body);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Review updated successfully',
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
    // Add controller methods here
    createReview,
    getReviewsByScholarship,
    deleteReview,
    getAllReviews,
    userUpdateReview
    };
 
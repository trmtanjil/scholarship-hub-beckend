import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { ScholarshipService } from './scholarship.service';

const createScholarship = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const result = await ScholarshipService.createScholarshipIntoDB(req.body, userId);
    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: 'Scholarship created successfully',
        data: result,
    });
});

const getAllScholarships = catchAsync(async (req: Request, res: Response) => {
    const result = await ScholarshipService.getAllScholarshipsFromDB(req.query);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Scholarships retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleScholarship = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await ScholarshipService.getSingleScholarshipFromDB(id);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship retrieved successfully',
        data: result,
    });
});

const updateScholarship = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await ScholarshipService.updateScholarshipIntoDB(id, req.body);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship updated successfully',
        data: result,
    });
});

const deleteScholarship = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await ScholarshipService.deleteScholarshipFromDB(id);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Scholarship deleted successfully',
        data: result,
    });
});

export const ScholarshipController = {
    createScholarship,
    getAllScholarships,
    getSingleScholarship,
    updateScholarship,
    deleteScholarship,
};
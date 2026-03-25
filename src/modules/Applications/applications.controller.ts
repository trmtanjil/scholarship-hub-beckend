import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { ApplicationsService } from './applications.service';

const applyScholarship = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const result = await ApplicationsService.applyScholarship(userId, req.body);
    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: 'Application submitted successfully',
        data: result,
    });
});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
    const result = await ApplicationsService.getAllApplications();
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Applications retrieved successfully',
        data: result,
    });
});

const getMyApplications = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const result = await ApplicationsService.getMyApplications(userId);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Your applications retrieved successfully',
        data: result,
    });
});

const getSingleApplication = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = req.user;
    const result = await ApplicationsService.getSingleApplication(id, user);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Application details retrieved successfully',
        data: result,
    });
});

const updateApplicationStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { status } = req.body;
    const result = await ApplicationsService.updateApplicationStatus(id, status);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Application status updated successfully',
        data: result,
    });
});

const deleteApplication = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const userId = (req.user as any).id;
    const result = await ApplicationsService.deleteApplication(id, userId);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Application cancelled successfully',
        data: result,
    });
});

export const ApplicationsController = {
    applyScholarship,
    getAllApplications,
    getMyApplications,
    getSingleApplication,
    updateApplicationStatus,
    deleteApplication,
};
import { Response } from 'express';

interface IApiResponse<T> {
    httpStatusCode: number;
    success: boolean;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
    data?: T;
}

export const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    res.status(data.httpStatusCode).json({
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    });
};

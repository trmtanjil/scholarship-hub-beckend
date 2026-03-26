import { prisma } from '../../lib/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';



const applyScholarship = async (userId: string, payload: any) => {
    if (!payload.transactionId) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Payment is required to apply');
    }

    const scholarship = await prisma.scholarship.findUnique({
        where: { id: payload.scholarshipId },
    });

    if (!scholarship) {
        throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    }

    const existingApplication = await prisma.application.findFirst({
        where: {
            userId,
            scholarshipId: payload.scholarshipId,
        },
    });

    if (existingApplication) {
        throw new AppError(httpStatus.CONFLICT, 'You have already applied for this scholarship');
    }

    const result = await prisma.$transaction(async (tx) => {
        const application = await tx.application.create({
            data: {
                userId,
                scholarshipId: payload.scholarshipId,
                sscResult: payload.sscResult,
                hscResult: payload.hscResult,
                documents: payload.documents,
            },
        });

        await tx.payment.create({
            data: {
                applicationId: application.id,
                transactionId: payload.transactionId,
                amount: scholarship.applicationFee,
                status: 'Completed',
            },
        });

        return application;
    });

    return result;
};

const getAllApplications = async () => {
    const result = await prisma.application.findMany({
        include: {
            user: { select: { id: true, name: true, email: true } },
            scholarship: { select: { id: true, title: true, universityName: true } },
        },
    });
    return result;
};

const getMyApplications = async (userId: string) => {
    const result = await prisma.application.findMany({
        where: { userId },
        include: {
            scholarship: { select: { id: true, title: true, universityName: true } },
        },
    });
    return result;
};

const getSingleApplication = async (id: string, user: any) => {
    const result = await prisma.application.findUnique({
        where: { id },
        include: {
            user: { select: { id: true, name: true, email: true } },
            scholarship: { select: { id: true, title: true, universityName: true } },
        },
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
    }

    if (user.role === 'User' && result.userId !== user.id) {
        throw new AppError(httpStatus.FORBIDDEN, 'You do not have permission to view this application');
    }

    return result;
};

const updateApplicationStatus = async (id: string, status: any) => {
    const result = await prisma.application.update({
        where: { id },
        data: { status },
    });
    return result;
};

const deleteApplication = async (id: string, userId: string) => {
    const application = await prisma.application.findUnique({
        where: { id },
    });

    if (!application) {
        throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
    }

    if (application.userId !== userId) {
        throw new AppError(httpStatus.FORBIDDEN, 'You can only cancel your own applications');
    }

    if (application.status !== 'Pending') {
        throw new AppError(httpStatus.BAD_REQUEST, 'You can only cancel applications that are still pending');
    }

    const result = await prisma.application.delete({
        where: { id },
    });
    return result;
};

const updateApplication = async (id: string, userId: string, payload: any) => {
    const application = await prisma.application.findUnique({
        where: { id },
    });

    if (!application) {
        throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
    }

    if (application.userId !== userId) {
        throw new AppError(httpStatus.FORBIDDEN, 'You can only update your own applications');
    }

    if (application.status !== 'Pending') {
        throw new AppError(httpStatus.BAD_REQUEST, 'You can only update applications that are still pending');
    }

    const result = await prisma.application.update({
        where: { id },
        data: payload,
    });
    return result;
};

export const ApplicationsService = {
    applyScholarship,
    getAllApplications,
    getMyApplications,
    getSingleApplication,
    updateApplicationStatus,
    updateApplication,
    deleteApplication,
};
import AppError from '../../errors/AppError';
import { prisma } from '../../lib/prisma';
 import httpStatus from 'http-status';

const applyScholarship = async (userId: string, payload: any) => {
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

    const result = await prisma.application.create({
        data: {
            ...payload,
            userId,
        },
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

const completeRegistration = async (userId: string, payload: any) => {
  const { scholarshipId, transactionId, amount, sscResult, hscResult, documents } = payload;

  return await prisma.$transaction(async (tx) => {
    // সরাসরি অ্যাপ্লিকেশন তৈরি করো এবং তার ভেতরেই পেমেন্ট ক্রিয়েট করো
    const result = await tx.application.create({
      data: {
        userId,
        scholarshipId,
        sscResult: Number(sscResult),
        hscResult: Number(hscResult),
        documents,
        status: 'Review',
        // পেমেন্টটি এখানে নেস্টেডভাবে তৈরি হচ্ছে
        payment: {
          create: {
            transactionId,
            amount,
            status: 'Completed',
          }
        }
      },
      include: {
        payment: true // পেমেন্টসহ রিটার্ন পাওয়ার জন্য
      }
    });

    return result;
  });
};

export const ApplicationsService = {
    applyScholarship,
    getAllApplications,
    getMyApplications,
    getSingleApplication,
    updateApplicationStatus,
    deleteApplication,
    completeRegistration
};
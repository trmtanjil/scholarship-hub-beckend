import { prisma } from '../../lib/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
const createReviewIntoDB = async (userId: string, payload: any) => {
    const scholarship = await prisma.scholarship.findUnique({
        where: { id: payload.scholarshipId },
    });
    if (!scholarship) {
        throw new AppError(httpStatus.NOT_FOUND, 'Scholarship not found');
    }
    const existingReview = await prisma.review.findFirst({
        where: { userId, scholarshipId: payload.scholarshipId },
    });
    if (existingReview) {
        throw new AppError(httpStatus.CONFLICT, 'You have already reviewed this scholarship');
    }
    const result = await prisma.review.create({
        data: {
            ...payload,
            userId,
        },
    });
    return result;
};
const getReviewsByScholarshipFromDB = async (scholarshipId: string) => {
    const result = await prisma.review.findMany({
        where: { scholarshipId },
        include: {
            user: { select: { id: true, name: true, image: true } },
        },
    });
    return result;
};

const getAllReviewsFromDB = async () => {
    const result = await prisma.review.findMany({
        include: {
            user: { select: { id: true, name: true, image: true } },
            scholarship: { select: { id: true, title: true, universityName: true } },
        },
    });
    return result;
};

const userUpdateReview = async (id: string, payload: any) => {
    const result = await prisma.review.update({
        where: { id },
        data: payload,
    });
    return result;
}

const deleteReviewFromDB = async (id: string, user: any) => {
    const review = await prisma.review.findUnique({
        where: { id },
    });
    if (!review) {
        throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
    }
    if (user.role === 'User' && review.userId !== user.id) {
        throw new AppError(httpStatus.FORBIDDEN, 'You can only delete your own reviews');
    }
    const result = await prisma.review.delete({
        where: { id },
    });
    return result;
};
export const ReviewsService = {
    // Add service methods here
    createReviewIntoDB,
    getReviewsByScholarshipFromDB,
    deleteReviewFromDB,
    getAllReviewsFromDB,
    userUpdateReview
    };
 
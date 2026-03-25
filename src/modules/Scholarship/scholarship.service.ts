import { Prisma } from '../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import { scholarshipSearchableFields } from './scholarship.constant';

const createScholarshipIntoDB = async (payload: any, userId: string) => {
    const result = await prisma.scholarship.create({
        data: {
            ...payload,
            deadline: new Date(payload.deadline),
            postedById: userId,
        },
    });
    return result;
};

const getAllScholarshipsFromDB = async (query: any) => {
    const { searchTerm, category, limit = 10, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const where: Prisma.ScholarshipWhereInput = {};

    if (searchTerm) {
        where.OR = scholarshipSearchableFields.map((field) => ({
            [field]: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        }));
    }

    if (category) {
        where.category = category;
    }

    const [result, total] = await Promise.all([
        prisma.scholarship.findMany({
            where,
            include: {
                postedBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.scholarship.count({ where }),
    ]);

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
        },
        data: result,
    };
};

const getSingleScholarshipFromDB = async (id: string) => {
    const result = await prisma.scholarship.findUnique({
        where: { id },
        include: {
            postedBy: {
                select: { id: true, name: true, email: true },
            },
            reviews: {
                include: { user: { select: { name: true, image: true } } },
            },
        },
    });
    return result;
};

const updateScholarshipIntoDB = async (id: string, payload: any) => {
    if (payload.deadline) {
        payload.deadline = new Date(payload.deadline);
    }

    const result = await prisma.scholarship.update({
        where: { id },
        data: payload,
    });
    return result;
};

const deleteScholarshipFromDB = async (id: string) => {
    const result = await prisma.scholarship.delete({
        where: { id },
    });
    return result;
};

export const ScholarshipService = {
    createScholarshipIntoDB,
    getAllScholarshipsFromDB,
    getSingleScholarshipFromDB,
    updateScholarshipIntoDB,
    deleteScholarshipFromDB,
};

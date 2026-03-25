import { Category } from "../../generated/prisma/client";

export type TScholarship = {
    title: string;
    universityName: string;
    category: Category;
    subject: string;
    description: string;
    deadline: Date;
    applicationFee: number;
    postedById: string;
    };
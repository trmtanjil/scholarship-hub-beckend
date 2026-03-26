
import { Category } from "../../generated/prisma/client";

export type TScholarship = {
    title: string;
    universityName: string;
    category: Category;
    subject: string;
    description: string;
    deadline: Date;
    applicationFee: number;
    universityImage?: string;
    postedById: string;
};
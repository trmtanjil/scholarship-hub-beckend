import { ApplicationStatus } from "../../generated/prisma/client";

export type TApplication = {
    userId: string;
    scholarshipId: string;
    status: ApplicationStatus;
    sscResult: number;
    hscResult: number;
    documents: string;
    };
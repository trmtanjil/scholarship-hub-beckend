 import { Prisma } from '../generated/prisma/client';
import { TErrorSources, TGenericErrorResponse } from './error.interface';
 
const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): TGenericErrorResponse => {
  let statusCode = 500;
  let message = 'Prisma Database Error';
  let errorSources: TErrorSources = [];

  // P2002: Unique constraint failed (যেমন: একই transactionId দুইবার দিলে)
  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'Duplicate Entry';
    errorSources = [
      {
        path: '',
        message: `${err.meta?.target} already exists`,
      },
    ];
  } 
  // P2025: Record not found
  else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record Not Found';
    errorSources = [
      {
        path: '',
        message: (err.meta?.cause as string) || 'The record you are looking for does not exist',
      },
    ];
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handlePrismaError;
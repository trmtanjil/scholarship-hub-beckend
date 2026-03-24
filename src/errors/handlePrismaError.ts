import { Prisma } from '../generated/prisma/client';
import { TErrorSources } from '../interface/error.interface';

const handlePrismaError = (
  err:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError
    | Prisma.PrismaClientInitializationError
) => {
  let statusCode = 400;
  let message = 'Prisma Error';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: err.message,
    },
  ];

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    message = 'Prisma Client Known Request Error';
    errorSources = [
      {
        path: (err.meta?.target as string) || '',
        message: err.message,
      },
    ];
    if (err.code === 'P2002') {
      message = 'Duplicate Entry';
      errorSources = [
        {
          path: '',
          message: 'There is a unique constraint violation.',
        },
      ];
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = 'Prisma Initialization Error';
    errorSources = [
      {
        path: '',
        message: err.message,
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

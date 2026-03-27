import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from './error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      // String() ব্যবহার করে নিশ্চিত করো যে এটি সবসময় string হবে
      path: String(issue?.path[issue.path.length - 1]), 
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
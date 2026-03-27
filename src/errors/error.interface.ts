 
export type TErrorSources = {
  path: string; // এখানে 'string | number' এর বদলে শুধু 'string' করে দাও
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
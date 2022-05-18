import { HttpExceptionFilter } from './http-exception.filter';

export const setupApp = (app: any) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};

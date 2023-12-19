import { client, publicAxios } from './axios';

export enum RequestMethod {
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
  GET = 'GET',
}

interface CreateApiOptions {
  url: string;
  data: object;
  method?: RequestMethod;
}

export const createPrivateApi = async (options?: CreateApiOptions) => {
  const method = options?.method?.toLowerCase() || RequestMethod.POST.toLowerCase();

  return await (client as any)[method]?.(options?.url, options?.data);
};

export const createPublicApi = async (options?: CreateApiOptions) => {
  const method = options?.method?.toLowerCase() || RequestMethod.POST.toLowerCase();

  return await (publicAxios as any)[method]?.(options?.url, options?.data);
};

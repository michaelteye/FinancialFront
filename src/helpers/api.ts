import { client } from './axios';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useLocation } from 'react-router-dom';
import { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

interface UseApiOptions<ResponseDataType = any, ErrorDataType = any> {
  onSuccess?: (response: AxiosResponse<ResponseDataType>) => void;
  onError?: (error: AxiosError<ErrorDataType>) => void;
  method?: RequestMethod;
  headers?: AxiosRequestHeaders;
}


export function useApi<T extends object, D extends object = any, E extends object = any>(
  url: string,
  options?: UseApiOptions<D, E>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<D>();
  const { accessToken } = useAuthStore();
  const { pathname } = useLocation();
  const controller = new AbortController();

  const noRedirectOn401Routes = ['/dashboard/settings', '/auth/login/password', '/auth/login', '/auth/register'];

  const submit = async (data?: T) => {
    setIsLoading(true);

    try {
      const method = options?.method?.toLowerCase() || RequestMethod.POST.toLowerCase();

      const requestConfig: AxiosRequestConfig = {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...options?.headers,
        },
      };

      const response = await (client as any)[method]?.(
        url,
        method === RequestMethod.GET.toLowerCase() || method === RequestMethod.DELETE.toLowerCase()
          ? requestConfig
          : data,
        requestConfig
      );

      setData(response?.data?.data ? response?.data.data : response?.data);

      options?.onSuccess?.(response);
    } catch (error: any) {
      setError(error?.response?.data);

      if (
        error?.response?.status === 401 &&
        error?.response.data?.message !== 'You entered a wrong pin' &&
        !noRedirectOn401Routes.includes(pathname)
      ) {
        // useAuthStore.getState().logout();

        useAuthStore.setState({
          loading: false,
        });
      }

      options?.onError?.(error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    data,
    submit,
    setError,
    setIsLoading,
    controller,
  };
}

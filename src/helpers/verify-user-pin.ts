import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { client } from './axios';

const url = import.meta.env.VITE_API_URL;

export const verifyUserPin = (pin?: string) => {
  return axios.get(`${url}/users/pin/verify/${pin}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
    },
  });
};

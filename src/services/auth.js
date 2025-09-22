import axios from 'axios';
import { setAuthHeader, clearAuthHeader } from './api';

export const signup = async credentials => {
  const { data } = await axios.post('/users/signup', credentials);
  setAuthHeader(data.token);
  return data;
};

export const login = async credentials => {
  const { data } = await axios.post('/users/login', credentials);
  setAuthHeader(data.token);
  return data;
};

export const logout = async () => {
  await axios.post('/users/logout');
  clearAuthHeader();
};

export const refreshUser = async () => {
  const { data } = await axios.get('/users/current');
  return data;
};

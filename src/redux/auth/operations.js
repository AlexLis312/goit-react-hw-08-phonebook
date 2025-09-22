import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../services/auth';
import { setAuthHeader } from '../../services/api';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const data = await authAPI.signup(credentials);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const data = await authAPI.login(credentials);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authAPI.logout();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('Нет токена');
    }

    try {
      setAuthHeader(token);
      const user = await authAPI.refreshUser();
      return user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

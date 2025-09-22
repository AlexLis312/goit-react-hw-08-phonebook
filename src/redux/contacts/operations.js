import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from '../../services/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await contactsAPI.getContacts();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkAPI) => {
    try {
      return await contactsAPI.addContact(contact);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      await contactsAPI.deleteContact(id);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

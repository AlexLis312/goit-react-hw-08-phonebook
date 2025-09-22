import axios from 'axios';

export const getContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const addContact = async contact => {
  const { data } = await axios.post('/contacts', contact);
  return data;
};

export const deleteContact = async id => {
  await axios.delete(`/contacts/${id}`);
  return id;
};

export const updateContact = async (id, updates) => {
  const { data } = await axios.patch(`/contacts/${id}`, updates);
  return data;
};

import axios from 'axios';

const BASE = '/api';

export const createDateRequest = (data) =>
  axios.post(`${BASE}/date-request`, data);

export const getDateRequest = (id) =>
  axios.get(`${BASE}/date-request-get/${id}`);

export const respondToDateRequest = (id, data) =>
  axios.put(`${BASE}/date-request-respond/${id}`, data);

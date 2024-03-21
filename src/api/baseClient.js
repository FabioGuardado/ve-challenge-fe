import axios from 'axios';

const baseClient = axios.create({
  baseURL: 'http://localhost:5000',
});

export default baseClient;
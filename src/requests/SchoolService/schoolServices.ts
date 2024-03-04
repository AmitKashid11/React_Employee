import axios from 'axios';

export default axios.create({
  baseURL: 'http://employeeapi.aaditechnology.info/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

import axios from 'axios';

export const HOST = 'http://localhost:5001/api';
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5NjJkNDI5My0yYTFjLTQyNDMtODZkOS04MzRmNjE0ZmNiZDUiLCJzZWNyZXQiOiIzYWRiYWYwZC03NjEyLTRlMDAtYjhiOC1mOTBlMmFkOTQyYWQiLCJpYXQiOjE1MjE3NDAzODQsImV4cCI6MTUyMjM0NTE4NH0.GH6pS6-C9c9f3yDH8KhLq8UdkF9befFEM70Nm-HnIsY';

export function objectToQueryString(params) {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

export function requestChartData(endpoint, params) {
  const url = `${HOST}/graphics${endpoint}`;
  const authedParams = {
    ...params,
    token: TOKEN
  };
  const queryString = objectToQueryString(authedParams);
  const path = `${url}?${queryString}`;
  
  return axios.get(path)
    .then(response => {
      return response.data
    });
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getMonthName(dateNumber) {
  const dateString = dateNumber;
  const date = new Date(dateString);
  const locale = 'es-mx';
  const month = date.toLocaleDateString(locale, {month: 'long'});
  return capitalize(month);
}

export function stripPosfix(str) {
  return str.replace(/_[a-z0-9]+$/i, '');
}
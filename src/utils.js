import axios from 'axios';

// export const HOST = 'https://localhost:5001/api';
export const HOST = 'https://alethea.abraxasintelligence.com/api';
// override with your own token
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMjlmNGZiNy1mYjM5LTQ5ZDItYmExOS1iMDA0ZmZiMjM4YjEiLCJzZWNyZXQiOiJiZDZhMGIyZi02ZDM3LTRjZDEtODYzMC1kN2M0OGZhMzNlOGUiLCJpYXQiOjE1MjIyNzY2OTYsImV4cCI6MTUyMjg4MTQ5Nn0.-Ixy4LIuGw6HErQdOrzAExLS7OV7Sa5CvhVNLvxVZSY';

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
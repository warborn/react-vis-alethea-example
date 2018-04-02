import axios from 'axios';

export const HOST = 'http://localhost:5001/api';
// export const HOST = 'https://alethea.abraxasintelligence.com/api';
// override with your own token
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIwNzY0NDc3Yi05MTg3LTQyYmUtYjI2MC1mOGExMTlhMmRlMDciLCJzZWNyZXQiOiJlM2U2YzZhMy1hODBhLTQwYzMtOTI0OS1hOTI5NTkwNzFjNDIiLCJpYXQiOjE1MjI0MjkzNzMsImV4cCI6MTUyMzAzNDE3M30.RVyMCGcn8hbxBZv2VxDVv6gDkJlWfpfBs0huMisKBz0';

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

export function generateColors(existingColors, data) {
  let colors = {...existingColors};
  Object
    .keys(data)
    .forEach(locationId => {
      if(!colors[locationId]) {
        colors[locationId] = {}
      }
      Object
        .keys(data[locationId] || {})
        .filter(key => ['indices', 'incidents'].includes(key))
        .forEach(locationKey => {
          if(!colors[locationId][locationKey]) {
            colors[locationId][locationKey] = {}
          }

          Object
            .keys(data[locationId][locationKey] || {})
            .forEach(locationSubKey => {
              if(!colors[locationId][locationKey][locationSubKey]) {
                colors[locationId][locationKey][locationSubKey] = generateColor();
              }
            })
        })
    });
  return colors;
}

export function generateColor() {
  let color = Math.floor(0x1000000 * Math.random()).toString(16);
  return '#' + ('000000' + color).slice(-6);
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
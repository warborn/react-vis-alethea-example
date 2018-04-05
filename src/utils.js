import axios from 'axios';
import { HOST, TOKEN } from './constants';

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

export function convertHourToLabel(hour) {
  let h = hour % 12 || 12;
  let ampm = (hour < 12 || hour === 11) ? 'am' : 'pm';
  return h + ampm;
}

export function convertDayToLabel(day) {
  return ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][day - 1];
}
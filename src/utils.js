export const HOST = 'http://localhost:5001/api';

export function objectToQueryString(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}
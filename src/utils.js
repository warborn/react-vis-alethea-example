export const HOST = 'http://localhost:5001/api';
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5NjJkNDI5My0yYTFjLTQyNDMtODZkOS04MzRmNjE0ZmNiZDUiLCJzZWNyZXQiOiIzYWRiYWYwZC03NjEyLTRlMDAtYjhiOC1mOTBlMmFkOTQyYWQiLCJpYXQiOjE1MjE3NDAzODQsImV4cCI6MTUyMjM0NTE4NH0.GH6pS6-C9c9f3yDH8KhLq8UdkF9befFEM70Nm-HnIsY';

export function objectToQueryString(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}
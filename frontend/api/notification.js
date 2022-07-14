import fetcher from '../utils/fetcher.js';
export const getNotification = () => fetcher.get('/notifications').then((res) => res.payload);

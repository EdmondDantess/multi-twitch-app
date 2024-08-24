import axios from 'axios';
import { tokenFromURL } from '../helpers/getTokenFromURL';

export const instance = axios.create({
  baseURL: 'https://api.twitch.tv/',
  headers: {
    'Authorization': `Bearer ${tokenFromURL}`,
    'Client-Id': process.env.REACT_APP_CLIENT_ID,
  },
});

import axios from 'axios'
import {location} from '../common/utils/modeLocalToVercel';

export const instance = axios.create({
    baseURL: 'https://api.twitch.tv/',
    headers: {
        'Authorization': `Bearer ${window.location.href.slice(location.indexOf('access_token=') + 13, location.indexOf('&scope='))
        }`,
        'Client-Id': process.env.REACT_APP_CLIENT_ID,
    }
})
import axios from 'axios';

import { ApiRoute } from '../constants/Routes';

export const axiosInstance = axios.create({
    baseURL: ApiRoute,
    responseType: 'json',
});
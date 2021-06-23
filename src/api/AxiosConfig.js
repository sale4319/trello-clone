import { useState } from 'react';
import axios from 'axios';

import { ApiRoute } from '../constants/Routes';

export const axiosInstance = axios.create({
    baseURL: ApiRoute,
    responseType: 'json',
});

export const useApiResponse = () => {
    const [data, setData] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState();

    return { data, setData, isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess };
};
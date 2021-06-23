import { axiosInstance } from '../AxiosConfig';

const keyToken = (tokenHolder) => `?key=${tokenHolder.apiKey}&token=${tokenHolder.apiToken}`;

export const updateListPosition = (
    id,
    newPosition,
    tokenHolder,
) => axiosInstance.put(`1/lists/${id}${keyToken(tokenHolder)}&pos=${newPosition}`);
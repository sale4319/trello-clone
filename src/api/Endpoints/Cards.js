import { axiosInstance } from '../AxiosConfig';

const keyToken = (tokenHolder) => `?key=${tokenHolder.apiKey}&token=${tokenHolder.apiToken}`;

export const updateCardPositionInSameList = (
    id,
    newPosition,
    tokenHolder,
) => axiosInstance.put(`1/cards/${id}${keyToken(tokenHolder)}&pos=${newPosition}`);

export const updateCardPositionDifferentList = (
    id,
    listId,
    newPosition,
    tokenHolder,
) =>
    axiosInstance.put(`1/cards/${id}${keyToken(tokenHolder)}&pos=${newPosition}&idList=${listId}`);
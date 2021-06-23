import { axiosInstance } from '../AxiosConfig';

const keyToken = (tokenHolder) => `?key=${tokenHolder.apiKey}&token=${tokenHolder.apiToken}`;

export const updateListPosition = (
    id,
    newPosition,
    tokenHolder,
) => axiosInstance.put(`1/lists/${id}${keyToken(tokenHolder)}&pos=${newPosition}`);

export const createList = (boardId, name, tokenHolder) =>
    axiosInstance.post(`1/lists${keyToken(tokenHolder)}&idBoard=${boardId}&name=${name}&pos=bottom`);

export const editListName = (id, name, tokenHolder) =>
    axiosInstance.put(`1/lists/${id}${keyToken(tokenHolder)}&name=${name}`);

//Lists can not be deleted so we will close them
export const closeList = (id, tokenHolder) =>
    axiosInstance.put(`1/lists/${id}${keyToken(tokenHolder)}&closed=true`);
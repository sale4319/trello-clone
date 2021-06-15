import { axiosInstance } from './AxiosConfig';

const keyToken = (tokenHolder) => `?key=${tokenHolder.apiKey}&token=${tokenHolder.apiToken}`;

export const getAllBoards = (tokenHolder) => {
    return axiosInstance.get(`1/members/me/boards${keyToken(tokenHolder)}`);
};

export const getBoard = (id, tokenHolder) =>
    axiosInstance.get(`1/boards/${id}${keyToken(tokenHolder)}`);
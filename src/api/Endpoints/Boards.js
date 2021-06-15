import { axiosInstance } from '../AxiosConfig';

const keyToken = (tokenHolder) => `?key=${tokenHolder.apiKey}&token=${tokenHolder.apiToken}`;

export const getAllBoards = (tokenHolder) =>
    axiosInstance.get(`1/members/me/boards${keyToken(tokenHolder)}`);

export const getBoard = (id, tokenHolder) =>
    axiosInstance.get(`1/boards/${id}${keyToken(tokenHolder)}&lists=open&cards=visible`);

export const createBoard = (name, tokenHolder) =>
    axiosInstance.post(`1/boards${keyToken(tokenHolder)}&name=${name}`);

export const deleteBoard = (id, tokenHolder) =>
    axiosInstance.delete(`1/boards/${id}${keyToken(tokenHolder)}`);
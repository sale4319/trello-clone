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

export const createNewCard = (listId, name, tokenHolder) =>
    axiosInstance.post(`1/cards${keyToken(tokenHolder)}&idList=${listId}&name=${name}&pos=bottom`);

export const editCard = (cardId, name, tokenHolder) =>
    axiosInstance.put(`1/cards/${cardId}${keyToken(tokenHolder)}&name=${name}`);

export const deleteCard = (cardId, tokenHolder) =>
    axiosInstance.delete(`1/cards/${cardId}${keyToken(tokenHolder)}`);

export const setCardDescription = (
    cardId,
    description,
    tokenHolder,
) => axiosInstance.put(`1/cards/${cardId}${keyToken(tokenHolder)}&desc=${description}`);

export const getCardComments = (cardId, tokenHolder) =>
    axiosInstance.get(`1/cards/${cardId}/actions${keyToken(tokenHolder)}&filter=commentCard`);

export const addCardComment = (
    cardId,
    comment,
    tokenHolder,
) =>
    axiosInstance.post(`1/cards/${cardId}/actions/comments${keyToken(tokenHolder)}&text=${comment}`);

export const updateCardComment = (cardId, commentId, newValue, tokenHolder) =>
    axiosInstance.put(`1/cards/${cardId}/actions/${commentId}/comments${keyToken(tokenHolder)}&text=${newValue}`);

export const deleteCardComment = (cardId, commentId, tokenHolder) =>
    axiosInstance.delete(`1/cards/${cardId}/actions/${commentId}/comments${keyToken(tokenHolder)}`);
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { AuthContext, BoardContext } from '../../providers/';
import { createBoard, editBoardName, deleteBoard, getAllBoards, getBoard } from '../apiEndpoints/Boards';
import { useApiResponse } from '../AxiosConfig';

export const useGetBoards = () => {
    const { tokenHolder } = useContext(AuthContext);
    const { setBoards } = useContext(BoardContext);
    const { pathname } = useLocation();
    const { data, setData, isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();
    useEffect(() => {
        console.log('calling useGetBoards()');
        setIsFetching(true);

        getAllBoards(tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                setData(data);
                setBoards(data);
            })
            .catch(({ response }) => setError(response?.data))
            .finally(() => setIsFetching(false));
    }, [pathname]);
    return { data, isFetching, error, isSuccess };
};

export const useGetBoard = (id) => {
    const { tokenHolder } = useContext(AuthContext);
    const {
        data,
        setData,
        isFetching,
        setIsFetching,
        error,
        setError,
        isSuccess,
        setIsSuccess,
    } = useApiResponse();
    useEffect(() => {
        if (!id) return;
        console.log(`calling useGetBoard(${id})`);
        setIsFetching(true);

        getBoard(id, tokenHolder)
            .then(({ data }) => {
                setData(data);
                setIsSuccess(true);
            })
            .catch(({ response }) => setError(response?.data))
            .finally(() => setIsFetching(false));
    }, [id]);
    return { data, isFetching, error, isSuccess };
};

export const useCreateBoard = (name) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!name) return;
        console.log(`calling useCreateBoard(${name})`);
        setIsFetching(true);
        createBoard(name, tokenHolder)
            .then(() => setIsSuccess(true))
            .catch(({ response }) => {
                setError(response?.data);
            })
            .finally(() => setIsFetching(false));
    }, [name]);
    return { isFetching, error, isSuccess };
};

export const useDeleteBoard = (id) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!id) return;
        console.log(`calling useDeleteBoard(${id})`);
        setIsFetching(true);
        deleteBoard(id, tokenHolder)
            .then(() => setIsSuccess(true))
            .catch(({ response }) => {
                setError(response?.data);
            })
            .finally(() => setIsFetching(false));
    }, [id]);
    return { isSuccess, isFetching };
};

export const useEditBoardName = (id, newName) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!id || !newName) return;

        setIsFetching(true);
        editBoardName(id, newName, tokenHolder)
            .then(() => setIsSuccess(true))
            .catch(({ response }) => setError(response?.data))
            .finally(() => setIsFetching(false));
    }, [id, newName]);
    return { isFetching, isSuccess };
};
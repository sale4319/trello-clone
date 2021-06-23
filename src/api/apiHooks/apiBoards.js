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

        return () => {
            setError(undefined);
        };
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

        return () => {
            console.log(`cleanup useGetBoard(${id})`);
            setError(undefined);
        };
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

        return () => {
            console.log(`cleanup useCreateBoard(${name})`);
            setError('');
        };
    }, [name]);
    return { isFetching, error, isSuccess };
};

export const useDeleteBoard = (id) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();

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

        return () => {
            setError('');
            setIsSuccess(false);
        };
    }, [id]);
    return { isSuccess, isFetching };
};

export const useEditBoardName = (id, oldName, newName, editingInProcess) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!id || !newName || editingInProcess || oldName === newName) return;

        setIsFetching(true);
        editBoardName(id, newName, tokenHolder)
            .then(() => setIsSuccess(true))
            .catch(({ response }) => setError(response?.data))
            .finally(() => setIsFetching(false));
    }, [editingInProcess]);

    return { isFetching, isSuccess };
};
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../providers/AuthContext';
import { createBoard, deleteBoard, getAllBoards, getBoard } from '../apiEndpoints/Boards';
import { useApiResponse } from '../AxiosConfig';

export const useGetBoards = () => {
    const { tokenHolder } = useContext(AuthContext);
    const { data, setData, isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();
    useEffect(() => {
        console.log('calling useGetBoards()');
        setIsFetching(true);

        getAllBoards(tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                setData(data);
            })
            .catch(({ response }) => setError(response?.data))
            .finally(() => setIsFetching(false));

        return () => {
            setError(undefined);
        };
    }, [tokenHolder, setData, setError, setIsFetching, setIsSuccess]);
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
    }, [id, tokenHolder, setData, setError, setIsFetching, setIsSuccess]);
    return { data, isFetching, error, isSuccess };
};

export const useCreateBoard = (name) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!name) return;
        setIsFetching(true);
        console.log(`calling useCreateBoard(${name})`);
        setError(undefined);
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
    }, [name, tokenHolder, setError, setIsFetching, setIsSuccess]);
    return { isFetching, error, isSuccess };
};

export const useDeleteBoard = (id) => {
    const { tokenHolder } = useContext(AuthContext);
    const { isFetching, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!id) return;
        setIsFetching(true);
        console.log(`calling useDeleteBoard(${id})`);
        setError(undefined);
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
    }, [id, tokenHolder, setError, setIsFetching, setIsSuccess]);
    return { isSuccess, isFetching, error };
};
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

        console.log('calling useGetBoards');
        setIsFetching(true);
        setIsSuccess(false);
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

        setIsFetching(true);
        setIsSuccess(false);
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
    const { setBoards, boards } = useContext(BoardContext);
    const { isFetching, data, setData, setIsFetching, error, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!name) return;

        console.log(`calling useCreateBoard`);
        setIsFetching(true);
        setIsSuccess(false);
        createBoard(name, tokenHolder)
            .then(({ data: newBoard }) => {
                setIsSuccess(true);
                setData(newBoard);
                setBoards([...boards, newBoard]);
            })
            .catch(({ response }) => {
                setError(response?.data);
            })
            .finally(() => setIsFetching(false));
    }, [name]);
    return { data, isFetching, error, isSuccess };
};

export const useDeleteBoard = (id) => {
    const { tokenHolder } = useContext(AuthContext);
    const { setBoards, boards } = useContext(BoardContext);
    const { isFetching, setIsFetching, setError, isSuccess, setIsSuccess } = useApiResponse();

    useEffect(() => {
        if (!id) return;

        console.log(`calling useDeleteBoard`);
        setIsFetching(true);
        setIsSuccess(false);
        deleteBoard(id, tokenHolder)
            .then(() => {
                setIsSuccess(true);
                setBoards(boards.filter(board => board.id !== id));
            })
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

        console.log(`calling useEditBoardName`);
        setIsFetching(true);
        setIsSuccess(false);
        editBoardName(id, newName, tokenHolder)
            .then(() => setIsSuccess(true))
            .catch(({ response }) => setError(response?.data))
            .finally(() => setIsFetching(false));
    }, [id, newName]);
    return { isFetching, isSuccess };
};
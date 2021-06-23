import { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useApiResponse } from '../AxiosConfig';
import { AuthContext, BoardContext } from '../../providers/';
import { createList, updateListPosition, closeList } from '../apiEndpoints/Lists';

export const useUpdateListPosition = (movedList) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    const { listId: id, newPosition: position } = movedList;

    useEffect(() => {
        if (!id || position === 0) return;

        console.log(`calling useUpdateListPosition`);
        setIsFetching(true);
        setIsSuccess(false);
        updateListPosition(id, position, tokenHolder)
            .then(({ data: updatedList }) => {
                const filteredLists = selectedBoard?.lists.filter(list => list.id !== updatedList.id);
                if (selectedBoard) {
                    if (filteredLists) {
                        const newLists = _.sortBy([...filteredLists, updatedList], 'pos');
                        setSelectedBoard({ ...selectedBoard, lists: newLists });
                    } else {
                        setSelectedBoard({ ...selectedBoard, lists: [updatedList] });
                    }
                }
                setIsSuccess(true);
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [id, position]);

    return { isSuccess, error, isFetching };
};

export const useCreateList = (name) => {
    const { isSuccess, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard, boards, setBoards } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    useEffect(() => {
        if (!name) return;

        if (selectedBoard) {
            setIsFetching(true);
            createList(selectedBoard.id, name, tokenHolder)
                .then(({ data }) => {
                    let updatedBoard;
                    updatedBoard = selectedBoard.lists
                        ? { ...selectedBoard, lists: [...selectedBoard.lists, data] }
                        : { ...selectedBoard, lists: [data] };
                    setSelectedBoard(updatedBoard);
                    setBoards([...boards.filter(board => board.id !== updatedBoard.id), updatedBoard]);
                    setIsSuccess(true);
                })
                .catch(({ response }) => setError(response.data))
                .finally(() => setIsFetching(false));
        }
    }, [name]);

    return { isSuccess, error };
};

export const useCloseList = (id) => {
    const { isSuccess, error, setError, setIsFetching, setIsSuccess } = useApiResponse();
    const { tokenHolder } = useContext(AuthContext);
    const { selectedBoard, setSelectedBoard, boards, setBoards } = useContext(BoardContext);

    useEffect(() => {
        if (!id) return;

        console.log(`calling useCloseList(${id})`);
        setIsFetching(true);
        closeList(id, tokenHolder)
            .then(() => {
                if (selectedBoard) {
                    const updatedBoardLists = selectedBoard.lists.filter(list => list.id !== id);
                    const updatedBoard = { ...selectedBoard, lists: updatedBoardLists };
                    setSelectedBoard(updatedBoard);
                    setBoards([...boards.filter(board => board.id !== selectedBoard.id), updatedBoard]);
                }
                setIsSuccess(true);
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [id]);

    return { isSuccess, error };
};
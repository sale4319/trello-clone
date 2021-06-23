import { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useApiResponse } from '../AxiosConfig';
import { AuthContext, BoardContext } from '../../providers/';
import { updateCardPositionDifferentList, updateCardPositionInSameList, createNewCard } from '../apiEndpoints/Cards';

export const useCreateCard = (listId, name) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard, boards, setBoards } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    useEffect(() => {
        if (!listId || !name) return;

        console.log(`calling useCreateCard`);
        setIsFetching(true);
        createNewCard(listId, name, tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                if (selectedBoard) {
                    const newCards = _.sortBy([...selectedBoard.cards, data], 'pos');
                    const updatedBoard = { ...selectedBoard, cards: newCards };
                    setSelectedBoard(updatedBoard);
                    setBoards([...boards.filter(board => board.id !== updatedBoard.id), updatedBoard]);
                }
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [listId, name]);

    return { isSuccess, error, isFetching };
};

export const useUpdateCardPosition = (movedCard) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    const { newPosition, id, sourceListId, targetListId } = movedCard;

    const updateBoardContext = (updatedCard) => {
        if (selectedBoard) {
            const allOtherCards = selectedBoard?.cards?.filter(card => card.id !== updatedCard.id) ?? [];
            const cardsInList = selectedBoard.cards
                ?.filter(card => card.idList === targetListId)
                .filter(card => card.id !== updatedCard.id);
            if (cardsInList && cardsInList.length > 0) {
                const cardsInListSorted = _.sortBy([...cardsInList, updatedCard], 'pos');
                const cardsInOtherLists = selectedBoard.cards?.filter(card => card.idList !== targetListId) ?? [];
                setSelectedBoard({ ...selectedBoard, cards: [...cardsInListSorted, ...cardsInOtherLists] });
            } else {
                setSelectedBoard({ ...selectedBoard, cards: [...allOtherCards, updatedCard] });
            }
        }
    };

    useEffect(() => {
        if (newPosition === 0 || !id) return;
        console.log(`calling useUpdateCardPosition`);
        setIsFetching(true);
        if (sourceListId !== targetListId) {
            updateCardPositionDifferentList(id, targetListId, newPosition, tokenHolder)
                .then(({ data: updatedCard }) => {
                    updateBoardContext(updatedCard);
                    setIsSuccess(true);
                })
                .catch(({ response }) => setError(response.data))
                .finally(() => setIsFetching(false));
        } else {
            updateCardPositionInSameList(id, newPosition, tokenHolder)
                .then(({ data: updatedCard }) => {
                    updateBoardContext(updatedCard);
                    setIsSuccess(true);
                })
                .catch(({ response }) => setError(response.data))
                .finally(() => setIsFetching(false));
        }
    }, [newPosition, id, sourceListId, targetListId]);
    return { isSuccess, error, isFetching };
};
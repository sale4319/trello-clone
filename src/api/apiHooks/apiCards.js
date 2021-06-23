import { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useApiResponse } from '../AxiosConfig';
import { AuthContext, BoardContext } from '../../providers/';
import { updateCardPositionDifferentList, updateCardPositionInSameList } from '../apiEndpoints/Cards';

export const useUpdateCardPosition = (movedCard) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    const { newPosition, id, sourceListId, targetListId } = movedCard;

    const updateBoardContext = (updatedCard) => {
        if (selectedBoard) {
            const allOtherCards = selectedBoard?.cards.filter(card => card.id !== updatedCard.id) ?? [];
            const cardsInList = selectedBoard.cards
                .filter(card => card.idList === targetListId)
                .filter(card => card.id !== updatedCard.id);
            if (cardsInList && cardsInList.length > 0) {
                const cardsInListSorted = _.sortBy([...cardsInList, updatedCard], 'pos');
                const cardsInOtherLists = selectedBoard.cards.filter(card => card.idList !== targetListId) ?? [];
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
        setIsSuccess(false);
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
    }, [isSuccess, error, isFetching]);
    return { isSuccess, error, isFetching };
};
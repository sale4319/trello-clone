import { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useApiResponse } from '../AxiosConfig';
import { AuthContext, BoardContext, CardModalContext } from '../../providers/';
import {
    updateCardPositionDifferentList,
    updateCardPositionInSameList,
    setCardDescription,
    addCardComment,
    getCardComments,
    deleteCardComment,
    updateCardComment,
    createNewCard,
    editCard,
    deleteCard
} from '../apiEndpoints/Cards';

export const useCreateCard = (listId, name) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard, boards, setBoards } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    useEffect(() => {
        if (!listId || !name) return;

        console.log(`calling useCreateCard`);
        setIsFetching(true);
        setIsSuccess(false);
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
    }, [newPosition, id, sourceListId, targetListId]);
    return { isSuccess, error, isFetching };
};

export const useEditCard = (name, cardId) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard, boards, setBoards } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    useEffect(() => {
        if (!cardId || !name) return;

        console.log(`calling useEditCard`);
        setIsFetching(true);
        setIsSuccess(false);
        editCard(cardId, name, tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                if (selectedBoard) {
                    const updatedCards = _.sortBy(
                        [...selectedBoard.cards.filter(card => card.id !== cardId), data],
                        'pos',
                    );
                    const updatedBoard = { ...selectedBoard, cards: updatedCards };
                    setSelectedBoard(updatedBoard);
                    setBoards([...boards.filter(board => board.id !== updatedBoard.id), updatedBoard]);
                }
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [name, cardId]);
    return { isSuccess, isFetching, error };
};

export const useDeleteCard = (cardId) => {
    const { isSuccess, setIsFetching, setIsSuccess, setError, error, isFetching } = useApiResponse();
    const { tokenHolder } = useContext(AuthContext);
    const { setShowModal, setSelectedCard } = useContext(CardModalContext);
    const { selectedBoard, setSelectedBoard } = useContext(BoardContext);

    useEffect(() => {
        if (!cardId) return;

        console.log(`calling useDeleteCard`);
        setIsFetching(true);
        setIsSuccess(false);
        deleteCard(cardId, tokenHolder)
            .then(() => {
                setIsSuccess(true);
                setSelectedCard(undefined);
                setShowModal(false);
                if (selectedBoard) {
                    setSelectedBoard({
                        ...selectedBoard,
                        cards: selectedBoard.cards.filter(card => card.id !== cardId),
                    });
                }
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [cardId]);
    return { isSuccess, error, isFetching };
};

export const useSetCardDescription = (cardId, description) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { selectedBoard, setSelectedBoard, boards, setBoards } = useContext(BoardContext);
    const { tokenHolder } = useContext(AuthContext);

    useEffect(() => {
        if (!cardId || !description) return;

        console.log(`calling useSetCardDescription`);
        setIsFetching(true);
        setIsSuccess(false);
        setCardDescription(cardId, description, tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                if (selectedBoard) {
                    const updatedCards = [...selectedBoard.cards.filter(card => card.id !== data.id), data];
                    const updatedBoard = { ...selectedBoard, cards: _.sortBy(updatedCards, 'pos') };
                    setSelectedBoard(updatedBoard);
                    setBoards([...boards.filter(board => board.id !== updatedBoard.id), updatedBoard]);
                }
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [cardId, description]);
    return { isSuccess, isFetching, error };
};

export const useCreateComment = (cardId, comment) => {
    const { isSuccess, isFetching, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { tokenHolder } = useContext(AuthContext);
    const { selectedCardComments, setSelectedCardComments } = useContext(CardModalContext);

    useEffect(() => {
        if (!cardId || !comment) return;

        console.log(`calling useCreateComment`);
        setIsFetching(true);
        setIsSuccess(false);
        addCardComment(cardId, comment, tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                const updatedComments = [...selectedCardComments];
                updatedComments.unshift(data);
                setSelectedCardComments(updatedComments);
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [cardId, comment]);

    return { isSuccess, isFetching, error };
};

export const useLoadCardComments = (cardId) => {
    const { isSuccess, setIsFetching, setIsSuccess, setError, error } = useApiResponse();
    const { tokenHolder } = useContext(AuthContext);
    const { setSelectedCardComments } = useContext(CardModalContext);

    useEffect(() => {
        if (!cardId) return;

        console.log(`calling useGetCardComments`);
        setIsFetching(true);
        setIsSuccess(false);
        getCardComments(cardId, tokenHolder)
            .then(({ data }) => {
                console.log('here', data);
                setIsSuccess(true);
                setSelectedCardComments(data);
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [cardId]);

    return { isSuccess, error };
};

export const useEditCardComment = (cardId, commentId, newValue) => {
    const { isSuccess, setIsFetching, setIsSuccess, setError, error, isFetching } = useApiResponse();
    const { tokenHolder } = useContext(AuthContext);
    const { setSelectedCardComments, selectedCardComments } = useContext(CardModalContext);

    useEffect(() => {
        if (!cardId || !commentId || !newValue) return;

        console.log(`calling useEditCardComment`);
        setIsFetching(true);
        setIsSuccess(false);
        updateCardComment(cardId, commentId, newValue, tokenHolder)
            .then(({ data }) => {
                setIsSuccess(true);
                const updatedComments = [...selectedCardComments.filter(comment => comment.id !== data.id), data];
                setSelectedCardComments(_.orderBy(updatedComments, 'date', 'desc'));
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [cardId, commentId, newValue]);

    return { isSuccess, error, isFetching };
};

export const useDeleteCardComment = (cardId, commentId) => {
    const { isSuccess, setIsFetching, setIsSuccess, setError, error, isFetching } = useApiResponse();
    const { tokenHolder } = useContext(AuthContext);
    const { setSelectedCardComments, selectedCardComments } = useContext(CardModalContext);

    useEffect(() => {
        if (!cardId || !commentId) return;

        console.log(`calling useDeleteCardComment`);
        setIsFetching(true);
        setIsSuccess(false);
        deleteCardComment(cardId, commentId, tokenHolder)
            .then(() => {
                setIsSuccess(true);
                setSelectedCardComments(selectedCardComments.filter(comment => comment.id !== commentId));
            })
            .catch(({ response }) => setError(response.data))
            .finally(() => setIsFetching(false));
    }, [cardId, commentId]);

    return { isSuccess, error, isFetching };
};
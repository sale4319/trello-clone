import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, } from 'react-beautiful-dnd';

import { BoardContext, CardModalContext } from '../providers/';
import { List } from '../components/List/List';
import BoardTitle from '../components/Board/BoardTitle';
import ListNew from '../components/List/ListNew';
import CardModal from '../components/Card/CardModal';
import { useGetBoard } from '../api/apiHooks/apiBoards';
import { useUpdateListPosition } from '../api/apiHooks/apiLists';
import { useUpdateCardPosition } from '../api/apiHooks/apiCards';

export const Board = () => {
    const [selectedBoardId, setSelectedBoardId] = useState();
    const { selectedBoard: board, setSelectedBoard } = useContext(BoardContext); //, setSelectedListId
    const { showModal, setShowModal, selectedCard, setSelectedCard } = useContext(CardModalContext);

    const [movedList, setMovedList] = useState({ listId: '', newPosition: 0 });
    useUpdateListPosition(movedList);

    const [movedCard, setMovedCard] = useState({
        id: '',
        newPosition: 0,
        sourceListId: '',
        targetListId: '',
    });
    useUpdateCardPosition(movedCard);

    const { data } = useGetBoard(selectedBoardId);

    let { cardId, boardId } = useParams(); //,listId

    useEffect(() => {
        console.log('Get ids for deep linking', board);
        if (boardId) {
            setSelectedBoardId(boardId);
        }

        // **Can be used if deep link to list is necessary**
        // if (listId && board) {
        //     console.log('You deep linked to list', listId);
        //     board.lists.forEach(list => {
        //         if (list.id === listId) {
        //             setSelectedListId(list);
        //         }
        //     })
        // }

        if (cardId && board) {
            board.cards.forEach(card => {
                if (card.id === cardId) {
                    setShowModal(true);
                    setSelectedCard(card);
                }
            })
        }
    }, [board]);

    useEffect(() => {
        if (data) {
            setSelectedBoard(data);
        }
    }, [data]);

    const updateListPosition = (draggableId, destination) => {
        const { index: targetIndex } = destination;
        console.log(targetIndex);
        const sourceIndex = board?.lists.findIndex(list => list.id === draggableId) ?? 0;
        const numberOfLists = board?.lists.length;
        if (numberOfLists) {
            let newListPosition;
            if (targetIndex === 0) {
                newListPosition = 'top';
            } else if (targetIndex === numberOfLists - 1) {
                newListPosition = 'bottom';
            } else {
                newListPosition = calculateNewListPositionFromMovement(targetIndex, targetIndex > sourceIndex);
            }
            setMovedList({ newPosition: newListPosition, listId: draggableId });
        }
    };

    const calculateNewListPositionFromMovement = (targetIndex, leftToRight) => {
        if (board?.lists) {
            const x1 = board?.lists[targetIndex].pos;
            const x2 = leftToRight ? board?.lists[targetIndex + 1].pos : board?.lists[targetIndex - 1].pos;
            return x2 + (x1 - x2) / 2;
        }
        return 0;
    };

    const updateCardPosition = (draggableId, source, destination) => {
        const { index: targetIndex, droppableId: destinationDroppableId } = destination;
        const { droppableId: sourceDroppableId } = source;
        const numberOfCardsInList = board?.cards.filter(card => card.idList === destinationDroppableId).length ?? 0;

        if (board?.cards) {
            let newCardPosition;
            if (targetIndex === 0) {
                newCardPosition = 'top';
            } else if (
                targetIndex ===
                (sourceDroppableId === destinationDroppableId ? numberOfCardsInList - 1 : numberOfCardsInList)
            ) {
                newCardPosition = 'bottom';
            } else {
                const targetListCards = board.cards.filter(card => card.idList === destinationDroppableId);
                const toBeMoved = targetListCards[targetIndex].pos;
                const toBeMovedAdjacent = targetListCards[targetIndex - 1].pos;
                newCardPosition = toBeMovedAdjacent + (toBeMoved - toBeMovedAdjacent) / 2;
            }
            setMovedCard({
                id: draggableId,
                newPosition: newCardPosition,
                sourceListId: sourceDroppableId,
                targetListId: destinationDroppableId,
            });
        }

    };

    const handleDragEnd = (DropResult) => {
        const { reason, source, destination, draggableId, type } = DropResult;
        if (
            reason === 'DROP' &&
            destination &&
            !(destination.droppableId === source.droppableId && destination.index === source.index)
        ) {
            if (type === 'CARD') {
                handleDragCard(source, destination, draggableId);
                updateCardPosition(draggableId, source, destination);
            } else {
                handleDragList(draggableId, destination);
                updateListPosition(draggableId, destination);
            }
        }
    };

    const handleDragCard = (source, destination, draggableId) => {
        const { droppableId: sourceList } = source;
        const { droppableId: destinationList, index: destinationIndex } = destination;

        const targetCard = board?.cards.find(card => card.id === draggableId);

        if (targetCard && board?.cards) {
            if (sourceList === destinationList) {
                const otherListCards = board.cards.filter(card => card.idList !== destinationList);
                const targetListCards = board.cards
                    .filter(card => card.idList === sourceList)
                    .filter(card => card.id !== targetCard.id);
                targetListCards.splice(destinationIndex, 0, targetCard);
                setSelectedBoard({ ...board, cards: [...otherListCards, ...targetListCards] });
            } else {
                const updatedCard = { ...targetCard, idList: destinationList };
                const otherListCards = board.cards
                    .filter(card => card.idList !== destinationList)
                    .filter(card => card.id !== targetCard.id);
                const targetListCards = board.cards
                    .filter(card => card.idList === destinationList)
                    .filter(card => card.id !== updatedCard.id);
                targetListCards.splice(destinationIndex, 0, updatedCard);
                setSelectedBoard({ ...board, cards: [...otherListCards, ...targetListCards] });
            }
        }
    };

    const handleDragList = (draggableId, destination) => {
        if (board?.lists) {
            const movedList = board.lists.find(list => list.id === draggableId);
            if (movedList) {
                const updatedLists = board.lists.filter(list => list.id !== draggableId);
                updatedLists.splice(destination.index, 0, movedList);
                setSelectedBoard({ ...board, lists: updatedLists });
            }
        }
    };

    return (
        <div className="board-container">
            {board && <BoardTitle board={board} />}
            <div className="general-container">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="allLists" direction="horizontal" type="LIST" isDropDisabled={showModal}>
                        {provided => (
                            <div className="general-container" ref={provided.innerRef} {...provided.droppableProps}>
                                {board?.lists.map((list, index) => (
                                    <List
                                        index={index}
                                        key={list.id}
                                        list={list}
                                        cards={board?.cards.filter(card => card.idList === list.id)}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {showModal && selectedCard && <CardModal card={selectedCard} handleClose={() => setShowModal(false)} />}
                {board && <ListNew />}
            </div>
        </div>
    );
};
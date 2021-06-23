import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, } from 'react-beautiful-dnd';

import { BoardContext } from '../providers/';
import { Routes } from '../constants/Routes';
import { List } from '../components/List/List';
import BoardTitle from '../components/Board/BoardTitle';
import { useGetBoard } from '../api/apiHooks/apiBoards';
import { useUpdateListPosition } from '../api/apiHooks/apiLists';
import { useUpdateCardPosition } from '../api/apiHooks/apiCards';



export const Board = () => {
    const [selectedBoardId, setSelectedBoardId] = useState();
    const { pathname } = useLocation();
    const history = useHistory();
    const { selectedBoard: board, setSelectedBoard } = useContext(BoardContext);

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

    useEffect(() => {
        const pathSplit = pathname.split(`${Routes.Board}/`);
        if (pathSplit.length === 0 || !pathSplit[1]) {
            history.push(Routes.Home);
        } else {
            const pathSplit = pathname.split(`${Routes.Board}/`);
            const boardPathId = pathSplit[1];
            setSelectedBoardId(boardPathId);
        }
    }, []);

    useEffect(() => {
        if (data) {
            setSelectedBoard(data);
        }
    }, [data]);

    const updateListPosition = (draggableId, destination) => {
        const { index: targetIndex } = destination;
        console.log(targetIndex);
        const sourceIndex = board?.lists?.findIndex(list => list.id === draggableId) ?? 0;
        const numberOfLists = board?.lists?.length;
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
        const sourceIndex =
            board?.cards
                ?.filter(card => card.idList === destinationDroppableId)
                .findIndex(card => card.id === draggableId) ?? 0;
        const numberOfCardsInList = board?.cards?.filter(card => card.idList === destinationDroppableId).length ?? 0;

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

        const targetCard = board?.cards?.find(card => card.id === draggableId);

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
            <div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="allLists" direction="horizontal" type="LIST">
                        {provided => (
                            <div className="board-box" ref={provided.innerRef} {...provided.droppableProps}>
                                {board?.lists?.map((list, index) => (
                                    <List
                                        index={index}
                                        key={list.id}
                                        list={list}
                                        cards={board?.cards?.filter(card => card.idList === list.id)}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};
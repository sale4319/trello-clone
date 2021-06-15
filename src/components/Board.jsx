import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, } from 'react-beautiful-dnd';

import { getBoard } from '../api/Boards';
import { AuthContext } from '../providers/AuthContext';
import { Routes } from '../constants/Routes';
import { List } from '../components/List';

export const Board = () => {
    const { pathname } = useLocation();
    const { tokenHolder } = useContext(AuthContext);
    const history = useHistory();

    const [board, setBoard] = useState();

    useEffect(() => {
        const pathSplit = pathname.split(`${Routes.Board}/`);
        if (pathSplit.length > 1 && !!pathSplit[1]) {
            const boardId = pathSplit[1];
            getBoard(boardId, tokenHolder).then(({ data }) => {
                setBoard(data);
            });
        } else {
            history.push(Routes.Home);
        }
    }, []);

    const handleDragEnd = (DropResult) => {
        const { reason, source, destination, draggableId, type } = DropResult;
        if (
            reason === 'DROP' &&
            destination &&
            !(destination.droppableId === source.droppableId && destination.index === source.index)
        ) {
            if (type === 'CARD') {
                handleDragCard(source, destination, draggableId);
            } else {
                handleDragList(draggableId, destination);
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
                setBoard({ ...board, cards: [...otherListCards, ...targetListCards] });
            } else {
                const updatedCard = { ...targetCard, idList: destinationList };
                const otherListCards = board.cards
                    .filter(card => card.idList !== destinationList)
                    .filter(card => card.id !== targetCard.id);
                const targetListCards = board.cards
                    .filter(card => card.idList === destinationList)
                    .filter(card => card.id !== updatedCard.id);
                targetListCards.splice(destinationIndex, 0, updatedCard);
                setBoard({ ...board, cards: [...otherListCards, ...targetListCards] });
            }
        }
    };

    const handleDragList = (draggableId, destination) => {
        if (board?.lists) {
            const movedList = board.lists.find(list => list.id === draggableId);
            if (movedList) {
                const updatedLists = board.lists.filter(list => list.id !== draggableId);
                updatedLists.splice(destination.index, 0, movedList);
                setBoard({ ...board, lists: updatedLists });
            }
        }
    };

    return (
        <div className="board-container">
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
    );
};
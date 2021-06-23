import React, { useState, useContext } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../Card/Card';
import CardNew from '../Card/CardNew';
import ListTitle from './ListTitle';
import { CardModalContext } from '../../providers/';

export const List = ({ list, cards, index }) => {
    const [addingNewCard, setAddingNewCard] = useState(false);
    const { showModal } = useContext(CardModalContext);

    return (
        <Draggable draggableId={list.id} index={index} isDragDisabled={showModal}>
            {dragListProvided => (
                <div
                    className="list-container"
                    {...dragListProvided.dragHandleProps}
                    {...dragListProvided.draggableProps}
                    ref={dragListProvided.innerRef}>
                    <ListTitle name={list.name} listId={list.id} />
                    <Droppable droppableId={list.id} type="CARD" isDropDisabled={showModal}>
                        {(dropCardProvided, dropCardSnapshot) => (
                            <div
                                className={`list-box ${dropCardSnapshot.isDraggingOver && 'list-card-shadow'}`}
                                {...dropCardProvided.droppableProps}
                                ref={dropCardProvided.innerRef}>
                                {cards?.map((card, index) => (
                                    <Draggable
                                        draggableId={card.id}
                                        index={index}
                                        key={card.id}
                                        isDragDisabled={showModal}>
                                        {(dragProvided, dragSnapshot) => (
                                            <div
                                                {...dragProvided.draggableProps}
                                                {...dragProvided.dragHandleProps}
                                                ref={dragProvided.innerRef}>
                                                <Card card={card} isDragging={!showModal && dragSnapshot.isDragging} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {dropCardProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <CardNew show={addingNewCard} listId={list.id} handleClose={() => setAddingNewCard(false)} />
                    <div className="list-add-new-card" onClick={() => setAddingNewCard(true)}>
                        + Add {!!cards && cards.length > 0 ? 'another' : 'a'} card
                    </div>
                </div>
            )}
        </Draggable>
    );
};
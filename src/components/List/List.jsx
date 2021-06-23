import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../Card/Card';
import CardNew from '../Card/CardNew';
import ListTitle from './ListTitle';

export const List = ({ list, cards, index }) => {
    const [addingNewCard, setAddingNewCard] = useState(false);

    return (
        <Draggable draggableId={list.id} index={index}>
            {dragListProvided => (
                <div
                    className="list-container"
                    {...dragListProvided.dragHandleProps}
                    {...dragListProvided.draggableProps}
                    ref={dragListProvided.innerRef}>
                    <ListTitle name={list.name} listId={list.id} />
                    <Droppable droppableId={list.id} type="CARD">
                        {(dropCardProvided, dropCardSnapshot) => (
                            <div
                                className={`list-box ${dropCardSnapshot.isDraggingOver && 'list-card-shadow'}`}
                                {...dropCardProvided.droppableProps}
                                ref={dropCardProvided.innerRef}>
                                {cards?.map((card, index) => (
                                    <Draggable draggableId={card.id} index={index} key={card.id}>
                                        {(dragProvided, dragSnapshot) => (
                                            <div
                                                {...dragProvided.draggableProps}
                                                {...dragProvided.dragHandleProps}
                                                ref={dragProvided.innerRef}>
                                                <Card card={card} isDragging={dragSnapshot.isDragging} />
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
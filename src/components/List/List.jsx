import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { ListCard } from './ListCard';
import ListTitle from './ListTitle';

export const List = ({ list, cards, index }) => {

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
                                                <ListCard card={card} isDragging={dragSnapshot.isDragging} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {dropCardProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className="list-add-new-card">+ Add another card</div>
                </div>
            )}
        </Draggable>
    );
};
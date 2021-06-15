import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { ListCard } from './ListCard';

export const List = ({ list, cards, index }) => {

    return (
        <Draggable draggableId={list.id} index={index}>
            {dragListProvided => (
                <div
                    className="list-container"
                    {...dragListProvided.dragHandleProps}
                    {...dragListProvided.draggableProps}
                    ref={dragListProvided.innerRef}>
                    <div className="list-title">{list.name}</div>
                    <Droppable droppableId={list.id} type="CARD">
                        {(dropCardProvided, dropCardSnapshot) => (
                            <div
                                className="list-box"
                                {...dropCardProvided.droppableProps}
                                ref={dropCardProvided.innerRef}
                                style={dropCardSnapshot.isDraggingOver ? { backgroundColor: '#D9DBE3' } : {}}>
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
import React, { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { ListCard } from './ListCard';

export const List = ({ list, cards }) => {
    const [cardsList, setCardsList] = useState([]);

    useEffect(() => {
        if (cards) {
            setCardsList(cards);
        } else {
            setCardsList([]);
        }
    }, [cards]);

    return (
        <div className="list-container">
            <div className="list-title">{list.name}</div>
            <Droppable droppableId={list.id}>
                {(provided, snapshot) => (
                    <>
                        <div
                            className="list-box"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={
                                snapshot.isDraggingOver
                                    ? { backgroundColor: '#D9DBE3' }
                                    : { backgroundColor: 'inherit' }
                            }>
                            {cardsList?.map((card, index) => (
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
                        </div>
                        {provided.placeholder}
                    </>
                )}
            </Droppable>
        </div>
    );
};
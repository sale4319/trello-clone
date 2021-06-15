import React from 'react'

export const ListCard = ({ card, isDragging }) => {

    return <div className={`list-card-container ${isDragging && 'dragging'}`}>{card.name}</div>;
};
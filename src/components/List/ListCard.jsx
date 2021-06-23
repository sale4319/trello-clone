import React from 'react'

export const ListCard = ({ card, isDragging }) => {

    return <div className={`list-card-container ${isDragging && 'list-card-dragging'}`}>{card.name}</div>;

};
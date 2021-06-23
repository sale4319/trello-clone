import React from 'react';

export const Card = ({ card, isDragging }) => {

    return <div className={`card-container ${isDragging && 'card-dragging'}`}>{card.name}</div>;

};
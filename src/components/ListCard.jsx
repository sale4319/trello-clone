import React from 'react'

export const ListCard = ({ list, cards }) => {
    return (
        <div
            className="list-card-container">
            <div className="list-card-title">{list.name}</div>
            {cards?.map(card => (
                <div
                    key={card.id}
                    className="list-card-box">
                    {card.name}
                </div>
            ))}
        </div>
    );
};
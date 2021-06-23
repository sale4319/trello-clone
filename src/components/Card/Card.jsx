import React, { useState, useContext } from 'react';
import { RiBallPenLine } from 'react-icons/ri';

import CardEdit from './CardEdit';
import { CardModalContext } from '../../providers/';

export const Card = ({ card }) => {
    const { setShowModal, setSelectedCard } = useContext(CardModalContext);
    const [showEditButton, setShowEditButton] = useState(false);
    const [editing, setEditing] = useState(false);


    return (
        <>
            <div
                className="card-container"
                onMouseEnter={() => setShowEditButton(true)}
                onMouseLeave={() => setShowEditButton(false)}>
                <div
                    className="card-name"
                    onClick={() => {
                        if (!editing) {
                            setShowModal(true);
                            setSelectedCard(card);
                        }
                    }}>
                    <CardEdit card={card} onClose={() => setEditing(false)} editing={editing} />
                </div>
                <div
                    className={`card-edit-button ${showEditButton ? 'card-button-visible' : 'card-button-invisible'}`}
                    onClick={() => setEditing(true)}>
                    <RiBallPenLine size={20} />
                </div>
            </div>
        </>
    );
};
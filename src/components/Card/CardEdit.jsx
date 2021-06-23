import React, { useState, useEffect } from 'react';

import { useEditCard } from '../../api/apiHooks/apiCards';

const CardEdit = ({ card, onClose, editing }) => {
    const [editValue, setEditValue] = useState(card.name);
    const [submitEditValue, setSubmitEditValue] = useState('');
    const { isSuccess } = useEditCard(submitEditValue, card.id);

    useEffect(() => {
        if (isSuccess && submitEditValue) {
            setSubmitEditValue('');
            setEditValue(card.name);
        }
    }, [isSuccess, submitEditValue]);

    useEffect(() => {
        setEditValue(card.name);
    }, [card.name]);

    const handleEditCard = () => {
        if (editValue && editValue !== card.name) {
            setSubmitEditValue(editValue);
        }
        onClose();
    };

    const handleKeyPressEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (editValue !== card.name) {
                setSubmitEditValue(editValue);
                onClose();
            }
        }
    };

    return (
        <>
            {editing ? (
                <textarea
                    hidden={!editing}
                    value={editValue}
                    className="card-text-area"
                    onChange={event => setEditValue(event.target.value)}
                    autoFocus
                    onBlur={handleEditCard}
                    onKeyPress={handleKeyPressEnter}
                />
            ) : (
                <span>{card.name}</span>
            )}
        </>
    );
};

export default CardEdit;
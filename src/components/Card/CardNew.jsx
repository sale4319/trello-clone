import React, { useEffect, useState } from 'react';
import { useCreateCard } from '../../api/apiHooks/apiCards';

const CardNew = ({ show, listId, handleClose }) => {
    const [newCard, setNewCard] = useState('');
    const [submitNewCard, setSubmitNewCard] = useState('');
    const { isSuccess } = useCreateCard(listId, submitNewCard);

    useEffect(() => {
        if (isSuccess && submitNewCard) {
            setSubmitNewCard('');
            setNewCard('');
        }
    }, [isSuccess, submitNewCard]);

    const handleNewCardBlur = () => {
        if (newCard) {
            setSubmitNewCard(newCard);
        }
        handleClose();
    };

    const handleNewCardKeyPressEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setSubmitNewCard(newCard);
            handleClose();
        }
    };

    const handleNewCardKeyPressEscape = (event) => {
        if (event.key === 'Escape') {
            handleClose();
        }
    };
    return (
        <>
            {show && (
                <textarea
                    value={newCard}
                    className="card-text-area"
                    onChange={event => setNewCard(event.target.value)}
                    autoFocus
                    onBlur={handleNewCardBlur}
                    onKeyPress={handleNewCardKeyPressEnter}
                    onKeyDown={handleNewCardKeyPressEscape}
                />
            )}
        </>
    );
};

export default CardNew
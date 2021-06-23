import React, { useEffect, useState } from 'react';

const BoardModal = (props) => {
    const { onSubmit, onClose, title } = props;

    const [boardName, setBoardName] = useState('');
    const [nameValid, setNameValid] = useState(false);

    useEffect(() => {
        if (boardName) {
            setNameValid(true);
        } else {
            setNameValid(false);
        }
    }, [boardName]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && nameValid) {
            onSubmit(boardName);
            onClose();
        }
    };

    return (
        <div className="board-modal-container">
            <div className="board-modal-content">
                <div className="board-modal-title">
                    <div>{title}</div>
                </div>
                <div className="board-modal-body">
                    <input
                        className="board-modal-input"
                        placeholder="Board name"
                        value={boardName}
                        onChange={event => setBoardName(event.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className="board-modal-footer">
                    <div
                        className={
                            `board-modal-button
                            ${nameValid ? 'board-modal-button-confirm-valid' : 'board-modal-button-confirm-invalid'}`
                        }
                        onClick={() => {
                            if (nameValid) {
                                onSubmit(boardName);
                                onClose();
                            }
                        }}>
                        Confirm
                    </div>
                    <div className="board-modal-button board-modal-button-close" onClick={onClose}>
                        Close
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardModal;
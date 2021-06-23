import React, { useEffect, useState } from 'react';

const BoardNew = (props) => {
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
        <div className="new-board-container">
            <div className="new-board-content">
                <div className="new-board-title">
                    <div>{title}</div>
                </div>
                <div className="new-board-body">
                    <input
                        className="new-board-input"
                        placeholder="Board name"
                        value={boardName}
                        onChange={event => setBoardName(event.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className="new-board-footer">
                    <div
                        className={
                            `new-board-button
                            ${nameValid ? 'new-board-button-confirm-valid' : 'new-board-button-confirm-invalid'}`
                        }
                        onClick={() => {
                            if (nameValid) {
                                onSubmit(boardName);
                                onClose();
                            }
                        }}>
                        Confirm
                    </div>
                    <div className="new-board-button new-board-button-close" onClick={onClose}>
                        Close
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardNew;
import React, { useState, useEffect } from 'react';
import { useCreateList } from '../../api/apiHooks/apiLists';

const ListNew = () => {
    const [isActive, setIsActive] = useState(false);
    const [nameField, setNameField] = useState('');
    const [newListName, setNewListName] = useState('');
    const { isSuccess } = useCreateList(newListName);

    useEffect(() => {
        if (isSuccess && newListName) {
            setNewListName('');
            setNameField('');
            setIsActive(false);
        }
    }, [isSuccess, newListName]);

    const handleKeyboardPress = (event) => {
        if (event.key === 'Enter') {
            setNewListName(nameField);
        }
    };

    return (
        <div className="list-new-container">
            {isActive ? (
                <input
                    value={nameField}
                    onChange={event => setNameField(event.target.value)}
                    onKeyPress={event => handleKeyboardPress(event)}
                    onBlur={() => setIsActive(false)}
                    autoFocus
                />
            ) : (
                <div
                    className="list-new-button"
                    onClick={() => {
                        setIsActive(true);
                    }}>
                    + Add another list
                </div>
            )}
        </div>
    );
};

export default ListNew;
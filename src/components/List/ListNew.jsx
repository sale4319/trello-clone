import React, { useState, useEffect } from 'react';
import { useCreateList } from '../../api/apiHooks/apiLists';

const ListNew = () => {
    const [isAddingName, setIsAddingName] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [submitNewListName, setSubmitNewListName] = useState('');
    const { isSuccess } = useCreateList(submitNewListName);

    useEffect(() => {
        if (isSuccess && newListName) {
            setNewListName('');
            setSubmitNewListName('');
        }
    }, [isSuccess, submitNewListName]);

    const handleKeyboardPress = (event) => {
        if (event.key === 'Enter') {
            setSubmitNewListName(newListName);
            setIsAddingName(false)
        }
    };

    return (
        <div className="list-new-container">
            {isAddingName ? (
                <input
                    value={newListName}
                    onChange={event => setNewListName(event.target.value)}
                    onKeyPress={event => handleKeyboardPress(event)}
                    onBlur={() => setIsAddingName(false)}
                    autoFocus
                />
            ) : (
                <div
                    className="list-new-button"
                    onClick={() => {
                        setIsAddingName(true);
                    }}>
                    + Add another list
                </div>
            )}
        </div>
    );
};

export default ListNew;
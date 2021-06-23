import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useCloseList, useEditList } from '../../api/apiHooks/apiLists';

const ListTitle = ({ name, listId }) => {
    const [deleteListId, setDeleteListId] = useState('');
    useCloseList(deleteListId);

    const [isEditingName, setEditingName] = useState(false);
    const [formName, setFormName] = useState(name);
    const [submitNewFormName, setSubmitNewFormName] = useState('');
    useEditList(listId, submitNewFormName);

    useEffect(() => {
        return () => {
            setSubmitNewFormName('');
            setDeleteListId('');
        };
    }, []);

    const handleCloseList = () => {
        setDeleteListId(listId);
        return;
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter' && name !== formName && !!formName) {
            setSubmitNewFormName(formName);
            setEditingName(false);
        }
    };

    const handleEditComplete = () => {
        if (name !== formName && !!formName) {
            setSubmitNewFormName(formName);
        }
        setEditingName(false);
    };

    return (
        <div className="list-title-container">
            {isEditingName ? (
                <input
                    autoFocus
                    value={formName}
                    onChange={event => setFormName(event.target.value)}
                    onKeyPress={handleEnterKeyPress}
                    onBlur={handleEditComplete}
                />
            ) : (
                <div className="list-title-title" onClick={() => setEditingName(true)}>
                    {name}
                </div>
            )}
            <div className="list-title-icon-container" onClick={handleCloseList}>
                <RiDeleteBin5Line size="30" />
            </div>
        </div>
    );
};

export default ListTitle;
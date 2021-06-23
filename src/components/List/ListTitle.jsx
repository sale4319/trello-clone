import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useCloseList } from '../../api/apiHooks/apiLists';

const ListTitle = ({ name, listId }) => {
    const [deleteListId, setDeleteListId] = useState('');
    useCloseList(deleteListId);

    useEffect(() => {
        return () => setDeleteListId('');
    }, []);

    const handleCloseList = () => {
        setDeleteListId(listId);
        return;
    };
    return (
        <div className="list-title-container" onClick={handleCloseList}>
            <div className="list-title-title">{name}</div>
            <div className="list-title-icon-container">
                <RiDeleteBin5Line size="30" />
            </div>
        </div>
    );
};

export default ListTitle;
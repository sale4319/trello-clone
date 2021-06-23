import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import AutosizeInput from 'react-input-autosize';
import { RiDeleteBin6Fill, RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';

import { useDeleteBoard, useEditBoardName } from '../../api/apiHooks/apiBoards';
import { Routes } from '../../constants/Routes';

const BoardTitle = ({ board }) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [deletingBoard, setDeletingBoard] = useState(false);

    const [newTitle, setNewTitle] = useState(board.name);
    const [deleteBoardId, setDeleteBoardId] = useState();
    const { isSuccess: isSuccessDelete, isFetching: isFetchingDelete } = useDeleteBoard(deleteBoardId);
    const { isSuccess: isSuccessEdit, isFetching: isFetchingEdit } = useEditBoardName(
        board.id,
        board.name,
        newTitle,
        editingTitle,
    );
    const history = useHistory();

    useEffect(() => {
        if (isSuccessDelete && !isFetchingDelete) {
            history.push(Routes.Boards);
        }
    }, [isSuccessDelete, isFetchingDelete]);

    useEffect(() => {
        if (board.name) {
            setNewTitle(board.name);
        }
    }, [board.name]);

    const handleEditComplete = () => {
        setEditingTitle(false);
    };

    const handleEnterKeyPress = (event) => {
        setEditingTitle(true);
        if (event.key === 'Enter') {
            setEditingTitle(false);
        }
    };

    const handleDeleteBoard = () => {
        setDeleteBoardId(board.id);
        history.push(Routes.Boards);
    };

    return (
        <div style={{}}>
            {editingTitle ? (
                <AutosizeInput
                    name="title"
                    value={newTitle}
                    inputStyle={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        marginBottom: '10px',
                        border: '1px solid gray',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: 'medium',
                    }}
                    onChange={event => setNewTitle(event.target.value)}
                    autoFocus
                    onBlur={handleEditComplete}
                    onKeyPress={event => handleEnterKeyPress(event)}
                />
            ) : (
                <div className="board-title-icons-container">
                    <div className="board-title-title" onClick={() => setEditingTitle(true)}>
                        {newTitle}
                    </div>
                    <RiDeleteBin6Fill
                        size="40"
                        title="Delete board?"
                        className="board-title-delete-button"
                        onClick={() => setDeletingBoard(!deletingBoard)}
                    />
                    {deletingBoard && (
                        <>
                            <div
                                className="board-title-delete">
                                <span style={{}}>Are you sure you want to delete this board?</span>
                            </div>
                            <RiCheckboxCircleFill
                                size="40"
                                className="board-title-confirm-button"
                                onClick={() => setDeleteBoardId(handleDeleteBoard)}
                            />
                            <RiCloseCircleFill
                                size="40"
                                className="board-title-cancel-button"
                                onClick={() => setDeletingBoard(false)}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default BoardTitle
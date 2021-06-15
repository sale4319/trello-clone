import React from 'react'
import { useHistory } from 'react-router';
import { Routes } from '../constants/Routes';

export const BoardCard = ({ board }) => {
    const history = useHistory();
    const handleBoardClick = () => {
        if (board) {
            history.push(`${Routes.Board}/${board.id}`);
        }
    };

    const boardName = board ? board.name : 'Create a new Board';
    return (
        <div
            className="board-card-container board-color-default"
            onClick={handleBoardClick}>

            <div className="board-card-text" title={boardName}>
                {boardName}
            </div>
        </div>
    );
};
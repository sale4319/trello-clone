import React from 'react'
import { useHistory } from 'react-router';
import { Routes } from '../../constants/Routes';

export const BoardCard = ({ board, newBoard = false, handleNewBoardClick }) => {
    const history = useHistory();
    const handleBoardClick = () => {
        if (board) {
            history.push(`${Routes.Board}/${board.id}`);
        }
    };

    const boardName = board ? board.name : 'Create a new Board';
    return (
        <div
            className={`board-card-container ${newBoard ? 'board-card-color-new' : 'board-card-color-default'}`}
            onClick={newBoard ? handleNewBoardClick : handleBoardClick}>

            <div
                className={`board-card-text ${newBoard && 'board-card-text-center'}`}
                title={boardName}>
            </div>
        </div>
    );
};
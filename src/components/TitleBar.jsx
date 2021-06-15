import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../constants/Routes';

export const TitleBar = () => {
    const history = useHistory();

    const handleHome = () => {
        history.push(Routes.Home);
        window.location.reload();
    }
    const handleBoards = () => {
        history.push(Routes.Boards);
        window.location.reload();
    }
    return (
        <div className="container">
            <img className="image" src="../boards.ico" alt="Boards" onClick={handleBoards} />
            <div className="title" onClick={handleHome} >ReTrello</div>
        </div>
    );
};
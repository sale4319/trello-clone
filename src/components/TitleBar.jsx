import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../constants/Routes';

export const TitleBar = () => {
    const history = useHistory();

    const handleHome = () => {
        history.push(Routes.Home);
        window.location.reload(); //Fix this, not a good practice!
    }
    const handleBoards = () => {
        history.push(Routes.Boards);
        window.location.reload(); //Fix this, not a good practice!
    }
    return (
        <div className="titlebar-container">
            <img className="titlebar-image" src="../home.png" alt="Boards" onClick={handleHome} />&nbsp;
            <img className="titlebar-image" src="../boards.png" alt="Home" onClick={handleBoards} />
            <div className="titlebar-title">Trello's Fratello</div>
        </div>
    );
};
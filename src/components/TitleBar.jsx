import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../constants/Routes';

export const TitleBar = () => {
    const history = useHistory();

    return (
        <div className="titlebar-container">
            <img className="titlebar-image" src="/home.png" alt="Home" onClick={() => history.push(Routes.Home)} />&nbsp;
            <img className="titlebar-image" src="/boards.png" alt="Boards" onClick={() => history.push(Routes.Boards)} />
            <div className="titlebar-title">Trello's Fratello</div>
        </div>
    );
};
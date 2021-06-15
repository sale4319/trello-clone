import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../constants/Routes';

export const TitleBar = () => {
    const history = useHistory();
    return (
        <div className="container">
            <img className="image" src="favicon.ico" alt="" onClick={() => history.push(Routes.Home)} />
            <div className="title" onClick={() => history.push(Routes.Home)}>ReTrello</div>
        </div>
    );
};
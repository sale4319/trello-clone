import React from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../../constants/Routes';

const TitleBar = () => {
    const history = useHistory();

    return (
        <div className="titlebar-container">
            <div className="titlebar-image-container">
                <img data-testid="img" className="titlebar-image" src="/boards.png" alt="Boards" onClick={() => history.push(Routes.Boards)} />
            </div>
            <div data-testid="title" className="titlebar-title">Trello's Fratello</div>
        </div>
    );
};

export default TitleBar;
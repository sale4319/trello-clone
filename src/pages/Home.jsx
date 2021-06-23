import React from 'react';
import { useHistory } from 'react-router';
import { useGetBoards } from '../api/apiHooks/apiBoards';
import { Routes } from '../constants/Routes';

export const Home = () => {
    const { data: boards } = useGetBoards();
    const history = useHistory();

    return (
        <div className="board-card-container board-card-color-default board-card-text board-card-text-center">
            <p onClick={() => history.push(Routes.Boards)} >You have {boards?.length} boards, click to check them out!</p>
        </div>
    )
}
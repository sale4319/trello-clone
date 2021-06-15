import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { getBoard } from '../api/Boards';
import { AuthContext } from '../providers/AuthContext';
import { Routes } from '../constants/Routes';
import { ListCard } from '../components/ListCard';

export const Board = () => {
    const { pathname } = useLocation();
    const { tokenHolder } = useContext(AuthContext);
    const history = useHistory();

    const [board, setBoard] = useState();

    useEffect(() => {
        const pathSplit = pathname.split(`${Routes.Board}/`);
        if (pathSplit.length > 1 && !!pathSplit[1]) {
            const boardId = pathSplit[1];
            getBoard(boardId, tokenHolder).then(({ data }) => {
                setBoard(data);
            });
        } else {
            history.push(Routes.Home);
        }
    }, []);

    return (
        <div className="board-container">
            {board?.lists?.map(list => (
                <ListCard key={list.id} list={list} cards={board?.cards?.filter(card => card.idList === list.id)} />
            ))}
        </div>
    );
};
import React, { useContext, useEffect, useState } from 'react';
import { getBoard } from '../api/Boards';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import { Routes } from '../constants/Routes';

export const Board = () => {
    const { pathname } = useLocation();
    const { tokenHolder } = useContext(AuthContext);
    const [name, setName] = useState('');
    useEffect(() => {
        const boardId = pathname.split(`${Routes.Board}/`)[1];
        getBoard(boardId, tokenHolder).then(response => {
            console.log({ ...response });
            setName(response.data.name);
        });
    });
    return <div>{name}</div>;
};
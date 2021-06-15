import React, { useContext, useEffect, useState } from 'react'
import { getAllBoards } from '../api/Boards';
import { AuthContext } from '../providers/AuthContext';
import { BoardCard } from '../components/BoardCard';

export const Boards = () => {
    const { tokenHolder } = useContext(AuthContext);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        getAllBoards(tokenHolder).then(response => {
            const { data } = response;
            console.log(data);
            setBoards(data);
        });
    }, [tokenHolder]);

    return (
        <div>
            <BoardCard newBoard />
            {boards
                .filter(board => !board.closed)
                .map(board => (
                    <BoardCard key={board.id} board={board} />
                ))}
        </div>
    );
};
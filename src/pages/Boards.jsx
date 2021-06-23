import React, { useContext, useEffect, useState } from 'react'

import { useCreateBoard, useGetBoards } from '../api/apiHooks/apiBoards';
import { BoardCard } from '../components/Board/BoardCard';
import BoardNew from '../components/Board/BoardNew';
import { BoardContext } from '../providers/';

export const Boards = () => {
    const [showNewBoard, setShowNewBoard] = useState(false);
    const [submitNewBoardName, setSubmitNewBoardName] = useState();
    useGetBoards();
    const { boards } = useContext(BoardContext);
    useCreateBoard(submitNewBoardName);

    return (
        <div className={`all-boards-container ${showNewBoard && 'all-boards-backdrop'}`}>
            <div className="all-boards-box">
                {boards
                    ?.filter(board => !board.closed)
                    .map(board => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                <BoardCard newBoard handleNewBoardClick={() => setShowNewBoard(true)} />
            </div>
            {showNewBoard && (
                <BoardNew
                    title="Create a new Board"
                    onClose={() => setShowNewBoard(false)}
                    onSubmit={(name) => setSubmitNewBoardName(name)}
                />
            )}
        </div>
    );
};
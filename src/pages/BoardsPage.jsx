import React, { useContext, useState } from 'react';

import { useCreateBoard, useGetBoards } from '../api/apiHooks/apiBoards';
import { BoardCard } from '../components/Board/BoardCard';
import BoardModal from '../components/Board/BoardModal';
import { BoardContext } from '../providers';

export const BoardsPage = () => {
    const [showNewBoard, setShowNewBoard] = useState(false);
    const [submitNewBoardName, setSubmitNewBoardName] = useState();
    useGetBoards();
    const { boards } = useContext(BoardContext);
    useCreateBoard(submitNewBoardName);

    return (
        <div className={`boards-page-container ${showNewBoard && 'boards-page-backdrop'}`}>
            <div className="boards-page-box">
                {boards
                    ?.filter(board => !board.closed)
                    .map(board => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                <BoardCard newBoard handleNewBoardClick={() => setShowNewBoard(true)} />
            </div>
            {showNewBoard && (
                <BoardModal
                    title="Create a new Board"
                    onClose={() => setShowNewBoard(false)}
                    onSubmit={(name) => setSubmitNewBoardName(name)}
                />
            )}
        </div>
    );
};
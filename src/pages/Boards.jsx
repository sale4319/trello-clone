import React, { useContext, useEffect, useState } from 'react'

import { useCreateBoard, useGetBoards } from '../api/apiHooks/apiBoards';
import { BoardCard } from '../components/Board/BoardCard';
import BoardNew from '../components/Board/BoardNew';
import { BoardContext } from '../providers/';

export const Boards = () => {
    const [showModal, setShowModal] = useState(false);
    const [newBoardName, setNewBoardName] = useState();
    const { a } = useGetBoards();
    const { boards, setSelectedBoard } = useContext(BoardContext);
    const { isSuccess, data: newBoard } = useCreateBoard(newBoardName);

    useEffect(() => {
        setSelectedBoard(undefined);
    }, []);

    return (
        <div className={`all-boards-container ${showModal && 'backdrop'}`}>
            <div style={{ flex: 1 }}>
                {boards
                    ?.filter(board => !board.closed)
                    .map(board => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                <BoardCard newBoard handleNewBoardClick={() => setShowModal(true)} />
            </div>
            {showModal && (
                <BoardNew
                    title="Create a new Board"
                    onClose={() => setShowModal(false)}
                    onSubmit={(name) => setNewBoardName(name)}
                />
            )}
            {isSuccess && (
                <span>
                    successfully created board {newBoard?.name} with id {newBoard?.id}
                </span>
            )}
        </div>
    );
};
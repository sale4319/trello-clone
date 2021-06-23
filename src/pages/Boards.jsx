import React, { useState } from 'react'

import { useCreateBoard, useGetBoards } from '../api/apiHooks/apiBoards';
import { BoardCard } from '../components/Board/BoardCard';
import BoardNew from '../components/Board/BoardNew';

export const Boards = () => {
    const [showModal, setShowModal] = useState(false);
    const [newBoardName, setNewBoardName] = useState();
    const { data } = useGetBoards();
    const { error, isFetching } = useCreateBoard(newBoardName);

    return (
        <div className={`all-boards-container ${showModal && 'backdrop'}`}>
            <div style={{ flex: 1 }}>
                {data
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
        </div>
    );
};
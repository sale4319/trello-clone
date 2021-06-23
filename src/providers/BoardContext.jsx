import React, { createContext, useState } from 'react';

const defaultValues = {
    boards: [],
    selectedBoard: undefined,
    setSelectedBoard: () => { },
    setBoards: () => { },
};

export const BoardContext = createContext(defaultValues);

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState();

    return (
        <BoardContext.Provider value={{ boards, setBoards, selectedBoard, setSelectedBoard }}>
            {children}
        </BoardContext.Provider>
    );
};
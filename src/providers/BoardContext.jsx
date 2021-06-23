import React, { createContext, useState } from 'react';


const defaultValues = {
    boards: [],
    selectedBoard: undefined,
    setSelectedBoard: () => { },
    setBoards: () => { },
    selectedListId: undefined, // **Can be used if deep link to list is necessary**
};

export const BoardContext = createContext(defaultValues);

export const BoardProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState();
    const [selectedListId, setSelectedListId] = useState(); // **Can be used if deep link to list is necessary**

    return (
        <BoardContext.Provider value={{ boards, setBoards, selectedBoard, setSelectedBoard, selectedListId, setSelectedListId }}>
            {children}
        </BoardContext.Provider>
    );
};
import React, { createContext, useState } from 'react';

const defaultValues = {
    showModal: false,
    selectedCard: undefined,
    setSelectedCard: () => { },
    setShowModal: () => { },
    selectedCardComments: [],
    setSelectedCardComments: () => { },
};

export const CardModalContext = createContext(defaultValues);

export const CardModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState();
    const [selectedCardComments, setSelectedCardComments] = useState([]);

    return (
        <CardModalContext.Provider
            value={{
                setShowModal,
                showModal,
                setSelectedCard,
                selectedCard,
                selectedCardComments,
                setSelectedCardComments,
            }}>
            {children}
        </CardModalContext.Provider>
    );
};
import React, { createContext, useState } from 'react';

const defaultValues = {
    tokenHolder: {
        apiKey: 'a036286a1756511464cfe68e0ce72ecd', //Removed the key from commit
        apiToken: '8ccaec526813ec6e3aa22f4f82cd6b8d976a5589eae7cbc68b60ab523cf17b18', //Removed the token from commit
    },
    setTokenHolder: () => { },
    isAuthenticated: false,
    clearTokens: () => { },
};

export const AuthContext = createContext(defaultValues);

export const AuthProvider = ({ children }) => {
    const [tokenHolder, setTokenHolder] = useState(defaultValues.tokenHolder);

    const isAuthenticated = !!tokenHolder.apiKey && !!tokenHolder.apiToken;

    const clearTokens = () => setTokenHolder(defaultValues.tokenHolder);

    return (
        <div>
            <AuthContext.Provider value={{ tokenHolder, setTokenHolder, isAuthenticated, clearTokens }}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};
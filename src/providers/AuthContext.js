import React, { useState } from 'react';

const defaultValues = {
    tokenHolder: {
        apiKey: '', //Removed the key from commit
        apiToken: '', //Removed the token from commit
    },
    setTokenHolder: () => { },
    isAuthenticated: false,
    clearTokens: () => { },
};

export const AuthContext = React.createContext(defaultValues);

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
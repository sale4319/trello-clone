import React from 'react';
import { useGetBoards } from '../api/apiHooks/apiBoards';

export const Home = () => {
    const { data: boards } = useGetBoards();
    return (
        <div className="general-content">
            <p>You have {boards?.length} boards, go and check them out!</p>
        </div>
    )
}
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component, path, exact = false }) => {
    const isAuthenticated = true;
    return isAuthenticated ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/" />;
};
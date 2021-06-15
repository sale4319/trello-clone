import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = props => {
    const isAuthenticated = true;
    return isAuthenticated ? (
        <Route path={props.path} exact={props.exact} component={props.component} />
    ) : (
        <Redirect to="/" />
    );
};
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { TitleBar } from './components/TitleBar';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { Routes } from './constants/Routes';
import './App.css';


const App = () => {
  return (
    <>
      <div>
        <TitleBar />
      </div>
      <div className="content">
        <Router>
          <Switch>
            <PrivateRoute path={Routes.Boards} component={Boards} exact={true} />
            <Route path={Routes.Home} component={Home} />
          </Switch>
        </Router>
      </div>
    </>
  )
}
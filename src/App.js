import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { TitleBar } from './components/TitleBar';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './pages/Home';
import { Boards } from './pages/Boards';
import { Board } from './pages/Board';
import { Routes } from './constants/Routes';
import { AuthProvider, BoardProvider, CardModalProvider } from './providers/';
import './App.css';


const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <CardModalProvider>
            <BoardProvider>
              <div>
                <TitleBar />
              </div>
              <div className="content">
                <Switch>
                  <PrivateRoute path={Routes.Boards} component={Boards} exact={true} />
                  <PrivateRoute component={Board} path={Routes.Board} />
                  <Route path={Routes.Home} component={Home} />
                </Switch>
              </div>
            </BoardProvider>
          </CardModalProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
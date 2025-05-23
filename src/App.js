import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { TitleBar } from './components/TitleBar/TitleBar';
import { PrivateRoute } from './components/PrivateRoute';
import { BoardsPage } from './pages/BoardsPage';
import { BoardPage } from './pages/BoardPage';
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
                  <PrivateRoute path={Routes.Boards} component={BoardsPage} exact={true} />
                  <PrivateRoute component={BoardPage} path={Routes.Board} />
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
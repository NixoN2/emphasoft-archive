import React, { useState } from 'react'
import AuthPage from './pages/AuthPage';
import UserListPage from './pages/UserListPage';
import { HashRouter, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <HashRouter basename="/">
        <Switch>
          <Route path='/users'>
            <UserListPage />
          </Route>
          <Route path='/'>
            <AuthPage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App

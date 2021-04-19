import React from 'react';
import { Switch, Route } from 'react-router-dom'
import NavBarContainer from './nav-bar/nav_bar_container'

function App() {
  return(
    <div>
      <NavBarContainer />
      <Switch>
        <Route path='/' render={<h1>Hello</h1>} />
      </Switch>
    </div>
  )
}

export default App
import './App.css';
import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Authorization from './components/Authorization/Authorization'
import Registration from './components/Registration/Registration'
import StartTesting from './components/StartTesting/StartTesting'
import Game from './components/Game/Game'
import Statistic from './components/Statistic/Statistic'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/authorization" component={Authorization} />
          <Route path="/registration" component={Registration} />
          <Route path="/start-testing" component={StartTesting} />
          <Route path="/game" component={Game} />
          <Route path="/statistic" component={Statistic} />
          <Route path="/">
            <Redirect to="/start-testing"></Redirect>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

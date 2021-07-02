import './App.css';
import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Authorization from './components/Authorization/Authorization'
import Registration from './components/Registration/Registration'
import StartTesting from './components/StartTesting/StartTesting'

class App extends React.Component {

  render() {
    return (
      <Router>
        <nav>
          <li><Link to="/authorization">Авторизация</Link></li>
          <li><Link to="/registration">Регистрация</Link></li>
        </nav>
        <Switch>
          <Route path="/authorization" component={Authorization} />
          <Route path="/registration" component={Registration} />
          <Route path="/start-testing" component={StartTesting} />
        </Switch>
      </Router>
    );
  }
}

export default App;

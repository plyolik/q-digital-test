import './App.css';
import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Authorization from './Authorization/Authorization'
import Registration from './Registration/Registration'
import Header from './Header'
import Start from './Start'
function App() {
  return (
    <>
      {/* <Header/> */}
      <Router>
        <nav>
          <li><Link to="/">Start</Link></li>
          <li><Link to="/authorization">Авторизация</Link></li>
          <li><Link to="/registration">Регистрация</Link></li>
        </nav>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/authorization" component={Authorization} />
          <Route path="/registration" component={Registration} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

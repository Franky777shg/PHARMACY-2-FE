import React from 'react'

// React Router Dom
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ChangePage from './pages/changepw';
import ForgotPage from './pages/forgotpw';

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/change" component={ChangePage} />
        <Route path="/forgot" component={ForgotPage} />
      </Switch>
    )
  }
}

export default App;
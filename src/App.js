import React from 'react'

// React Router Dom
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import SendingEmail from './pages/sendingEmail';
import VerifyPage from './pages/verivication';

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/verification/:token" component={VerifyPage} />
        <Route path="/email" component={SendingEmail} />
      </Switch>
    )
  }
}

export default App;
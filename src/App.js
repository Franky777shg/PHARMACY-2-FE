import React from 'react'

// React Router Dom
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DetailProductPage from './pages/detailProduct';
import SendingEmail from './pages/sendingEmail';
import VerifyPage from './pages/verivication';
import ChangePage from './pages/changepw';
import ForgotPage from './pages/forgotpw';

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/detail-product" component={DetailProductPage} />
        <Route path="/verification/:token" component={VerifyPage} />
        <Route path="/email" component={SendingEmail} />
        <Route path="/change" component={ChangePage} />
        <Route path="/forgot" component={ForgotPage} />
      </Switch>
    )
  }
}

export default App;
import React from 'react'

// React Router Dom
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DetailProductPage from './pages/detailProduct';

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/detail-product" component={DetailProductPage} />
      </Switch>
    )
  }
}

export default App;
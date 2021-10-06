import React from 'react'
import { connect } from 'react-redux'
// React Router Dom
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ChangePage from './pages/changepw';
import ForgotPage from './pages/forgotpw';

// import { keepLogin } from './redux/actions';

class App extends React.Component {
  // componentDidMount() {
  //   // let id = localStorage.getItem('idUser')
  //   this.props.keepLogin()
  // }
  render () {
    return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/changepw/:token" component={ChangePage} />
        <Route path="/forgot" component={ForgotPage} />
      </Switch>
    )
  }
}

// export default connect(null, { keepLogin })(App);
export default App
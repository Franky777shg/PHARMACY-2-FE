import React from 'react'
import { connect } from 'react-redux'
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
import ProfilePage from './pages/profileUser';

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
        <Route path="/detail-product" component={DetailProductPage} />
        <Route path="/verification/:token" component={VerifyPage} />
        <Route path="/email" component={SendingEmail} />
        <Route path="/forgot" component={ForgotPage} />
        <Route path="/profile/:id" component={ProfilePage} />
      </Switch>
    )
  }
}

// export default connect(null, { keepLogin })(App);
export default App
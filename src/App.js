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
import AddPage from './pages/addProduct_1';
import AddPageR from './pages/addProductR';
import ProfilePage from './pages/profileUser';
import EditSatuanPage from './pages/editProduct1';
import EditRPage from './pages/editProductR';
import TransactionAdminPage from './pages/transactionAdmin';
import CartPage from './pages/CartList';
import RawMaterialUsagePage from './pages/rawMaterialUsagePage';

import { keepLogin } from './redux/actions';
import UploadResep from './pages/uploadRecipe';
import UploadPayment from './pages/uploadPayment';

class App extends React.Component {
  componentDidMount() {
    // let id = localStorage.getItem('idUser')
    this.props.keepLogin()
  }
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
        <Route path="/add-product1" component={AddPage} />
        <Route path="/add-productr" component={AddPageR} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/edit-satuan/:id" component={EditSatuanPage} />
        <Route path="/edit-racikan/:id" component={EditRPage} />
        <Route path="/transaction-admin" component={TransactionAdminPage} />
        <Route path="/uploadresep/:id" component={UploadResep} />
        <Route path="/uploadpayment" component={UploadPayment} />
        <Route path="/cart" component={CartPage} />
        <Route path="/rawMaterialUsage/:id" component={RawMaterialUsagePage} />
      </Switch>
    )
  }
}

export default connect(null, { keepLogin })(App);

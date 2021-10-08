import React from 'react'
import {
  FormControl,
  InputGroup,
  Button,
  Form,
} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility1: false,
      visibility2: false,
      usernameErorr: [false, ""],
      emailErorr: [false, ""],
      passErorr: [false, ""],
      regisErorr: [false, ""],
      ageErorr: [false, ""],
      users: [],
      successRegister: false,
      show : true,
    }
  }

  usernameVal = (e) => {
    let simbol = /[!@#$%^&*()]/

    if (simbol.test(e.target.value) || e.target.value.length < 6)
      return (
        // alert('input dengan benar')
        this.setState({ usernameErorr: [true, "Username must have 6 charakter and without symbol"] })
      )
    this.setState({ usernameErorr: [false, ""] })
  }

  emailValid = (e) => {
    let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(e.target.value)) return this.setState({ emailErorr: [true, "Email not valid"] })

    this.setState({ emailErorr: [false, ""] })
  }

  passValid = (e) => {
    let number = /[0-9]/
    let symb = /[!@#$%^&*()]/

    if (!symb.test(e.target.value) || !number.test(e.target.value) || e.target.value.length < 6)
      return (
        this.setState({ passErorr: [true, " Password must have 6 character, include number and symbol"] })
      )

    this.setState({ passErorr: [false, ""] })
  }

  ageValid = (e) => {
    let numberAge = /[0-9]/
    if (!numberAge.test(e.target.value)) return this.setState({ ageErorr: [true, "Age must a number"] })
    this.setState({ ageErorr: [false, ""] })
  }

  onRegister = () => {
    let username = this.refs.username.value
    let email = this.refs.email.value
    let password = this.refs.password.value
    let fullname = this.refs.fullname.value
    let address = this.refs.address.value
    let age = this.refs.age.value
    let gender = this.refs.gender.value

    //cek apakah semua input sudah terisi
    if (!username || !password || !email || !fullname || !address || !age || !gender) return this.setState({ regisErorr: [true, "Please input all data"] })

    //cek apakah ada eror dalam validasi user
    if (this.state.usernameErorr[0] || this.state.emailErorr[0] || this.state.passErorr[0] || this.state.ageErorr[0]) return this.setState({ regisErorr: [true, "make sure all of your data is valid"] })

    //konfirmasi password = password
    if (this.refs.confpassword.value !== password) return this.setState({ regisErorr: [true, "confirm password doesn't match with password"] })

    // siapkan obj data user 
    let newData = {
      username,
      email,
      password,
      fullname,
      gender,
      address,
      age,
      role: 'user',
      profile_picture: 'picture',
      verify: 'unverified'
    }
    console.log(newData)

    Axios.post(`http://localhost:2000/user/addUser`, newData)
      .then(res => {
        console.log(res.data)
        this.setState({ users: res.data })
        this.setState({ successRegister: true })
      })
      .catch(err => {
        console.log(err)
      })

    
    this.setState({regisErorr: [false, ""]})
  }

  render() {
    if (this.state.successRegister) {
      return <Redirect to="/email" />
    }

    const { visibility1, visibility2 } = this.state
    return (
      <div style={styles.cont}>
        <div style={styles.contForm}>
          <h1>Register Now!</h1>
          <label>Username</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-user-circle"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="Input Here"
              onChange={(e) => this.usernameVal(e)}
              ref="username"
            />
          </InputGroup>
          <Form.Text style={styles.textErr}>
            {this.state.usernameErorr[0] ? this.state.usernameErorr[1] : ""}
          </Form.Text>
          <br />
          <label>Email</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-envelope"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="Input Here"
              onChange={(e) => this.emailValid(e)}
              ref="email"
            />
          </InputGroup>
          <Form.Text style={styles.textErr}>
            {this.state.emailErorr[0] ? this.state.emailErorr[1] : ""}
          </Form.Text>
          <br />
          <label>Password</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility1: !visibility1 })}>
              {visibility1 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
            </InputGroup.Text>
            <FormControl
              placeholder="Input Here"
              type={visibility1 ? "text" : "password"}
              onChange={(e) => this.passValid(e)}
              ref="password"
            />
          </InputGroup>
          <Form.Text style={styles.textErr}>
            {this.state.passErorr[0] ? this.state.passErorr[1] : ""}
          </Form.Text>
          <br />
          <label>Confirm Password</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
              {visibility2 ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
            </InputGroup.Text>
            <FormControl
              placeholder="Input Here"
              type={visibility2 ? "text" : "password"}
              ref="confpassword"
            />
          </InputGroup>
          <label>Fullname</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-user-check"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="input your Fullname"
              type="text"
              ref="fullname"
            />
          </InputGroup>
          <label>Gender</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-street-view"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="Male / Female"
              type="text"
              ref="gender"
            />
          </InputGroup>
          <label>Address</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-home"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="Input Here"
              type="text"
              ref="address"
            />
          </InputGroup>
          <label>Age</label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-street-view"></i>
            </InputGroup.Text>
            <FormControl
              placeholder="Input Here"
              onChange={(e) => this.ageValid(e)}
              type="number"
              ref="age"
            />
          </InputGroup>
          <Form.Text style={styles.textErr}>
            {this.state.ageErorr[0] ? this.state.ageErorr[1] : ""}
          </Form.Text>
          <div style={styles.contButton}>
            <Button variant="primary" style={styles.button} onClick={this.onRegister}>
              <i className="fas fa-user-plus" style={{ marginRight: '10px' }}  ></i>
              Register
            </Button>
          </div>
          <Form.Text style={styles.textErr}>
            {this.state.regisErorr[0] ? this.state.regisErorr[1] : ""}
          </Form.Text>
          <p style={styles.goToRegis}>Already Have an Account ? <Link style={{ color: '#00BCD4', fontWeight: 'bold' }} to="/login">Login Here</Link></p>
          <p style={styles.goToRegis}>Go to <Link style={{ color: '#00BCD4', fontWeight: 'bold' }} to="/">Home</Link></p>

        </div>
      </div>
    )
  }
}

const styles = {
  cont: {
    display: 'flex',
    background: "url(https://media.istockphoto.com/photos/empty-product-stand-platform-podium-with-cloud-picture-id1252597644?b=1&k=20&m=1252597644&s=170667a&w=0&h=hDkXmpVxiNFDBHiwJbkPLNUA-P_5DCEgILtHIrUiUIU=) no-repeat center",
    backgroundSize: 'cover',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '12vh'
  },
  contForm: {
    width: '40vw',
    marginLeft: '32vw',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, .8)',
    padding: '1% 2%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  contButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  button: {
    backgroundColor: '#303f9f',
    border: 'none'
  },
  goToRegis: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '0'
  },
  textErr: {
    color: 'red',
    marginBottom: '15px',
  }
}

export default RegisterPage;
import React from 'react'

import {
    FormControl,
    InputGroup,
    Button,
    Modal,
    Form,
    Image,
    Alert
} from 'react-bootstrap'

import { LOGO } from '../assets'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { forgotpw, closeModal } from '../redux/actions'




class ForgotPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            error: false,
            caps: [false, ""],
            tru: false
        }
    }


    // clickEnter = (e) => {
    //     if (e.key === 'Enter') {
    //         this.onProcess()
    //     }
    // }

    onProcess = () => {
        //ambil data dari input username dan password
        let emailuser = this.refs.email.value
        // let password = this.refs.password.value

        let body = {
            emailuser
        }
        this.props.forgotpw(body)
        this.setState({ tru: true })
    }

    onCaps = (e) => {
        if (e.getModifierState('CapsLock')) {
            return this.setState({ caps: [true, "WARNING! Caps lock is ON."] })
        }
        this.setState({ caps: [false, ""] })
    }

    render() {
        if (this.props.username) {
            return <Redirect to="/" />
        }
        const { visibility } = this.state
        return (
            <div style={styles.cont}>
                <div style={styles.contForm} className="conForm">
                    <div style={{ justifyContent: 'center', display: 'flex', paddingBottom: '20px', paddingTop: '10px' }}> <Image src={LOGO.default} style={styles.logo} /> </div>
                    <h4 style={{ color: '#343892', textAlign: 'center', paddingBottom: '20px' }}>Forgot Password</h4>
                    <label style={styles.label}>Enter your email and we'll send you a link to reset your password</label>
                    {/* <label style={this.state.tru ? {fontSize:'13.5px',paddingBottom:'18px',justifyContent:'center',textAlign:'center'} : {display:'none'}}>Enter your email and we'll send you a link to reset your password</label> */}
                    <InputGroup className="mb-3">
                        {/* <InputGroup className="mb-3" show={this.state.tru} style={this.state.tru ? null : {display:'none'}}> */}
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-user-circle"></i></InputGroup.Text>
                        <FormControl
                            placeholder="Input Your Email Here"
                            ref="email"

                            style={{ color: '#012EA9' }}

                        />
                    </InputGroup>

                    <div style={styles.contButton} display={this.state.tru} >
                        <Button variant="primary" style={styles.button} onClick={this.onProcess}>Process</Button>
                        {/* <Button variant="primary" style={this.state.tru ? {backgroundColor: '#343892',border:'none', marginLeft:'auto', marginRight:'auto', fontWeight:'bold',width:'400px'} : {display:'none'}} onClick={this.onProcess}>Process</Button> */}

                    </div>

                    {/* <Form.Text style={styles.textErrb} >
                        <p style={{ justifyContent: 'center', marginTop: '10px' }}>{this.props.forgotpw_ok}</p>
                    </Form.Text> */}

                    <Alert variant="primary" show={this.props.forgot} className="mt-3">
                    <div style={{ justifyContent: 'center'}} className="mb-0">{this.props.forgotpw_ok}</div>
                    </Alert>

                    <Alert variant="danger" show={this.props.forgot1} className="mt-3">
                    <div style={{ justifyContent: 'center'}} className="mb-0">{this.props.forgotpw_no}</div>
                    </Alert>

                    <p style={styles.gotoregis}>Don't have an account yet? </p>
                    <p style={styles.gotoregis}><Link style={{ color: '#303f9f' }} to="/register">Register to create one now.</Link></p>

                    <p style={styles.gotologin}><Link style={{ textDecoration: 'none', color: '#8E8E8E' }} to="/login"><i class="fas fa-chevron-left"></i>     Back to Login</Link></p>

                </div>

            </div >
        )
    }
}

const styles = {
    cont: {
        backgroundColor: '#ffffff',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center'
    },
    contForm: {
        width: '30vw',
        height: '70vh',
        marginTop: '12vh',
        border: '1px solid #80F1B2',
        padding: '2%',
        borderRadius: '10px',
        justifyContent: 'center', backgroundColor: '#ffffff'
    },
    logo: {
        height: '25px'
    },
    label: {
        fontSize: '13.5px', paddingBottom: '18px', justifyContent: 'center', textAlign: 'center'
    },
    textErrb: {
        color: '#343892',
        textAlign: 'center',
        justifyContent: 'center'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '13px'
    },
    button: {
        backgroundColor: '#343892',
        border: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        width: '400px',
    },
    gotoregis: {
        fontWeight: 'bold',
        textAlign: 'center', marginTop: '25px'
    },
    forgot: {
        fontWeight: 'bold', fontSize: '12px'
    },
    gotologin: {
        fontSize: '12px',
        color: '#303f9f',
        textAlign: 'center',
        paddingTop: '10px'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        failedLogin: state.userReducer.failedLogin,
        msgFailedLogin: state.userReducer.msgFailedLogin,
        forgotpw_ok: state.userReducer.forgotpw_ok,
        forgotpw_no: state.userReducer.forgotpw_no,
        forgot: state.userReducer.forgot,
        forgot1: state.userReducer.forgot1
    }
}
export default connect(mapStateToProps, { forgotpw, closeModal })(ForgotPage)

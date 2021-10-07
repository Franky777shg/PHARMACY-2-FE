import React from 'react'

import {
    FormControl,
    InputGroup,
    Button,
    Form,
    Image,
    Alert
} from 'react-bootstrap'

import { LOGO } from '../assets'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { changepw } from '../redux/actions'


class ChangePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            error: false
        }
    }

    // componentDidMount(){
    //     console.log(this.props.match.params.token)
    //     this.props.changepw(this.props.match.params.token)
    //     // this.setState({text: 'Verification Success'})
    // }

    onSubmit = () => {
        let newPass = this.refs.newPass.value
        let confPass = this.refs.confPass.value
        let tk = this.props.match.params.token
        // let passingdata = {
        //     tk,newPass, confPass
        // }
        // this.props.changepw(passingdata)
        // this.props.changepw([[this.props.match.params.token],[{ newPass, confPass }]])
        this.props.changepw({ tk, newPass, confPass })
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
                    <h4 style={{ color: '#343892', textAlign: 'center', paddingBottom: '20px' }}>Reset Password</h4>
                    <p style={styles.label}>Please enter your new password</p>
                    <label>New Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" id="myInput" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Your New Password Here"
                            type={visibility ? "text" : "password"}
                            ref="newPass"
                            style={{ color: '#012EA9' }}
                        />
                    </InputGroup>
                    <label>Confirm Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" id="myInput" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Confirm Your New Password Here"
                            type={visibility ? "text" : "password"}
                            ref="confPass"
                            style={{ color: '#012EA9' }}
                        />
                    </InputGroup>

                    <div style={styles.contButton}>
                        <Button variant="primary" style={styles.button} onClick={this.onSubmit}>Submit</Button>
                    </div>
                    {/* <Form.Text style={styles.textErrb} >
                        <p style={{ justifyContent: 'center', marginTop: '10px' }}>{this.props.forgotpw_ok}</p>
                    </Form.Text> */}
                    <Alert variant="success" show={this.props.changed} className="mt-3">
                        <p style={{ justifyContent: 'center' }} className="mb-0">{this.props.successpw}</p>
                    </Alert>

                    <p style={styles.gotologin}><Link style={{ textDecoration: 'none', color: '#8E8E8E' }} to="/login">Back to Login</Link></p>

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
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
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
        textAlign: 'center'
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
        successpw: state.userReducer.successpw,
        changed: state.userReducer.changed
    }
}
export default connect(mapStateToProps, { changepw })(ChangePage)

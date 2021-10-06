import React from 'react'

import {
    FormControl,
    InputGroup,
    Button,
    Modal,
    Form,
    Image
} from 'react-bootstrap'

import { LOGO } from '../assets'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { login, closeModal } from '../redux/actions'


class ChangePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visibility: false,
            error: false,
            caps: [false,""]
            // errorLogin: false dpindah k action
        }
    }

    clickEnter = (e) => {
        if (e.key === 'Enter') {
            this.onLogin()
        }
    }

    // componentDidMount(){
    //     console.log(this.props.match.params.token)
    //     this.props.verification(this.props.match.params.token)
    //     this.setState({text: 'Verification Success'})
    // }

    onSubmit = () => {
        //ambil data dari input username dan password
        let username = this.refs.username.value
        let password = this.refs.password.value
        
        if (!username || !password) {
            return this.setState({ error: true })
        }

        this.props.login({ username, password })

    }

    onCaps = (e) => {
        if (e.getModifierState('CapsLock')) {
            return this.setState({ caps: [true, "WARNING! Caps lock is ON."] })
        }
        this.setState({ caps: [false, ""] })
    }

    render() {
        if(this.props.username){
            return <Redirect to="/" />
        }
        const {visibility} = this.state
        return (
            <div style={styles.cont}>
                <div style={styles.contForm} className="conForm">
                   <div style={{justifyContent:'center',display:'flex',paddingBottom:'20px',paddingTop:'10px'}}> <Image src={LOGO.default} style={styles.logo} /> </div>
                        <h4 style={{ color: '#343892', textAlign:'center' }}>Sign in</h4>
                    <h6 className="mb-4" style={{ color: '#343892', textAlign:'center' }}>to continue</h6>
                    <label>New Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-user-circle"></i></InputGroup.Text>
                        <InputGroup.Text id="basic-addon1" id="myInput" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Your New Password Here"
                            type={visibility ? "text" : "password"}
                            ref="password"
                            onKeyDown={(e) => this.clickEnter(e)}
                            onKeyUp={(e) => this.onCaps(e)}
                            style={{color:'#012EA9'}}
                        />
                    </InputGroup>
                    <Form.Text style={styles.textErrb} >
                        {this.state.caps[0] ? this.state.caps[1] : ""}
                    </Form.Text>
                    <label>Confirm Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" id="myInput" onClick={() => this.setState({ visibility: !visibility })}>
                            {visibility ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Confirm Your New Password Here"
                            type={visibility ? "text" : "password"}
                            ref="password"
                            onKeyDown={(e) => this.clickEnter(e)}
                            onKeyUp={(e) => this.onCaps(e)}
                            style={{color:'#012EA9'}}
                        />
                    </InputGroup>
                    <Form.Text style={styles.textErrb} >
                        {this.state.caps[0] ? this.state.caps[1] : ""}
                    </Form.Text>


                    {/* <p style={styles.forgot}><Link style={{color:'#137985'}}>Forgot Password</Link></p> */}
                    <div style={styles.contButton}>
                        <Button variant="primary" style={styles.button} onClick={this.onSubmit}>Submit</Button>

                    </div>
                    <p style={styles.gotoregis}>Don't have an account yet? </p>
                    <p style={styles.gotoregis}><Link style={{ color: '#303f9f' }} to="/login">Login</Link></p>

                   

                
            </div>
            <Modal show={this.state.error}>
                
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please input all of the data!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> this.setState({error:false})}>OK</Button>
                </Modal.Footer>
                
                </Modal>
           
                <Modal show={this.props.failedLogin}>
                
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.msgFailedLogin}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>OK</Button>
                    
                </Modal.Footer>
                
                </Modal>
            </div >
        )
    }
}

const styles = {
    cont: {
        backgroundColor:'#ffffff',
        height: '100vh',
        display:'flex',
        justifyContent: 'center'
    },
    contForm: {
        width: '30vw',
        height: '70vh',
        marginTop: '12vh',
        border: '1px solid #80F1B2',
        padding: '2%',
        borderRadius: '10px',
        justifyContent: 'center',backgroundColor:'#ffffff'
    },
    logo: {
        height:'25px'
    },
    textErrb: {
        color:'#343892',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    contButton: {
        display:'flex',
        justifyContent: 'center',
        marginBottom: '20px'        
    },
    button:{
        backgroundColor: '#343892',
        border:'none',
        marginLeft:'auto',
        marginRight:'auto',
        fontWeight:'bold',
        width:'400px',
    },
    gotoregis: {
        fontWeight: 'bold',
        textAlign:'center'
    },
    forgot:{
        fontWeight: 'bold', fontSize:'12px'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        failedLogin: state.userReducer.failedLogin,
        msgFailedLogin: state.userReducer.msgFailedLogin
    }
}
export default connect(mapStateToProps,{login, closeModal})(ChangePage)

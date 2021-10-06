import React from 'react'
import { connect } from 'react-redux'
import { verification } from '../redux/actions'
import { Card, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom'

class VerifyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Loading..."
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.token)
        this.props.verification(this.props.match.params.token)
        this.setState({ text: 'Verification Success' })
    }
    render() {
        return (
            <div style={styles.cont}>
                <h1 style={{display:'flex', marginLeft:'45vw', marginBottom:'5vh' }} >{this.state.text}</h1>
                <div style={{display:'flex'}}>
                    <Card style={{ width: '20rem' , marginLeft:'45vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Card.Img variant="top" src="https://media.istockphoto.com/photos/email-communication-woman-holding-smartphone-with-opened-envelope-picture-id1297763275?b=1&k=20&m=1297763275&s=170667a&w=0&h=2ahZ2gtO9KJK4YVQtQh5gTkaqw-cO1G5iMiZEexk36c=" />
                        <Card.Body>
                            <Card.Title>Verification complete</Card.Title>
                            <Card.Text>
                            Your email has been verified. You can login using your account. 
                            </Card.Text>
                            <Link style={{ color: '#00BCD4', fontWeight: 'bold' }} to="/login">Login Here</Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

const styles = {
    cont: {
        display: 'flex',
        flexDirection: 'column',
        background: "url(https://media.istockphoto.com/photos/empty-product-stand-platform-podium-with-cloud-picture-id1252597644?b=1&k=20&m=1252597644&s=170667a&w=0&h=hDkXmpVxiNFDBHiwJbkPLNUA-P_5DCEgILtHIrUiUIU=) no-repeat center",
        backgroundSize: 'cover',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '12vh',

    },
}

export default connect(null, { verification })(VerifyPage)
import React from 'react'
import { Card} from 'react-bootstrap'


class SendingEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={styles.cont}>
                <h1 style={{display:'flex', marginLeft:'9vw', marginBottom:'5vh' }} >Success Register</h1>
                <div style={{display:'flex'}}>
                    <Card style={{ width: '20rem' , marginLeft:'8vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Card.Img variant="top" src="https://media.istockphoto.com/photos/email-message-inbox-notification-on-laptop-screen-business-background-picture-id1229883762?b=1&k=20&m=1229883762&s=170667a&w=0&h=28x3ibf2iGnsC-07X_CIqKkrIIel4uuicWAzmQlN09Y=" />
                        <Card.Body>
                            <Card.Title>E-mail Sent</Card.Title>
                            <Card.Text>
                                Please check your email to verify your account.
                                You can login after completing email verification.
                            </Card.Text>
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

export default SendingEmail
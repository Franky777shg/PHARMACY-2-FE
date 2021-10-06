import React from 'react'

// React Bootstrap
import {
    Navbar,
    Container,
    Image
} from 'react-bootstrap'

// React Router DOM
import { Link } from 'react-router-dom'

// Import LOGO
import { LOGO } from '../assets'

class NavBar extends React.Component {
    render () {
        return (
        <Navbar style={styles.navbar}>
            <Container style={styles.container}>
            <Link to="/"><Image style={styles.logo} src={LOGO.default} /></Link>
            <div style={styles.navbarDiv}>
                <Link style={styles.navbarText} to="/login">Login</Link>
                <Link style={styles.navbarText} to="/register">Register</Link>
            </div>
            </Container>
        </Navbar>
        )
    }
}

const styles = {
    navbar: {
        backgroundColor: 'white',
        borderBottom: '2.5px solid salmon',
        height: '10vh'
    },
    container: {
        margin: '0 10vw 0 10vw',
        padding: '0',
        color: 'salmon',
        display: 'flex',
        justifyContent: 'space-between'
    },
    navbarDiv: {
        display: 'flex',
        width: '18vw',
        justifyContent: 'space-between'
    },
    navbarText: {
        color: 'salmon',
        textDecoration: 'none',
        fontWeight: '500',
        border: '1px solid salmon',
        padding: '5px 30px 5px',
        margin: '0',
        cursor: 'pointer'
    },
    logo: {
        width: '20vw'
    }
}

export default NavBar
import React from 'react'
import { connect } from 'react-redux'
// React Bootstrap
import {
    Navbar,
    Container,
    Image,
    Nav,
    Button,
    Badge,
    Dropdown
} from 'react-bootstrap'

// React Router DOM
import { Link } from 'react-router-dom'

import { logout } from '../redux/actions'
import { LOGO } from '../assets'

class NavBar extends React.Component {
    render() {
        return (
            // <Navbar style={styles.navbar}>
            //     <Container style={styles.container}>
            //     <Link to="/"><Image style={styles.logo} src={LOGO.default} /></Link>
            //     <div style={styles.navbarDiv}>
            //         <Link style={styles.navbarText} to="/login">Login</Link>
            //         <Link style={styles.navbarText} to="/register">Register</Link>
            //     </div>
            //     </Container>
            // </Navbar>
            <Navbar fixed="top" style={styles.navbar} className="px-5 flex" expand="lg">
                <Container>
                    <Navbar.Brand href="/"><Image src={LOGO.default} style={styles.image} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.role === 'admin' ?
                                <Nav className="mr-auto">
                                    <Nav.Link as={Link} to={this.props.role === 'admin' ? "/" : "/"} style={styles.navbarText}>Add Products</Nav.Link>
                                    {/* <Nav.Link href="#listProducts" style={styles.navLink}>Product</Nav.Link> */}
                                </Nav>
                                : null
                            }
                        </Nav>
                        <Nav>
                            <Nav.Link>{this.props.role === 'user' ?
                                <Button variant="outline-dark" as={Link} to="/cart"><i class="fa fa-cart-plus" aria-hidden="true"></i><Badge variant="outline-dark"></Badge></Button>
                                : null
                            }</Nav.Link><Nav.Link>
                                <Dropdown style={{ marginLeft: '10px' }}>
                                    {this.props.username
                                        ?
                                        <>
                                            {this.props.role === 'admin' 
                                            ?
                                                <>

                                                    <Dropdown.Toggle variant="outline-dark" style={styles.button} className="btnTog" id="dropdown-basic">
                                                        {this.props.username ? `Admin ${this.props.username} Dashboard` : `Admin ${this.props.username} Dashboard`}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item as={Link} to="#">Financial</Dropdown.Item>
                                                        <Dropdown.Item as={Link} to="#">Transaction</Dropdown.Item>
                                                        <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
                                                        {/* <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item> */}
                                                    </Dropdown.Menu>
                                                </>
                                                :
                                                <>
                                                    <Dropdown.Toggle variant="outline-dark" style={styles.button} className="btnTog" id="dropdown-basic">
                                                        {this.props.username ? `${this.props.username}'s Dashboard` :  `${this.props.username}'s Dashboard` }
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item as={Link} to={`/profile/${this.props.iduser}`} >Profile</Dropdown.Item>
                                                        {/* <Dropdown.Item as={Link} to="/profile/:id">My Profile</Dropdown.Item> */}
                                                        <Dropdown.Item as={Link} to="#">My Transaction</Dropdown.Item>
                                                        <Dropdown.Item onClick={this.props.logout} as={Link} to="/">Logout</Dropdown.Item>
                                                        {/* <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item> */}
                                                    </Dropdown.Menu>
                                                </>
                                            }

                                        </>
                                        :
                                        <>
                                            <Dropdown.Toggle variant="outline-dark" style={styles.button} className="btnTog" id="dropdown-basic">
                                                {this.props.username ? `Login` : "Login"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </>
                                    }


                                </Dropdown>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



        )
    }
}

const styles = {
    navbar: {
        backgroundColor: 'white',
        borderBottom: '2.5px solid #80F1B2',
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
        color: '#5AE497',
        textDecoration: 'none',
        fontWeight: '500',
        // border: '1px solid salmon',
        padding: '5px 30px 5px',
        margin: '0',
        cursor: 'pointer'
    },
    logo: {
        // width: '20vw'
        height: '50px'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        role: state.userReducer.role,
        iduser : state.userReducer.id
    }
}
export default connect (mapStateToProps, { logout })(NavBar)
// export default connect(mapStateToProps)(NavBar)

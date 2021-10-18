import React from 'react'
import {
    Accordion,
    Card,
    Button,
    Table,
    Image,
    Nav
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getHistory } from '../redux/actions'
import NavBar from '../components/navbar'
class HistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            ongoing: false,
            history: false
        }
    }
    componentDidMount() {
        // let idUser = localStorage.getItem('idUser')
        // Axios.get(`http://localhost:2000/history?username/${idUser}`)
        // .then(res => {
        //     this.setState({history: res.data})
        // })
        this.props.getHistory()
    }
    onGoing = () => {
        this.setState({ ongoing: true, history: false })
    }
    historyTransaction = () => {
        this.setState({ history: true, ongoing: false })
    }
    render() {
        // const {history} = this.state

        if (!this.props.username) {
            return <Redirect to='/login' />
        }
        if (this.props.role === 'admin') {
            return <Redirect to='/login' />
        }
        return (
            <div style={{ padding: '1%', minHeight: '100vh' }}>
                <NavBar />
                <div style={{ marginTop: '10vh' }} >
                    <h1>History Page</h1>
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={this.onGoing}>On Going Transaction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" onClick={this.historyTransaction}>History Transaction</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {this.state.ongoing ?
                        <div>
                            <Nav variant="pills" defaultActiveKey="/home">
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Accordion defaultActiveKey="0">
                                {this.props.history.reverse().map((item, index) => {
                                    return (
                                        <Card key={index} >
                                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>Username: {item.username}, Time: {item.time}</Accordion.Toggle>
                                            <Accordion.Collapse eventKey={index.toString()}>
                                                <Table striped bordered hover variant="dark">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Image</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Total Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item.products.map((item2, index2) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index2 + 1}</td>
                                                                    <td><Image src={item2.image} rounded style={{ width: '70px' }} /></td>
                                                                    <td>{item2.name}</td>
                                                                    <td>IDR{item2.price.toLocaleString()},00</td>
                                                                    <td>{item2.qty}</td>
                                                                    <td>IDR{(item2.price * item2.qty).toLocaleString()},00</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Collapse>
                                        </Card>
                                    )
                                })}
                            </Accordion>
                        </div>
                        :
                        <div>
                            <Nav variant="pills" defaultActiveKey="/home" className="justify-content-end" >
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        <Accordion defaultActiveKey="0">
                            {this.props.history.reverse().map((item, index) => {
                                return (
                                    <Card key={index} >
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>Username: {item.username}, Time: {item.time}</Accordion.Toggle>
                                        <Accordion.Collapse eventKey={index.toString()}>
                                            <Table striped bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.products.map((item2, index2) => {
                                                        return (
                                                            <tr>
                                                                <td>{index2 + 1}</td>
                                                                <td><Image src={item2.image} rounded style={{ width: '70px' }} /></td>
                                                                <td>{item2.name}</td>
                                                                <td>IDR{item2.price.toLocaleString()},00</td>
                                                                <td>{item2.qty}</td>
                                                                <td>IDR{(item2.price * item2.qty).toLocaleString()},00</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })}
                        </Accordion>
                        </div>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        history: state.historyReducer.history
    }
}
export default connect(mapStateToProps, { getHistory })(HistoryPage)

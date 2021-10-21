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
import { getHistory, getonGoing, total_payment, upload_payment } from '../redux/actions'
import Axios from 'axios';
import NavBar from '../components/navbar'
class HistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrhistory: [],
            menuongoing: false,
            menuhistory: false,
            arrongoing: [],
            images: null,
            message: null,
            historysatuan: false,
            historyresep: false,
            ongoingsatuan: false,
            ongoingresep: false
        }
    }
    arrongoing = () => {
        Axios.get(`http://localhost:2000/history/get-ongoing/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                this.setState({ arrongoing: res.data })
            })
    }

    arrhistory = () => {
        Axios.get(`http://localhost:2000/history/get-history/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                this.setState({ arrhistory: res.data })
            })
    }
    componentDidMount() {
        // let idUser = localStorage.getItem('idUser')
        // Axios.get(`http://localhost:2000/history?username/${idUser}`)
        // .then(res => {
        //     this.setState({arrhistory: res.data})
        // })
        this.props.getHistory(this.props.iduser)
        this.props.getonGoing(this.props.iduser)
        this.arrhistory()
        this.arrongoing()
    }
    onGoing = () => {
        this.setState({ menuongoing: true, menuhistory: false })

    }
    historyTransaction = () => {
        this.setState({ menuhistory: true, menuongoing: false })
        // this.arrhistory()
    }
    tbodyhistorysatuan = () => {
        console.log(this.state.arrhistory)
        {
            this.state.arrhistory.map((item2, index2) => {
                return (
                    <tr>
                        <td>{index2 + 1}</td>
                        {/* <td><Image src={item2.image} rounded style={{ width: '70px' }} /></td> */}
                        <td>{item2.nama}</td>
                        <td>IDR{item2.harga.toLocaleString()},00</td>
                        <td>{item2.qty_beli}</td>
                        <td>IDR{(item2.total_harga).toLocaleString()},00</td>
                    </tr>
                )
            })
        }
    }
    handleChoose = (e) => {
        this.setState({ images: e.target.files[0] })
        console.log('e.target.files', e.target.files)
        console.log(e.target.files[0])
        console.log(this.state.images)
    }

    handleUpload = (order_number,item,idproduk,qty_beli,harga,nama) => {
        //foto dan data = 2, data aja = 1
        let foto = new FormData()
        console.log(this.state.images)
        let message = ''
        foto.append('IMG', this.state.images)
        console.log(foto)
        console.log(foto.length)
        console.log(order_number,item,idproduk,qty_beli,harga,nama)
        // if(this.state.images !==''){
        //     data.append('IMG', this.state.images)
        //     message="2"
        // }
        // else{
        //     data = ''
        //     message="1"
        // }
        
        // console.log(data.get('IMG'))
        
        
        // let message = this.state.message
        let idproduct = this.props.location.pathname.slice(13)
        let body = {
            order_number:order_number,
            item:item,
            idproduk:idproduk,
            qty_beli:qty_beli,
            harga:harga,
            nama:nama,
            foto
            // message: this.state.message
        }
        // console.log(data.get('IMG'),body)
      
        console.log(body)
        this.props.upload_payment(this.props.iduser,foto,body)
        // this.setState({ images: '' })
    }

    
    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }
    onRemove = (order_number) => {
        // this.props.deletePhoto(this.props.iduser,order_number)
        // this.fetchData()
        // this.setState({ images: '' })
    }
    render() {
        // const {history} = this.state
        console.log(this.props.history)
        console.log(this.props.ongoingreducer)
        console.log(this.state.arrhistory)
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
                    <Nav justify variant="tabs" defaultActiveKey="link-2">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={this.onGoing}>On Going Transaction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" onClick={this.historyTransaction}>History Transaction</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {this.state.menuongoing === true ?
                        <div>
                            <Nav variant="pills" defaultActiveKey="link-1">
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={() => this.setState({ ongoingsatuan: true })}>Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Accordion defaultActiveKey="0">
                                {this.props.ongoingreducer.reverse().map((item, index) => {
                                    console.log(item)
                                    return (
                                        <Accordion.Item>
                                            <Accordion.Header variant="link" eventKey={index.toString()}>Order number: {item.order_number}, Time: {item.date}</Accordion.Header>
                                            <Accordion.Body eventKey={index.toString()}>
                                                <Table striped bordered hover >
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            {/* <th>Image</th> */}
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Total Price</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.arrongoing.map((item2, index2) => {
                                                            console.log(item2)
                                                            return (
                                                                <tr>
                                                                    <td>{index2 + 1}</td>
                                                                    {/* <td><Image src={item2.product_image} rounded style={{ width: '70px' }} /></td> */}
                                                                    <td>{item2.nama}</td>
                                                                    <td>IDR{item2.harga.toLocaleString()},00</td>
                                                                    <td>{item2.qty_beli}</td>
                                                                    <td>IDR{(item2.total_harga).toLocaleString()},00</td>

                                                                </tr>
                                                            )
                                                        })}

                                                        <tr>
                                                            <td>Status: {item.status}</td>
                                                            {/* <td>{this.props.totalpmt}{this.props.total_payment(this.props.iduser, { order_number: item.order_number })}</td> */}
                                                            <td></td>
                                                            {item.status === 'Waiting For Payment' ?
                                                                <td>
                                                                    <form encType="multipart/form-data">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            name="IMG"
                                                                            onChange={(e) => this.setState({images: e.target.files[0]})}
                                                                        />
                                                                    </form></td>
                                                                : null}
                                                                <td>{item.total_bayar}</td>
                                                            {item.status === 'Waiting For Payment' ?
                                                                <td><Button style={{ width: '10vw', marginBottom: '30px' }} variant="primary" onClick={() =>this.handleUpload(item.order_number, item, item.idproduk, item.qty_beli, item.harga, item.nama)}>Upload Payment Proof</Button>
                                                                    {/* <Button
                                                                        className="button"
                                                                        variant="success"
                                                                        onClick={this.onRemove(item.order_number)}
                                                                    >
                                                                        Remove
                                                                    </Button> */}
                                                                </td>
                                                                : null}
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    )
                                })}
                            </Accordion>
                        </div>
                        :
                        <div>
                            <Nav variant="pills" defaultActiveKey="link-1" className="justify-content-end" style={{ marginBottom: '10px' }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={() => this.setState({ historysatuan: true })}>Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Accordion display={this.state.historysatuan}>
                                {this.props.history.reverse().map((item, index) => {
                                    return (
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header as={Card.Header} variant="link" eventKey={index.toString()}>Order Number: {item.order_number}, Time: {item.date}</Accordion.Header>
                                            <Accordion.Body>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            {/* <th>Image</th> */}
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Total Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {item.map((item2, index2) => {
                                                        return ( */}
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            {/* <td><Image src={item2.image} rounded style={{ width: '70px' }} /></td> */}
                                                            <td>{item.nama}</td>
                                                            <td>IDR{item.harga.toLocaleString()},00</td>
                                                            <td>{item.qty_beli}</td>
                                                            <td>IDR{(item.total_harga).toLocaleString()},00</td>
                                                        </tr>
                                                        {/* )
                                                    })} */}

                                                        {/* {this.tbodyhistorysatuan()} */}
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })

                                }
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
        iduser: state.userReducer.id,
        history: state.historyReducer.history,
        ongoingreducer: state.historyReducer.ongoing,
        totalpmt: state.historyReducer.totalpmt
    }
}
export default connect(mapStateToProps, { getHistory, getonGoing, total_payment, upload_payment })(HistoryPage)

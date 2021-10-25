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
import { Link, Redirect } from 'react-router-dom'
import { getHistory, getonGoing, total_payment, upload_payment } from '../redux/actions'
import Axios from 'axios';
import NavBar from '../components/navbar'
class HistoryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrhistory: [],
            menuongoing: true,
            menuhistory: false,
            arrongoing: [],
            arrongoingresep: [],
            images: null,
            message: null,
            historysatuan: false,
            historyresep: false,
            ongoingsatuan: true,
            ongoingresep: false,
            arrhistoryR: []
        }
    }
    arrongoing = () => {
        //get on going buat ambil ordernumber
        Axios.get(`http://localhost:2000/history/get-ordernumber/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                let hasil = res.data
                //foreach ordernumber
                hasil.forEach(item => {
                    console.log(item)
                    console.log(item.order_number)
                    Axios.post(`http://localhost:2000/history/datatransaksi/${this.props.iduser}`, item)
                        .then(reshasil => {
                            // this.setState({ arrongoing: reshasil.data })
                            let temp = this.state.arrongoing
                            temp.push(reshasil.data)
                            console.log(reshasil.data)
                            console.log(temp)
                            this.setState({ arrongoing: temp })
                            console.log(this.state.arrongoing)
                        })
                })
                //ambil data transaksi, masukin .products = []
                //ambil total bayar trs masukin k data transaksi
                //ambil detail produk
            })
            .catch(err => console.log('error ongoing'))


        // console.log(this.state.arrongoing)
    }

    arrongoingresep = () => {
        //get on going buat ambil ordernumber
        Axios.get(`http://localhost:2000/history/get-ordernumberR/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                let hasil = res.data
                //foreach ordernumber
                hasil.forEach(item => {
                    console.log(item)
                    console.log(item.order_number)
                    Axios.post(`http://localhost:2000/history/datatransaksiR/${this.props.iduser}`, item)
                        .then(reshasil => {
                            // this.setState({ arrongoing: reshasil.data })
                            let temp = this.state.arrongoingresep
                            temp.push(reshasil.data)
                            // console.log(reshasil.data)
                            // console.log(temp)
                            this.setState({ arrongoingresep: temp })
                            console.log(this.state.arrongoingresep)
                            // console.log(this.state.arrongoingresep.products)
                        })
                })
                //ambil data transaksi, masukin .products = []
                //ambil total bayar trs masukin k data transaksi
                //ambil detail produk
            })
            .catch(err => console.log('error ongoing'))


        // console.log(this.state.arrongoing)
    }

    arrhistory = () => {
        Axios.get(`http://localhost:2000/history/get-history/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                let hasil = res.data
                //foreach ordernumber
                hasil.forEach(item => {
                    console.log(item)
                    console.log(item.order_number)
                    Axios.post(`http://localhost:2000/history/datahistory1/${this.props.iduser}`, item)
                        .then(reshasil => {
                            // this.setState({ arrongoing: reshasil.data })
                            let temp = this.state.arrhistory
                            temp.push(reshasil.data)
                            console.log(reshasil.data)
                            console.log(temp)
                            this.setState({ arrhistory: temp })
                            console.log(this.state.arrhistory)
                        })
                })
            })
    }

    arrhistoryR = () => {
        Axios.get(`http://localhost:2000/history/get-onhistoryr/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                let hasil = res.data
                //foreach ordernumber
                hasil.forEach(item => {
                    console.log(item)
                    console.log(item.order_number)
                    Axios.post(`http://localhost:2000/history/datahistoryr/${this.props.iduser}`, item)
                        .then(reshasil => {
                            // this.setState({ arrongoing: reshasil.data })
                            let temp = this.state.arrhistoryR
                            temp.push(reshasil.data)
                            console.log(reshasil.data)
                            console.log(temp)
                            this.setState({ arrhistoryR: temp })
                            console.log(this.state.arrhistoryR)
                        })
                })
            })
    }

    componentDidMount() {
        // let idUser = localStorage.getItem('idUser')
        // Axios.get(`http://localhost:2000/history?username/${idUser}`)
        // .then(res => {
        //     this.setState({arrhistory: res.data})
        // })
        this.props.getHistory(this.props.iduser)
        // this.props.getonGoing(this.props.iduser)
        this.arrhistory()
        this.arrhistoryR()
        this.arrongoing()
        this.arrongoingresep()
    }
    onGoing = () => {
        this.setState({ menuongoing: true, menuhistory: false })

    }
    historyTransaction = () => {
        this.setState({ menuhistory: true, menuongoing: false })
        // this.arrhistory()
    }

    handleChoose = (e) => {
        this.setState({ images: e.target.files[0] })
        console.log('e.target.files', e.target.files)
        console.log(e.target.files[0])
        console.log(this.state.images)
    }

    handleUpload = (order_number, item, total_bayar) => {
        //foto dan data = 2, data aja = 1
        let foto = new FormData()
        console.log(this.state.images)
        let message = ''
        foto.append('IMG', this.state.images)
        console.log(foto)
        // console.log(foto.length)
        console.log(order_number, item, total_bayar)
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
            order_number: order_number,
            item: item,
            total_bayar: total_bayar,
            foto
            // message: this.state.message
        }
        // console.log(data.get('IMG'),body)

        console.log(body)
        Axios.post(`http://localhost:2000/history/post-pmt/${this.props.iduser}`, body)
            .then(res => {
                console.log(res.data)
                Axios.post(`http://localhost:2000/history/upload-pmt/${this.props.iduser}`, foto, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res1 => {
                        console.log(res1)
                        Axios.post(`http://localhost:2000/history/og-wfpa/${this.props.iduser}`, body)
                            .then(res2 => {
                                console.log(res2.data)
                                console.log('berhasil update status menjadi "Waiting For Payment Approval"')
                            })
                            .catch(err => { console.log('error update status') })

                    })
                    .catch(err => { console.log('error upload payment proof') })

            })
            .catch(err => { console.log('error post to payment satuan') })
        // this.props.upload_payment(this.props.iduser, foto, body)
        // this.setState({ images: '' })
    }


    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }
    onCancel = (order_number) => {
        // this.props.deletePhoto(this.props.iduser,order_number)
        let body = {
            order_number: order_number
        }
        // this.fetchData()
        // this.setState({ images: '' })
        Axios.post(`http://localhost:2000/history/cancelr/${this.props.iduser}`, body)
        .then(res => {
            console.log('Berhasil update status transaksi satuan menjadi Cancel')
            this.setState({arrongoingresep:[] , arrhistoryR: []})
            this.arrongoingresep()
            // this.historyTransaction()
            this.arrhistoryR()
        })
        .catch(err => { console.log('Gagal update status stransaksi satuan menjadi Cancel') })
    }

    handleComplete1 = (order_number) => {
        let body = {
            order_number: order_number
        }
        // console.log(body)
        Axios.post(`http://localhost:2000/history/og-tocomplete1/${this.props.iduser}`, body)
            .then(res => {
                console.log('Berhasil update status transaksi satuan menjadi Complete')
                this.setState({arrongoing:[] , arrhistory: []})
                this.arrongoing()
                // this.historyTransaction()
                this.arrhistory()
            })
            .catch(err => { console.log('Gagal update status stransaksi satuan menjadi Complete') })
    }

    handleCompleteR = (order_number, item) => {
        let body = {
            order_number: order_number,
            item: item
        }
        Axios.post(`http://localhost:2000/history/og-tocompleter/${this.props.iduser}`, body)
            .then(res => {
                console.log('Berhasil update status transaksi resep menjadi Complete')
                this.setState({arrongoingresep:[] , arrhistoryR: []})
                this.arrongoingresep()
                this.arrhistoryR()
            })
            .catch(err => { console.log('Gagal update status transaksi resep menjadi Complete') })
    }

    render() {
        // const {history} = this.state
        console.log(this.state.arrongoingresep)
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
                    <h1>{this.props.username}'s Transaction Page</h1>
                    <Nav justify variant="tabs" defaultActiveKey={this.state.menuongoing === true ? "link-1" : "link-2"} >
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={this.onGoing}>On Going Transaction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" onClick={this.historyTransaction}>History Transaction</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {this.state.menuongoing === true ?
                        <div>
                            <Nav variant="pills" defaultActiveKey="link-1" style={{ marginBottom: '10px' }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={() => this.setState({ ongoingsatuan: true, ongoingresep: false })}>Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2" onClick={() => this.setState({ ongoingsatuan: false, ongoingresep: true })}>Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {this.state.ongoingsatuan === true ? <Accordion defaultActiveKey="0">
                                {this.state.arrongoing.map((item, index) => {
                                    console.log(item)
                                    console.log(item[0])
                                    console.log(item[0].order_number)
                                    // console.log(item[index])
                                    return (
                                        <Accordion.Item eventKey={index.toString()}>
                                            <Accordion.Header variant="link" as={Card.Header}>Order number: {item[0].order_number}, Order date: {item[0].date}</Accordion.Header>
                                            <Accordion.Body eventKey={index.toString()}>
                                                <Table striped bordered hover >
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
                                                        {item[0].products ? item[0].products.map((item2, index2) => {
                                                            console.log(item2)
                                                            return (
                                                                <tr>
                                                                    <td>{index2 + 1}</td>
                                                                    <td><Image src={`http://localhost:2000/${item2.product_image}`} rounded style={{ width: '70px' }} /></td>
                                                                    <td>{item2.nama}</td>
                                                                    <td>IDR{item2.harga.toLocaleString()},00</td>
                                                                    <td>{item2.qty_beli}</td>
                                                                    <td>IDR{(item2.total_harga.toLocaleString())},00</td>

                                                                </tr>
                                                            )
                                                        })
                                                            :
                                                            <div></div>}
                                                        <tr><td></td><td colSpan="5">The amount you have to pay: IDR <span style={{ fontWeight: 'bold' }}>{item[0].total_bayar.toLocaleString()}</span></td></tr>

                                                        <tr>
                                                            <td></td><td colSpan={item[0].status === 'Waiting For Payment' ? "3" : item[0].status === 'Sending Package' ? "4" : "5"}>Status: {item[0].status}</td>
                                                            {item[0].status === 'Waiting For Payment' ?
                                                                <td>
                                                                    <form encType="multipart/form-data">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            name="IMG"
                                                                            onChange={(e) => this.handleChoose(e)}
                                                                        // onChange={(e) => this.setState({ images: e.target.files[0] })}
                                                                        />
                                                                    </form></td>
                                                                : null}
                                                            {/* <td>{item[0].total_bayar}</td> */}
                                                            {item[0].status === 'Waiting For Payment' ?
                                                                <td style={{ display:'flex',justifyContent:'space-around'}}><Button variant="primary" onClick={() => this.handleUpload(item[0].order_number, item, item[0].total_bayar)}>Upload Payment Proof</Button>
                                                                   
                                                                </td>
                                                                : null}
                                                            {item[0].status === 'Sending Package' ? <td style={{ display:'flex',justifyContent:'space-around'}}><Button style={{ width: '10vw', marginBottom: '30px', justifyContent: 'center' }} variant="outline-primary" onClick={() => this.handleComplete1(item[0].order_number)}>Complete</Button></td> : null}
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    )
                                })}
                            </Accordion>
                                :
                                <Accordion defaultActiveKey="0">
                                    {this.state.arrongoingresep.map((item, index) => {
                                        console.log(item)
                                        console.log(item[0])
                                        console.log(item[0].order_number)
                                        // console.log(item[index])
                                        return (
                                            <Accordion.Item eventKey={index.toString()}>
                                                <Accordion.Header variant="link" as={Card.Header}>Order number: {item[0].order_number}, Order date: {item[0].date}</Accordion.Header>
                                                <Accordion.Body eventKey={index.toString()}>
                                                    <Table striped bordered hover >
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
                                                            {item[0].products ? item[0].products.map((item2, index2) => {
                                                                console.log(item2)
                                                                return (
                                                                    <tr>
                                                                        <td>{index2 + 1}</td>
                                                                        <td><Image src={`http://localhost:2000/${item2.link_foto}`} rounded style={{ width: '70px' }} /></td>
                                                                        <td>{item2.nama}</td>
                                                                        <td>IDR{item2.harga.toLocaleString()},00</td>
                                                                        <td>{item2.qty_beli}</td>
                                                                        <td>IDR{((item2.harga * item2.qty_beli).toLocaleString())},00</td>

                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <div></div>}
                                                            {item[0].status === 'Waiting For Approval' ? null : <tr><td></td><td colSpan="5">The amount you have to pay: IDR <span style={{ fontWeight: 'bold' }}>{item[0].total_belanja.toLocaleString()}</span></td></tr>}
                                                            <tr>
                                                                <td></td><td colSpan={item[0].status === 'Waiting For Approval' ? "4" : item[0].status === 'Waiting For payment' ? "4" : "5"}>Status: {item[0].status}</td>

                                                                {item[0].status === 'Waiting For Payment' ?
                                                                    <td style={{ display:'flex',justifyContent:'center'}}><Button variant="primary" as={Link} to={`/paymentresep/${this.props.iduser}`}>Upload Payment Proof</Button>
                                                                    </td>
                                                                    : null}
                                                                    
                                                                    {item[0].status === 'Waiting For Approval' ? <tr style={{ display:'flex',justifyContent:'center'}}> <Button
                                                                        className="button"
                                                                        // variant="warning"
                                                                        style={{backgroundColor: '#343892'}}
                                                                        onClick= {() => this.onCancel(item[0].order_number)}
                                                                    >
                                                                        Cancel
                                                                    </Button></tr> : null}
                                                                {item[0].status === 'Sending Package' ? <td style={{ display:'flex',justifyContent:'center'}}><Button style={{ width: '10vw', marginBottom: '30px' }} variant="outline-primary" onClick={() => this.handleCompleteR(item[0].order_number, item)}>Complete</Button></td> : null}
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                        )
                                    })}
                                </Accordion>
                            }
                        </div>
                        :
                        <div>
                            <Nav variant="pills" defaultActiveKey="link-1" className="justify-content-end" style={{ marginBottom: '10px' }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={() => this.setState({ ongoingsatuan: true, ongoingresep: false })}>Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2" onClick={() => this.setState({ ongoingsatuan: false, ongoingresep: true })}>Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            {this.state.ongoingsatuan === true ?
                                <Accordion display={this.state.historysatuan}>
                                    {this.state.arrhistory.reverse().map((item, index) => {
                                        // waiting for approval, button ga ada
                                        return (
                                            <Accordion.Item eventKey={index.toString()}>
                                                <Accordion.Header as={Card.Header} variant="link" eventKey={index.toString()}>Order number: {item[0].order_number}, Order date: {item[0].date}</Accordion.Header>
                                                <Accordion.Body>
                                                    <Table striped bordered hover>
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
                                                            {item[0].products.map((item2, index2) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index2 + 1}</td>
                                                                        <td><Image src={`http://localhost:2000/${item2.product_image}`} rounded style={{ width: '70px' }} /></td>
                                                                        <td>{item2.nama}</td>
                                                                        <td>IDR{item2.harga.toLocaleString()},00</td>
                                                                        <td>{item2.qty_beli}</td>
                                                                        <td>IDR{(item2.total_harga).toLocaleString()},00</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            <tr><td colSpan="3">Status: {item[0].status}</td><td colSpan="3">Total Paid: IDR <span style={{ fontWeight: 'bold' }}>{item[0].total_bayar.toLocaleString()}</span></td></tr>
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })

                                    }
                                </Accordion>
                                :
                                <Accordion defaultActiveKey="0">
                                    {this.state.arrhistoryR.reverse().map((item, index) => {
                                        console.log(item)
                                        console.log(item[0])
                                        console.log(item[0].order_number)
                                        // console.log(item[index])
                                        return (
                                            <Accordion.Item eventKey={index.toString()}>
                                                <Accordion.Header variant="link" as={Card.Header}>Order number: {item[0].order_number}, Order date: {item[0].date}</Accordion.Header>
                                                <Accordion.Body eventKey={index.toString()}>
                                                    <Table striped bordered hover >
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
                                                            {item[0].products ? item[0].products.map((item2, index2) => {
                                                                console.log(item2)
                                                                return (
                                                                    <tr>
                                                                        <td>{index2 + 1}</td>
                                                                        <td><Image src={`http://localhost:2000/${item2.link_foto}`} rounded style={{ width: '70px' }} /></td>
                                                                        <td>{item2.nama}</td>
                                                                        <td>IDR{item2.harga.toLocaleString()},00</td>
                                                                        <td>{item2.qty_beli}</td>
                                                                        <td>IDR{((item2.harga * item2.qty_beli).toLocaleString())},00</td>

                                                                    </tr>
                                                                )
                                                            })
                                                                :
                                                                <div></div>}
                                                            <tr><td colSpan="3">Status: {item[0].status}</td><td colSpan="3">Total Paid: IDR <span style={{ fontWeight: 'bold' }}>{item[0].total_belanja.toLocaleString()}</span></td></tr>
                                                        </tbody>
                                                    </Table>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                        )
                                    })}
                                </Accordion>
                            }
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

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
import { getHistory, getonGoing } from '../redux/actions'
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
            images:null,
            message:null
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
        // this.props.getHistory(this.props.iduser)
        // this.props.getonGoing(this.props.iduser)
        this.arrhistory()
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

    handleUpload = () => {
        //foto dan data = 2, data aja = 1
        let data = new FormData()
        console.log(data)
        console.log(this.state.images)
        let message = ''
        data.append('IMG', this.state.images)
        // if(this.state.images !==''){
        //     data.append('IMG', this.state.images)
        //     message="2"
        // }
        // else{
        //     data = ''
        //     message="1"
        // }
        console.log(this.refs.namaobat.value)
        // console.log(data.get('IMG'))
        let nama = this.refs.namaobat.value
        let harga = +this.refs.harga.value
        let satuan = this.refs.satuan.value
        // const link_foto = res.data
        let stok = +this.refs.stok.value
        let kategori = this.refs.category.value
        let deskripsi = this.refs.deskripsi.value
        let indikasi_umum = this.refs.indikasi_umum.value
        let komposisi = this.refs.komposisi.value
        let dosis = this.refs.dosis.value
        let aturan_pakai = this.refs.aturan_pakai.value
        let kontra_indikasi = this.refs.kontra_indikasi.value
        let perhatian = this.refs.perhatian.value
        let efek_samping = this.refs.efek_samping.value
        let segmentasi = this.refs.segmentasi.value
        let kemasan = this.refs.kemasan.value
        let manufaktur = this.refs.manufaktur.value
        let no_registrasi = this.refs.no_registrasi.value
        // let message = this.state.message
        let idproduct = this.props.location.pathname.slice(13)
        let body = {
            nama,
            harga,
            satuan,
            // link_foto,
            stok,
            kategori,
            deskripsi,
            indikasi_umum,
            komposisi,
            dosis,
            aturan_pakai,
            kontra_indikasi,
            perhatian,
            efek_samping,
            segmentasi,
            kemasan,
            manufaktur,
            no_registrasi,
            idproduct,
            message: this.state.message
        }
        // console.log(data.get('IMG'),body)
        console.log(this.state.images)
        console.log(data)
        console.log(data.length)
        // console.log(message)
        this.props.editProduct1(data, body, idproduct)
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
                    {/* {this.state.ongoing ?
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
                                {this.props.ongoingreducer.reverse().map((item, index) => {
                                    console.log(item)
                                    return (
                                        <Card key={index} >
                                            <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>Username: {item.username}, Time: {item.date}</Accordion.Toggle>
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
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.arrongoing.map((item2, index2) => {
                                                            console.log(item2)
                                                            return (
                                                                <tr>
                                                                    <td>{index2 + 1}</td>
                                                                    <td><Image src={item2.product_image} rounded style={{ width: '70px' }} /></td>
                                                                    <td>{item2.nama}</td>
                                                                    <td>IDR{item2.harga.toLocaleString()},00</td>
                                                                    <td>{item2.qty_beli}</td>
                                                                    <td>IDR{(item2.total_harga).toLocaleString()},00</td>
                                                                    <td>{item.status}<form encType="multipart/form-data">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            name="IMG"
                                                                            onChange={(e) => this.setState({ images: e.target.files[0], message: '0' })}
                                                                        />
                                                                    </form>
                                                                    <Button style={{ width: '10vw', marginBottom: '30px' }} variant="primary" onClick={this.handleUpload}>Upload Payment Proof</Button>
                                                                       {this.state.message === 0 ? <Button
                                                                            className="button"
                                                                            variant="success"
                                                                            onClick={this.onRemove}
                                                                        >
                                                                            Remove
                                                                        </Button> : null }</td>
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
                        : */}
                        <div>
                            <Nav variant="pills" defaultActiveKey="link-1" className="justify-content-end" >
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Obat Satuan</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Obat Resep</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Accordion>
                                {this.state.arrhistory.reverse().map((item, index) => {
                                    return (
                                        <Accordion.Item eventKey = "0">
                                            <Accordion.Header as={Card.Header} variant="link" eventKey={index.toString()}>Order Number: {item.order_number}, Time: {item.date}</Accordion.Header>
                                            <Accordion.Body>
                                                <Table striped bordered hover variant="dark">
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
                    {/* } */}
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
        ongoingreducer: state.historyReducer.ongoing
    }
}
export default connect(mapStateToProps, { getHistory, getonGoing })(HistoryPage)

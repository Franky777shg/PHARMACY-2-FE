import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// Redux
import { connect } from 'react-redux'
import { editProductR } from '../redux/actions'
// React Router DOM
import { Link, Redirect } from 'react-router-dom'

// React Bootstrap
import {
    Image,
    Button,
    Form,
    FormControl, Modal
} from 'react-bootstrap'

const URL_API = 'http://localhost:2000/product'

class EditRPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            qty: 1,
            selectValue: '',
            images: '',
            maxbotol: null,
            maxml: null,
            stok_botol: null,
            nama: null,
            harga: null,
            stok_ml: null,
            kategori: null,
            message: '',
            stok_ml_temp: null,
            adafoto: false,
            error: false,
            errormes: '',
            berhasil: false,
            berhasilmes: ''
        }
    }

    componentDidMount() {
        let idProduct = this.props.location.pathname.slice(14)
        Axios.get(`${URL_API}/detail-productr/${idProduct}`)
            .then(res => {
                this.setState({
                    product: res.data, maxbotol: res.data.stok_ml, stok_ml: res.data.stok_ml,
                    nama: res.data.nama,
                    harga: res.data.harga,
                    stok_ml_temp: res.data.stok_ml,
                    kategori: res.data.kategori,
                    deskripsi: res.data.deskripsi,

                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchData = () => {
        let idProduct = this.props.location.pathname.slice(14)
        Axios.get(`${URL_API}/detail-productr/${idProduct}`)
            .then(res => {
                this.setState({
                    product: res.data, maxbotol: res.data.stok_ml, stok_ml: res.data.stok_ml,
                    nama: res.data.nama,
                    harga: res.data.harga,
                    stok_ml_temp: res.data.stok_ml,
                    kategori: res.data.kategori,
                    deskripsi: res.data.deskripsi,

                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    onChangeQty = (e) => {
        let value = +e.target.value
        let maxQty = this.state.product.stok_ml / 100

        if (value < 1) {
            this.setState({ qty: 1 })
        } else if (value > maxQty) {
            this.setState({ qty: maxQty })
        } else {
            this.setState({ qty: value })
        }
    }
    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }

    handleChoose = (e) => {
        this.setState({ images: e.target.files[0] })
        console.log('e.target.files', e.target.files)
        console.log(e.target.files[0])
        console.log(this.state.images)
    }
    onRemove = () => {
        // this.props.deletePhoto(this.props.location.pathname.slice(14))
        let idproduct = this.props.location.pathname.slice(14)
        Axios.post(`${URL_API}/defaultphoto-productr/${idproduct}`, idproduct)
            .then(res => {
                console.log(res)
                this.fetchData()
                this.setState({ images: '' , berhasil: true, berhasilmes: 'Berhasil remove foto produk racikan diganti dengan default'})

            })
            .catch(err => {
                this.setState({error: true, errormes: 'Gagal remove foto produk, refresh dan coba lagi'})
            })
    }
    handleUpload = () => {
        //foto dan data = 2, data aja = 1
        let foto = new FormData()
        console.log(foto)
        console.log(this.state.images)
        let message = ''
        foto.append('IMG', this.state.images)
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
        // const link_foto = res.data
        // let stok_botol = +this.refs.stok_botol.value
        let kategori = this.refs.category.value
        let stok_ml = +this.refs.stok_ml.value * 100 + (this.state.stok_ml_temp) % 100
        // let message = this.state.message
        let idproduk_resep = this.props.location.pathname.slice(14)
        let body = {
            nama,
            harga,
            // stok_botol,
            // link_foto,
            stok_ml,
            kategori,
            idproduk_resep,
            message: this.state.message
        }
        // console.log(data.get('IMG'),body)
        console.log(this.state.images)
        // console.log(data)
        // console.log(data.length)
        // console.log(message)
        // this.props.editProductR(foto, body, idproduk_resep, this.state.adafoto)
        if (this.state.adafoto === true) {
            Axios.post(`${URL_API}/edit-productrdata/${idproduk_resep}`, body)
                .then(res => {
                    // console.log(res.data.data[0].idproduk)
                    console.log(res.data)
                    // const hasil = res.data
                    // const kirim = { ...data, hasil }
                    Axios.post(`${URL_API}/edit-productrfoto/${idproduk_resep}`, foto, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(res => {
                            // console.log(res.data.data[0].idproduk)
                            // console.log(res.data)
                            // dispatch({
                            //     type: 'EDITPRODUCT1',
                            //     payload: 'Berhasil update produk'

                            // })
                            this.fetchData()
                            this.setState({ berhasil: true, berhasilmes: `Berhasil update produk racikan dengan id ${idproduk_resep}`, images: '' })
                        })
                        .catch(err => {
                            console.log(err)
                            this.setState({ error: true, errormes: 'Gagal update produk racikan, refresh kembali dan coba lagi', images: '' })
                            // dispatch({
                            //     type: 'EDITPRODUCT1_FAIL',
                            //     payload: err.response.data

                            // })
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (this.state.adafoto === false) {
            Axios.post(`${URL_API}/edit-productrdata/${idproduk_resep}`, body)
                .then(res => {
                    // console.log(res.data.data[0].idproduk)
                    console.log(res.data)
                    // dispatch({
                    //     type: 'EDITPRODUCT1',
                    //     payload: 'Berhasil update produk'

                    // })
                    this.fetchData()
                    this.setState({ berhasil: true, berhasilmes: `Berhasil update produk racikan dengan id ${idproduk_resep}`, images: '' })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ error: true, errormes: 'Gagal update produk racikan, refresh kembali dan coba lagi' , images: ''})
                    // dispatch({
                    //     type: 'EDITPRODUCT1_FAIL',
                    //     payload: err.response.data

                    // })
                })
        }
        this.fetchData()
        
    }

    render() {
        if (this.props.role !== "admin") {
            return <Redirect to="/" />
        }
        return (
            <div>
                <NavBar />
                <div style={{ padding: '100px 50px' }}>
                    <div style={styles.container}>
                        <div style={styles.imageDiv}>
                            <Image style={styles.image} src={this.state.product ? `http://localhost:2000/${this.state.product.link_foto}` : ""} />
                            <div style={styles.buttonProfile}>
                                <form encType="multipart/form-data">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="IMG"
                                        onChange={(e) => this.setState({ images: e.target.files[0], adafoto: true })}
                                    />
                                </form>
                                <Button
                                    className="button"
                                    // variant="danger"
                                    style={{ background: '#DF2E2E', border: 'none' }}
                                    onClick={this.onRemove}
                                >
                                    <i class="fas fa-trash" style={{ marginRight: '10px' }}></i>Remove
                                </Button>
                            </div>




                        </div>
                        <div style={styles.textDiv}>
                            <div style={styles.textDescription}>
                                <h3 style={styles.h3}>Nama Obat<FormControl
                                    // placeholder={this.state.product ? this.state.product.nama : ""}
                                    value={this.state.nama}
                                    onChange={(e) => this.setState({ nama: e.target.value })}
                                    type="text"
                                    ref="namaobat"
                                /></h3>
                                <h4 style={styles.h4}>Harga<FormControl
                                    // placeholder={this.state.product ? `Rp ${(this.state.product.harga).toLocaleString()}` : ""}
                                    value={this.state.harga}
                                    onChange={(e) => this.setState({ harga: +e.target.value })}
                                    type="number"
                                    ref="harga"
                                /></h4>
                                <h5 style={{ marginBottom: '2px' }}>Kategori</h5>
                                {/* <Form.Control style={styles.filterForm} type="text" placeholder="Name" ref="name" /> */}
                                <Form.Select style={styles.filterForm} ref="category" value={this.state.kategori} onChange={(e) => this.setState({ kategori: e.target.value })} >
                                    <option value="">Category</option>
                                    <option value="Asma">Asma</option>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Jantung">Jantung</option>
                                    <option value="Kulit">Kulit</option>
                                    <option value="Mata">Mata</option>
                                    <option value="Saluran Pencernaan">Saluran Pencernaan</option>
                                </Form.Select>
                            </div>

                            <div style={styles.textDescription}>
                                <h4 style={styles.h4}>Stok (botol)
                                </h4>

                                {this.props.username
                                    ?
                                    <div style={styles.controlDiv}>
                                        <div style={styles.inputJumlahStokDiv}>
                                            {/* <Button variant="outline-primary" disabled={this.state.stok_ml / 100 === 0 ? true : false} onClick={() => this.setState({ stok_ml: Math.floor(this.state.stok_ml / 100) - 1 })}>-</Button> */}
                                            <Form.Control
                                                style={styles.form}
                                                type="number"
                                                value={Math.floor(this.state.stok_ml / 100)}
                                                //setiap placeholder ada state masing2
                                                onChange={(e) => this.setState({ stok_ml: (+e.target.value) * 100 + (this.state.stok_ml_temp) % 100 })}
                                                ref="stok_ml"

                                            />
                                            {/* <Button variant="outline-primary" onClick={() => this.setState({ stok_ml: Math.floor(this.state.stok_ml/ 100) + 1 })}>+</Button> */}
                                        </div>
                                        <Form.Label
                                        // style={styles.form}

                                        //setiap placeholder ada state masing2
                                        // onChange={(e) => this.setState({ stokml: e.target.value })}
                                        // ref="stok_ml"

                                        >
                                            Stok (ml) = {(this.state.stok_ml_temp) % 100}</Form.Label>
                                    </div>
                                    :
                                    <div></div>
                                }
                                {/* <h4 style={styles.h4}>Stok (ml)
                                
                            </h4> */}
                                {this.props.username
                                    ?
                                    <div style={styles.controlDiv}>
                                        <div style={styles.inputJumlahStokDiv}>
                                            {/* <Button variant="outline-primary" disabled={this.state.stok_ml === 0 ? true : false} onClick={() => this.setState({ stok_ml: this.state.stok_ml - 1 })}>-</Button> */}

                                            {/* <Button variant="outline-primary" onClick={() => this.setState({ stok_ml: this.state.stok_ml + 1 })}>+</Button> */}
                                        </div>
                                        <Button style={styles.button} variant="primary" onClick={this.handleUpload}>Update data</Button>
                                    </div>
                                    :
                                    <div></div>
                                }
                                <Modal show={this.state.error} onHide={() => this.setState({ error: false, errormes: '' })}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Error!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{this.state.errormes}</Modal.Body>
                                    <Modal.Footer>
                                        <Button style={{ backgroundColor: '#000051', color: 'white' }} onClick={() => this.setState({ error: false, errormes: '' })}>
                                            OK
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={this.state.berhasil} onHide={() => this.setState({ berhasil: false, berhasilmes: '' })}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Congrats!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{this.state.berhasilmes}</Modal.Body>
                                    <Modal.Footer>
                                        <Button style={{ backgroundColor: '#000051', color: 'white' }} onClick={() => this.setState({ berhasil: false, berhasilmes: '' })}>
                                            OK
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex'
    },
    image: {
        width: '30vw',
    },
    h3: {
        margin: '10px 0 30px'
    },
    h4: {
        margin: '0 0 10px'
    },
    imageDiv: {
        // height: '150vh',
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        color: '#343892'
    },
    textDiv: {
        flex: 3,
        padding: '0 20px'
    },
    controlDiv: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputJumlahStokDiv: {
        width: '10vw',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    form: {
        width: '5vw',
        textAlign: 'center'
    },
    textDescription: {
        borderBottom: '1px solid #80F1B2',
        marginBottom: '1rem',
        color: '#343892'
    },
    button: {
        backgroundColor: '#343892',
        border: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        width: '400px',
        marginBottom: '30px'
        // { width: '10vw',  }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { editProductR })(EditRPage)
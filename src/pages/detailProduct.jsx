import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// Redux
import { connect } from 'react-redux'

// React Router DOM
import { Link, Redirect } from 'react-router-dom'

// React Bootstrap
import {
    Image,
    Button,
    Form
} from 'react-bootstrap'
import { addCart } from '../redux/actions'
const URL_API = 'http://localhost:2000/product'

class DetailProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            qty: 1,
            max: null,
            toLogin:false,
            toCart:false,
        }
    }

    componentDidMount() {
        let idProduct = this.props.location.pathname.slice(16)
        Axios.get(`${URL_API}/detail-product/${idProduct}`)
            .then(res => {
                this.setState({ product: res.data, max: res.data.stok })
            })
            .catch(err => {
                console.log(err)
            })
    }
    onCheckout = () => {
        const {product,qty} = this.state
        if (!this.props.username){
            return this.setState({toLogin: true})
        }

        //siapkan data produk yang mau kita push ke dalam cart user yang sedang aktif
        let obj = {
            // id: product.id,
            dataproduk: product,
            // nama: product.nama,
            // image: product.images[0],
            // harga: product.harga,
            // stock: product.stock,
            qty
            
            //qty:qty, property:value nya sama,
        }
        console.log(obj)
        console.log(this.props.iduser)
        this.props.addCart(this.props.iduser,obj)
        console.log(this.props.cart)

        this.setState({toCart:true})
    }

    onChangeQty = (e) => {
        let value = +e.target.value
        let maxQty = this.state.product.stok

        if (value < 1) {
            this.setState({ qty: 1 })
        } else if (value > maxQty) {
            this.setState({ qty: maxQty })
        } else {
            this.setState({ qty: value })
        }
    }

    render () {
        if (this.props.role === "admin") {
            return <Redirect to="/" />
        }
        else if (this.state.toLogin) {
            return <Redirect to="/login" />
        }else if (this.state.toCart) {
            return <Redirect to="/cart" />
        }
        return (
            <div>
                <NavBar />
                <div style={{ padding: '100px 50px' }}>
                    <div style={styles.container}>
                        <div style={styles.imageDiv}>
                            <Image style={styles.image} src={this.state.product ? this.state.product.link_foto : ""} />
                            <h3 style={styles.h3}>{this.state.product ? this.state.product.nama : ""}</h3>
                            <h4 style={styles.h4}>{this.state.product ? `Rp ${(this.state.product.harga).toLocaleString()}` : ""}</h4>
                            <h4 style={styles.h4}>{this.state.product ? this.state.product.satuan : ""}</h4>
                            <h4 style={styles.h4}>{this.state.product ? `Stok: ${this.state.product.stok}` : ""}</h4>
                            {this.props.username 
                            ?
                            <div style={styles.controlDiv}>
                                <div style={styles.inputJumlahStokDiv}>
                                    <Button variant="primary" disabled={this.state.qty === 1 ? true : false} onClick={() => this.setState({ qty: this.state.qty - 1 })}>-</Button>
                                    <Form.Control 
                                        style={styles.form} 
                                        type="text" 
                                        value={this.state.qty}
                                        onChange={(e) => this.onChangeQty(e)}
                                    />
                                    <Button variant="primary" disabled={this.state.qty === this.state.max ? true : false} onClick={() => this.setState({ qty: this.state.qty + 1 })}>+</Button>
                                </div>
                                <Button style={{ width: '10vw', marginBottom: '30px' }} variant="success" onClick={this.onCheckout}>Add to Cart</Button>
                            </div>
                            :
                            <div></div>
                            }
                            
                        </div>
                        <div style={styles.textDiv}>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Kategori</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.kategori : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Deskripsi</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.deskripsi : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Indikasi Umum</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.indikasi_umum : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Komposisi</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.komposisi : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Dosis</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.dosis : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Aturan Pakai</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.aturan_pakai : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Kontra Indikasi</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.kontra_indikasi : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Perhatian</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.perhatian : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Efek Samping</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.efek_samping : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Segmentasi</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.segmentasi : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Kemasan</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.kemasan : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>Manufaktur</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.manufaktur : ""}</p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px'}}>No. Registrasi</h5>
                                <p style={{ textAlign: 'justify' }}>{this.state.product ? this.state.product.no_registrasi : ""}</p>
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
        height: '150vh',
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#343892'
    },
    textDiv: {
        flex: 3,
        padding: '0 20px'
    },
    controlDiv: {
        marginTop: '30px',
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
        width: '4vw',
        textAlign: 'center'
    },
    textDescription: {
        borderBottom: '1px solid #80F1B2',
        marginBottom: '1rem',
        color: '#343892'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role,
        iduser:state.userReducer.id,
        cart: state.userReducer.cart
    }
}

export default connect(mapStateToProps, {addCart})(DetailProductPage)
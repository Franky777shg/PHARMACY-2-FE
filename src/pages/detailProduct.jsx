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
        // if (!this.props.username){
        //     return this.setState({toLogin: true})
        // }

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
        // console.log(this.props.iduser)
        // this.props.addCart(this.props.iduser,obj)
        Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
            .then(res => {
                // console.log(res.data) //hasilnya object lngsg {cart:{idproduk:}}
                // console.log(res.data.length === undefined)
                // console.log(res.data.cart.length)
                // console.log(res.data.cart.length === 0)

                console.log(obj)
                let tempCart = []
                let list = []
                let checkName = false

                if (res.data.cart.length === 0) {
                    console.log("nul")

                    if (obj.qty > obj.dataproduk.stok) {
                        //comment klo qty lebih dr stock
                        obj.qty = obj.dataproduk.stok
                        console.log(obj.qty)
                    }

                    tempCart.push({ produkdibeli: obj.dataproduk, qty: obj.qty, iduser: this.props.iduser })

                    // console.log({ cart: tempCart })
                    Axios.post(`http://localhost:2000/transaction/addnew-cart/${this.props.iduser}`, { cart: tempCart })
                        .then(res => {
                            console.log(res.data)
                            Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
                                .then(res1 => {
                                    console.log(res1.data.cart)
                                    this.setState({toCart:true})
                                    // return dispatch({
                                    //     type: 'CART',
                                    //     // payload: [res1.data, { produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser }]
                                    //     payload: res1.data.cart
                                    // })
                                })
                        })
                }
               else if (res.data.cart.length !== 0) {
                    //logic extract "name" dari object2 di res.data.cart , save di list unique names & index. 
                //    console.log(res.data.cart)
                //    console.log([res.data.cart])
                    tempCart = res.data.cart
                    let ii = null
                    tempCart.forEach((item, index) => {
                        // console.log(item)
                        // console.log(item.nama)
                        // console.log(item[index])
                        // console.log(item[index].nama)
                            list.push(item.nama)
                    })
                    //compare data.name dengan list of unique names dari res.data.cart
                    // console.log(list)
                    // console.log(tempCart)
                    // console.log(obj.dataproduk.nama)

                    list.forEach((item,index) => {
                        console.log(item)
                        if (item === obj.dataproduk.nama) {
                            //push logic becomes tempCart[i].quantity += data.quantity; tempCart[i].totalPrice = tempCart[i].price * tempCart[i].quantity
                            // console.log(tempCart[index])
                            // console.log(tempCart[index].qty_beli) 
                            // console.log(item[listi[index]])
                            // console.log(tempCart)
                            let newQty = tempCart[index].qty_beli + obj.qty
                            // tempCart[item[0]].qty += data.qty
                            if (newQty > obj.dataproduk.stok) {
                                //comment klo qty lebih dr stock
                                newQty = obj.dataproduk.stok
                            }
                            // console.log(obj.dataproduk.stok, newQty)
                            tempCart[index].qty_beli = newQty
                            // ii.push(index)
                            ii = index
                            checkName = true
                        }
                    })
                    if (checkName ==false) {
                        if (obj.dataproduk.qty_beli > obj.dataproduk.stok) {
                            //comment klo qty lebih dr stock
                            obj.dataproduk.qty_beli = obj.dataproduk.stok
                        }
                        tempCart.push({produkdibeli: obj.dataproduk, qty: obj.qty, iduser: this.props.iduser})
                        console.log({ cart: tempCart })
                        Axios.patch(`http://localhost:2000/transaction/add-cart/${this.props.iduser}`, { cart: tempCart })
                            .then(res => {
                                console.log(res.data)
                                Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
                                    .then(res1 => {
                                        console.log(res1.data.cart)
                                        this.setState({toCart:true})
                                        // return dispatch({
                                        //     type: 'CART',
                                        //     // payload: [res1.data, { produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser }]
                                        //     payload: res1.data.cart
                                        // })
                                    })
                            })
                    }
                    else if (checkName ==true) {
                        if (obj.dataproduk.qty_beli > obj.dataproduk.stok) {
                            //comment klo qty lebih dr stock
                            obj.dataproduk.qty_beli = obj.dataproduk.stok
                        }
                        tempCart.push({index: ii})
                        // console.log({ cart: tempCart})
                        Axios.patch(`http://localhost:2000/transaction/addqty-cart/${this.props.iduser}`, { cart: tempCart })
                            .then(res => {
                                // console.log(res.data)
                                Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
                                    .then(res1 => {
                                        console.log(res1.data.cart)
                                        this.setState({toCart:true})
                                        // return dispatch({
                                        //     type: 'CART',
                                        //     // payload: [res1.data, { produkdibeli: obj.dataproduk, qty: obj.qty, iduser: iduser }]
                                        //     payload: res1.data.cart
                                        // })
                                    })
                            })
                    }
                }



                //     console.log(tempCart)

                //     Axios.patch(`http://localhost:2000/transaction/add-cart/${iduser}`, { cart: tempCart })
                //         .then(res => {
                //             console.log(res.data)
                //             Axios.get(`http://localhost:2000/transaction/get-cart/${iduser}`)
                //                 .then(res1 => {
                //                     console.log(res1.data)
                //                     return dispatch({
                //                         type: 'CART',
                //                         payload: res1.data
                //                     })
                //                 })
                //         })
            })
        console.log(this.props.cart)

        // this.setState({toCart:true})
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
        }
        else if (this.state.toCart) {
            return <Redirect to="/cart" />
        }
        return (
            <div>
                <NavBar />
                <div style={{ padding: '100px 50px' }}>
                    <div style={styles.container}>
                        <div style={styles.imageDiv}>
                            <Image style={styles.image} src={this.state.product ? "http://localhost:2000/" + this.state.product.link_foto : ""} />
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
        display: 'flex',
        marginTop: '10vh'
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
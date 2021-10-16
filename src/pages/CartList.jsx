import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import {
    Table,
    Image,
    Button,
    FormControl,
    Form,
    Modal
} from 'react-bootstrap'
import { delCart, saveCart, onCheckout } from '../redux/actions'
import Axios from 'axios';
class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indexEdit: null,
            qty: null,
            error: [false, ""],
            askPass: false,
            toHistory: false,
            visibility: false,
            rendercart: [],
            stockProd: null
        }
    }
    fetchData = () => {
        Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                console.log(res.data.cart.qty_beli)
                this.setState({ qty: res.data.cart.qty_beli, rendercart: res.data.cart })
                console.log(this.state.qty)
                console.log(this.state.rendercart)
                // console.log(this.state.users[0].username)
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.fetchData()
    }
    showTableHead = () => {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>{this.state.visibility ? <i class="fas fa-sort-alpha-up" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={this.onSortNameASC}></i> : <i class="fas fa-sort-alpha-down" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={this.onSortNameDESC}></i>}Name</th>
                    <th onClick={this.onSortPrice}>Price</th>
                    <th>Quantity</th>
                    <th><i class="fas fa-sort-amount-up" style={{ marginRight: '10px' }} onClick={this.onSortTotalPrice}></i>Total Price</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }
    onSortNameASC = () => {
        // let tempvisibility = visibility
        this.setState({ visibility: !this.state.visibility })

        this.props.cart.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        console.log(this.props.cart)

        this.showTableBody()
        // let list = []
        // tempCart.forEach((item,index) => {
        //     list.push({"name": item.name, "index": index})
        // })
        // list.sort(function(a, b) {
        //     var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        //     var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        //     if (nameA < nameB) {
        //       return -1;
        //     }
        //     if (nameA > nameB) {
        //       return 1;
        //     }

        //     // names must be equal
        //     return 0;
        //   });
        // console.log(list)

    }
    onSortNameDESC = () => {
        // let tempvisibility = visibility
        this.setState({ visibility: !this.state.visibility })

        this.props.cart.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }

            // names must be equal
            return 0;
        });
        console.log(this.props.cart)

        this.showTableBody()

    }
    onSortPrice = () => {
        this.props.cart.sort(function (a, b) {
            var priceA = a.price.toLocaleString(); // ignore upper and lowercase
            var priceB = b.price.toLocaleString(); // ignore upper and lowercase
            if (priceA < priceB) {
                return -1;
            }
            if (priceA > priceB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        console.log(this.props.cart)

        console.log('sortprice')
        this.showTableBody()
    }
    onSortTotalPrice = () => {
        this.props.cart.sort(function (a, b) {
            var priceA = a.price * a.qty; // ignore upper and lowercase
            var priceB = b.price * b.qty; // ignore upper and lowercase
            if (priceA < priceB) {
                return -1;
            }
            if (priceA > priceB) {
                return 1;
            }

            // names must be equal
            return 0;
        });


        console.log('sorttotalprice')
        this.showTableBody()
        console.log(this.props.cart)
        console.log(this.props.cart[0])
    }
    showTableBody = () => {
        console.log(this.props.cart)
        console.log(this.state.rendercart)
        // console.log(this.props.cart.product_image)
        const { qty } = this.state
        return (
            <tbody>
                {this.state.rendercart ? this.state.rendercart.map((item, index) => {
                    // console.log(item.cart.product_image)
                    // console.log(item)
                    // console.log(item.cart)
                    if (index === this.state.indexEdit) {
                        // if (index === 0) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Image src={item.product_image ? `http://localhost:2000/${item.product_image}` : item.product_image} style={{ width: '100px' }} rounded /></td>
                                <td>{item.nama}</td>
                                <td>IDR {item.harga.toLocaleString()}</td>
                                <td>
                                    <div style={styles.inputEdit}>

                                        <Button variant="outline-light" onClick={this.onMinus} disabled={item.qty_beli === 1 ? true : false}><i className="fas fa-minus"></i></Button>
                                        <FormControl
                                            style={{ width: '40%' }}
                                            defaultValue={item.qty_beli}
                                            // placeholder={item.qty_beli}
                                            ref="kuantitas"
                                            // onChange={(e) => this.onChangeQty(e, item.idproduk)} 
                                            onChange={(e) => this.onChangeQty(e, item.idproduk, item.qty_beli)}
                                        />
                                        <Button variant="outline-light" onClick={this.onPlus} disabled={item.qty_beli === this.state.stockProd ? true : false}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </td>
                                <td>IDR {(item.total_harga).toLocaleString()}</td>
                                <td>
                                    <Button variant="outline-light" className="mr-2" onClick={() => this.onSave(index)}>Save</Button>
                                    <Button variant="outline-dark" style={{ backgroundColor: '#f6f6f6', color: '#000051' }} onClick={() => this.setState({ indexEdit: null })}>Cancel</Button>
                                </td>
                            </tr>
                        )
                        // }
                    }
                    // if (index === 0) {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><Image src={item.product_image ? `http://localhost:2000/${item.product_image}` : item.product_image} style={{ width: '70px' }} rounded /></td>
                            <td>{item.nama}</td>
                            <td>IDR {item.harga ? item.harga.toLocaleString() : item.harga}</td>
                            <td>{item.qty_beli}</td>
                            <td>IDR {(item.total_harga).toLocaleString()}</td>
                            <td>
                                <Button variant="outline-light" style={{ backgroundColor: '#6e7aba' }} onClick={() => this.onEdit(index, item.qty_beli, item.idproduk, item.order_number)} className="mr-2">Edit</Button>
                                <Button variant="outline-light" onClick={() => this.onDelete(item.idproduk, item.order_number)}>Delete</Button>
                            </td>
                        </tr>
                    )
                    // }
                })
                    : <div></div>}
            </tbody>
        )
    }

    onDelete = (idprod, ordernum) => {
        let ordernumber = { order_number: ordernum }
        this.props.delCart(this.props.iduser, idprod, ordernumber)
        console.log(this.props.iduser)
        console.log(idprod)
        console.log(ordernum)
        this.fetchData()
    }
    onEdit = (index, q, idprod, on) => {
        console.log(q)
        let beli = q
        let obj = { order_number: on, idproduk: idprod }
        // this.setState({ indexEdit: index})
        this.setState({ indexEdit: index })
        Axios.get(`http://localhost:2000/transaction/get-cartqty/${this.props.iduser}`, obj)
            .then(res => {
                console.log(res)
                this.setState({ qty: res.data.qty_beli })
            })
        // this.setState({ qty: beli })
        console.log(this.state.qty)
        console.log(this.props.cart)
    }
    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }
    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }
    onChangeQty = (e, idproduk, q) => {
        Axios.get(`http://localhost:2000/product/detail-product/${idproduk}`)
            .then(res => {
                console.log(res)
                console.log(res.data.stok)
                this.setState({ stockProd: res.data.stok })
                console.log(this.state.stockProd)
            })

        let beli = q
        // this.setState({qty: q})
        console.log(this.state.qty)
        let value = +e.target.value
        if (value <= 1) {
            this.setState({ qty: 1 })
        } else if (value > this.state.stockProd) {
            this.setState({ qty: this.state.stockProd })
        } else {
            this.setState({ qty: value })
        }

    }
    onSave = (index) => {
        this.props.saveCart(this.props.iduser, index, this.state.qty)
        this.setState({ indexEdit: null })
        // this.fetchData()
    }

    onCheckout = () => {
        if (this.props.cart.length === 0) {
            return this.setState({ error: [true, "Your Cart is Empty!"] })
        }
        this.setState({ askPass: true })
    }

    onOKpass = () => {
        //authorize untuk password user
        if (this.refs.passwordUser.value !== this.props.password) {
            return this.setState({ error: [true, "Your password doesn't match"] })
        }

        //siapkan data yang mau di push ke history
        let history = {
            idUser: this.props.id,
            username: this.props.username,
            time: new Date().toLocaleString(),
            products: this.props.cart
        }

        this.props.checkout(this.props.iduser, history)
        this.setState({ askPass: false, toHistory: true })
    }

    render() {
        const { error, askPass, toHistory } = this.state

        if (!this.props.username) {
            return <Redirect to='/login' />
        } else if (toHistory) {
            return <Redirect to='history' />
        }

        console.log(this.props.cart)
        // console.log(this.props.a)

        return (
            <>
                <NavBar />
                <div style={{ padding: '1%', minHeight: '100vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10vh' }}>
                        <h1 style={{ marginTop: '10vh', color: '#000051' }}>Cart Page</h1>
                        <div style={{ backgroundColor: '#000051', color: 'white', borderRadius: '5px' }}><Button variant="outline-light" onClick={this.onCheckout}>Checkout</Button></div>
                    </div>
                    <Table style={styles.table} striped bordered hover variant="dark" style={{ backgroundColor: '#000051' }}>
                        {this.showTableHead()}
                        {this.showTableBody()}
                    </Table>
                    <Modal show={error[0]} onHide={() => this.setState({ error: [false, ""] })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{error[1]}</Modal.Body>
                        <Modal.Footer>
                            <Button style={{ backgroundColor: '#000051' }} onClick={() => this.setState({ error: [false, ""] })}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={askPass} onHide={() => this.setState({ askPass: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Please input yout password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl
                                style={{ backgroundColor: '#000051' }}
                                placeholder="Input Here..."
                                ref="passwordUser"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={this.onOKpass}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }
}

const styles = {
    table: {
        textAlign: 'center'
    },
    inputEdit: {
        display: 'flex',
        width: '60%',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        cart: state.userReducer.cart,
        iduser: state.userReducer.id,
        password: state.userReducer.password
    }
}


export default connect(mapStateToProps, { delCart, saveCart, onCheckout })(CartPage)

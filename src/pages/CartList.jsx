import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import {
    Table,
    Image,
    Button,
    FormControl,
    Form,
    Modal, Alert
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
            stockProd: null,
            total_bayar: null,
            inputOrder:[]
        }
    }
    fetchData = () => {
        Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
            .then(res => {
                console.log(res.data)
                // console.log(res.data.cart.qty_beli)
                this.setState({ rendercart: res.data.cart })
                console.log(this.state.rendercart)
                // console.log(this.state.rendercart[0].order_number)
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

        this.state.rendercart.sort(function (a, b) {
            var nameA = a.nama.toUpperCase(); // ignore upper and lowercase
            var nameB = b.nama.toUpperCase(); // ignore upper and lowercase
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

        this.state.rendercart.sort(function (a, b) {
            var nameA = a.nama.toUpperCase(); // ignore upper and lowercase
            var nameB = b.nama.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }

            // names must be equal
            return 0;
        });
        // console.log(this.props.cart)

        this.showTableBody()

    }
    onSortPrice = () => {
        this.state.rendercart.sort(function (a, b) {
            var priceA = a.total_harga.toLocaleString(); // ignore upper and lowercase
            var priceB = b.total_harga.toLocaleString(); // ignore upper and lowercase
            if (priceA < priceB) {
                return -1;
            }
            if (priceA > priceB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        // console.log(this.props.cart)

        console.log('sortprice')
        this.showTableBody()
    }
    onSortTotalPrice = () => {
        this.state.rendercart.sort(function (a, b) {
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
        // console.log(this.props.cart)
    }
    showTableBody = () => {
        // console.log(this.props.cart)
        // console.log(this.state.rendercart)
        const { qty } = this.state
        // this.fetchData()
        return (
            <tbody>
                {/* {this.props.cart ? this.fetchData() : null} */}
                {this.state.rendercart ? this.state.rendercart.map((item, index) => {
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

                                        <Button variant="outline-light" onClick={this.onMinus} disabled={this.state.qty === 1 ? true : false}><i className="fas fa-minus"></i></Button>
                                        <FormControl
                                            style={{ width: '40%' }}
                                            defaultValue={item.qty_beli}
                                            // placeholder={item.qty_beli}
                                            value={this.state.qty}
                                            ref="kuantitas"
                                            onChange={(e) => this.onChangeQty(e, item.idproduk, item.qty_beli)}
                                        />
                                        <Button variant="outline-light" onClick={this.onPlus} disabled={this.state.qty === this.state.stockProd ? true : false}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </td>
                                <td>IDR {(item.total_harga).toLocaleString()}</td>
                                <td>
                                    <Button variant="outline-light" className="mr-2" onClick={() => this.onSave(index, item.nama, item.idproduk, item.harga, item.order_number)}>Save</Button>
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
        let ordernumber = { order_number: ordernum, iduser: this.props.iduser }
        this.props.delCart(this.props.iduser, idprod, ordernumber)
        console.log(this.props.iduser)
        console.log(idprod)
        console.log(ordernum)
        this.fetchData()
    }
    onEdit = (index, q, idprod, on) => {
        // console.log(q)
        let beli = q
        let obj = { order_number: on, idproduk: idprod }
        // this.setState({ indexEdit: index})
        this.setState({ indexEdit: index })
        Axios.patch(`http://localhost:2000/transaction/get-cartqty/${this.props.iduser}`, obj)
            .then(res => {
                console.log(res.data[0].qty_beli)
                this.setState({ qty: res.data[0].qty_beli })
                console.log(this.state.qty)
            })
        // this.setState({ qty: beli })
        // console.log(this.props.cart)
    }
    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
        // console.log(this.state.qty)
    }
    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
        // console.log(this.state.qty)
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
        this.fetchData()

    }
    onSave = (index, nama, idproduk, harga, order_number) => {
        let tempCart = {
            nama: nama,
            idproduk: idproduk,
            qty_save: this.state.qty,
            harga: harga,
            order_number: order_number
        }
        this.props.saveCart(this.props.iduser, this.state.qty, tempCart)
        this.setState({ indexEdit: null })
        console.log(this.props.cart)
        this.fetchData()
    }

    onCheckout = () => {
        console.log(this.state.rendercart.length)
        if (this.state.rendercart.length === 0) {
            return this.setState({ error: [true, "Your Cart is Empty!"] })
        }
        let tempArr = this.state.inputOrder

        Axios.get(`http://localhost:2000/transaction/total-cart/${this.props.iduser}`)
            .then(res => {
                // console.log(res.data.carttotal[0].total_bayar)
                this.setState({ total_bayar: (res.data.carttotal[0].total_bayar).toLocaleString() })
                console.log(this.state.total_bayar)
            })
            // .catch(err => console.log(err))

            .then(result1 => {
                Axios.get(`http://localhost:2000/transaction/get-cart/${this.props.iduser}`)
                    .then(result => {
                        console.log(result.data)
                        // console.log(res.data.cart.qty_beli)
                        let obj = {
                            ...result.data,
                            // qty: res.data.cartqty_beli,
                            // order_number: res.data.order_number
                        }
                        tempArr.push(obj)
                        // console.log(tempArr)
                        this.setState({ inputOrder: tempArr })
                        console.log(this.state.inputOrder)
                    })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ askPass: true })
    }

    onOKpass = () => {
        //authorize untuk password user
        // if (this.refs.passwordUser.value !== this.props.password) {
        //     return this.setState({ error: [true, "Your password doesn't match"] })
        // }


        this.state.inputOrder.map((item,index) => {
            console.log(item)
            // console.log(item.idproduk)
            let data = {
                order_number: item.cart[index].order_number,
                idproduk: item.cart[index].idproduk,
                nama: item.cart[index].nama,
                qty_beli: item.cart[index].qty_beli,
                harga: item.cart[index].harga
            }
            console.log(data)
            console.log(data.idproduk)
            Axios.get(`http://localhost:2000/product/detail-product/${data.idproduk}`)
            .then(res => {
                // console.log(res)
                console.log(res.data.stok)
                let newStok = res.data.stok - item.cart[index].qty_beli
                let databaru = {
                    idproduk: item.cart[index].idproduk,
                    newstok: newStok
                }
            console.log(databaru)
            Axios.patch(`http://localhost:2000/product/updateqty/${data.idproduk}`, databaru)
                .then(() => {
                    console.log("berhasil update stock")
                //     Axios.patch(`http://localhost:2000/updateStokResep`, data2)
                //         .then(() => {
                //             let data3 = {
                //                 statusBaru: 'Waiting For Payment',
                //                 order_number: this.state.dataOrder.order_number
                //             }
                //             Axios.post(`http://localhost:2000/updateStatusResep`, data3)
                //                 .then(() => {
                //                     this.onTransaksiObatResep()
                //                     this.setState({ showModal: false })
                //                 })
                //                 .catch(err => console.log('error update status resep'))
                //         })
                //         .catch(err => console.log('error update stok resep'))
                })
                .catch(err => console.log('error update stok'))
            })
        })

        //siapkan data yang mau di push ke history
        let objhistory = {
            iduser: this.props.iduser,
            username: this.props.username,
            date: new Date().toLocaleString(),
            isicart: this.state.rendercart,
            order_number: this.state.rendercart[0].order_number,
            total_bayar: this.state.total_bayar
            // isicart: this.props.cart,
        }

        this.props.onCheckout(this.props.iduser, objhistory)
        this.setState({ askPass: false, toHistory: true })
    }

    tableCheckout = () => {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>{this.state.visibility ? <i class="fas fa-sort-alpha-up" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={this.onSortNameASC}></i> : <i class="fas fa-sort-alpha-down" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={this.onSortNameDESC}></i>}Name</th>
                    <th onClick={this.onSortPrice}>Price</th>
                    <th>Quantity</th>
                    <th><i class="fas fa-sort-amount-up" style={{ marginRight: '10px' }} onClick={this.onSortTotalPrice}></i>Total Price</th>
                </tr>
            </thead>

        )
    }
    showTotalCheckout = () => {
        // console.log(this.props.cart)
        // console.log(this.state.rendercart)
        const { qty } = this.state

        // this.fetchData()
        return (
            <tbody>
                {/* {this.props.cart ? this.fetchData() : null} */}
                {this.state.rendercart ? this.state.rendercart.map((item, index) => {
                    return (

                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.nama}</td>
                            <td>IDR {item.harga ? item.harga.toLocaleString() : item.harga}</td>
                            <td>{item.qty_beli}</td>
                            <td>IDR {(item.total_harga).toLocaleString()}</td>
                        </tr>

                    )
                    // }
                })
                    : <div></div>}
            </tbody>
        )
    }

    render() {
        const { error, askPass, toHistory } = this.state

        if (!this.props.username) {
            return <Redirect to='/login' />
        } else if (toHistory) {
            return <Redirect to='/history' />
        }

        // console.log(this.props.cart)
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
                            <Button style={{ backgroundColor: '#000051', color: 'white' }} onClick={() => this.setState({ error: [false, ""] })}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={askPass} dialogClassName="modal-90w" fullscreen={true} aria-labelledby="example-custom-modal-styling-title" onHide={() => this.setState({ askPass: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Order Summary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <FormControl
                                style={{ border: '1px solid #80F1B2', color: '#343892' }}
                                placeholder="Input Here..."
                                ref="passwordUser"
                            /> */}
                            <div style={styles.contForm}>
                                <Table>
                                    {this.tableCheckout()}
                                    {this.showTotalCheckout()}
                                </Table>
                                <hr />
                                <Alert variant="light">
                                    The amount you have to pay: IDR <bold>{this.state.total_bayar}</bold>
                                </Alert>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ backgroundColor: '#000051', color: 'white' }} onClick={this.onOKpass} as={Link} to="/history">
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
    },
    contForm: {
        // width: '45vw',
        height: '70vh',
        marginTop: '2vh',
        border: '1px solid #80F1B2',
        padding: '2%',
        borderRadius: '10px',
        justifyContent: 'center', backgroundColor: '#ffffff'
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

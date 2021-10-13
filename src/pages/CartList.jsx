import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
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
            visibility: false
        }
    }
    fetchData = () => {
        let token = localStorage.getItem("token")
        Axios.get(`http://localhost:2000/user/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ users: res.data })
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
                    <th>{this.state.visibility ? <i class="fas fa-sort-alpha-up" style={{marginRight: '15px',cursor:'pointer'}} onClick={this.onSortNameASC}></i> : <i class="fas fa-sort-alpha-down"  style={{marginRight: '15px',cursor:'pointer'}} onClick={this.onSortNameDESC}></i>}Name</th>
                    <th onClick={this.onSortPrice}>Price</th>
                    <th>Quantity</th>
                    <th><i class="fas fa-sort-amount-up" style={{marginRight:'10px'}} onClick={this.onSortTotalPrice}></i>Total Price</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }
    onSortNameASC = () => {
        // let tempvisibility = visibility
        this.setState({visibility: !this.state.visibility})

        this.props.cart.sort(function(a, b) {
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
        this.setState({visibility: !this.state.visibility})

        this.props.cart.sort(function(a, b) {
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
        this.props.cart.sort(function(a, b) {
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
        this.props.cart.sort(function(a, b) {
            var priceA = a.price*a.qty; // ignore upper and lowercase
            var priceB = b.price*b.qty; // ignore upper and lowercase
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
    }
    showTableBody = () => {
        const { qty } = this.state
        return (
            <tbody>
                {this.props.cart.map((item, index) => {
                    if (index === this.state.indexEdit) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Image src={item.image} style={{ width: '100px' }} rounded /></td>
                                <td>{item.name}</td>
                                <td>IDR {item.price.toLocaleString()}</td>
                                <td>
                                    <div style={styles.inputEdit}>

                                        <Button variant="outline-light" onClick={this.onMinus} disabled={qty === 1 ? true : false}><i className="fas fa-minus"></i></Button>
                                        <FormControl
                                            style={{ width: '40%' }}
                                            value={this.state.qty}
                                            onChange={(e) => this.onChangeQty(e, item.stock)} />
                                        <Button variant="outline-light" onClick={this.onPlus} disabled={qty === item.stock ? true : false}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </td>
                                <td>IDR {(item.price * item.qty).toLocaleString()}</td>
                                <td>
                                    <Button variant="outline-light" className="mr-2" onClick={() => this.onSave(index)}>Save</Button>
                                    <Button variant="outline-dark" style={{backgroundColor:'#f6f6f6',color:'#000051'}} onClick={() => this.setState({ indexEdit: null })}>Cancel</Button>
                                </td>
                            </tr>
                        )
                    }
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><Image src={item.image} style={{ width: '70px' }} rounded /></td>
                            <td>{item.name}</td>
                            <td>IDR {item.price.toLocaleString()}</td>
                            <td>{item.qty}</td>
                            <td>IDR {(item.price * item.qty).toLocaleString()}</td>
                            <td>
                                <Button variant="outline-light" style={{backgroundColor:'#6e7aba'}} onClick={() => this.onEdit(index)} className="mr-2">Edit</Button>
                                <Button variant="outline-light" onClick={() => this.onDelete(index)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    onDelete = (index) => {
        this.props.delCart(this.props.id, index)
        console.log(this.props.id)
        console.log(index)
    }
    onEdit = (index) => {
        this.setState({ indexEdit: index, qty: this.props.cart[index].qty })
        console.log(this.props.cart)
    }
    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }
    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }
    onChangeQty = (e, stockProd) => {
        let value = +e.target.value
        if (value <= 1) {
            this.setState({ qty: 1 })
        } else if (value > stockProd) {
            this.setState({ qty: stockProd })
        } else {
            this.setState({ qty: value })
        }

    }
    onSave = (index) => {
        this.props.saveCart(this.props.id, index, this.state.qty)
        this.setState({ indexEdit: null })
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

        this.props.checkout(this.props.id, history)
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
                <div style={{ padding: '1%', minHeight: '100vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10vh' }}>
                        <h1 style={{ marginTop: '10vh',color:'#000051' }}>Cart Page</h1>
                       <div style={{backgroundColor:'#000051',color:'white',borderRadius:'5px'}}><Button variant="outline-light" onClick={this.onCheckout}>Checkout</Button></div>
                    </div>
                    <Table style={styles.table} striped bordered hover variant="dark" style={{backgroundColor:'#000051'}}>
                        {this.showTableHead()}
                        {this.showTableBody()}
                    </Table>
                    <Modal show={error[0]} onHide={() => this.setState({ error: [false, ""] })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{error[1]}</Modal.Body>
                        <Modal.Footer>
                            <Button style={{backgroundColor:'#000051'}} onClick={() => this.setState({ error: [false, ""] })}>
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
                                style={{backgroundColor:'#000051'}}
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
        id: state.userReducer.id,
        password: state.userReducer.password
    }
}


export default connect(mapStateToProps, { delCart, saveCart, onCheckout })(CartPage)

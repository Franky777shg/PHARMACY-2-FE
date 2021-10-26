import React from 'react'
import Barchart from '../components/barchart';
import { Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import {
    Button,
    Form,
    Accordion,
    Table,
    Image
} from 'react-bootstrap'
import Axios from 'axios';

const URL_API = "https://api-pharmacy-2.purwadhikafs2.com/admin"


class SalesPage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            navigationButton: "Bought Items",
            dataBoughtItems: [],
            detailDataBoughtItems: [],
            totalQtyPerTrans: 0,
            dataTransactionsPerUsers: [],
            detailDataTransactionPerUser: []
        }
    }

    componentDidMount() {
        let month = new Date().getMonth() + 1
        
        let data = {
            month
        }

        let tempArr = []

        Axios.post(`${URL_API}/getDataBoughtItemsTransaksi`, data)
            .then(res => {
                this.setState({ dataBoughtItems: res.data })
                this.state.dataBoughtItems.map(item => {
                    let data1 = {
                        order_number: item.order_number
                    }
                    Axios.post(`${URL_API}/getDetailDataBoughtItemsTransaksi`, data1)
                        .then(res1 => {
                            tempArr.push(...res1.data)
                            this.setState({ detailDataBoughtItems: tempArr })
                        })
                })
            })
            .catch(err => {
                console.log('gagal get data bought items')
            })
    }
    
    onBoughtItems = () => {
        let month = new Date().getMonth() + 1
        
        let data = {
            month
        }

        let tempArr = []

        Axios.post(`${URL_API}/getDataBoughtItemsTransaksi`, data)
            .then(res => {
                this.setState({ 
                    dataBoughtItems: res.data,
                    navigationButton: "Bought Items"
                })
                this.state.dataBoughtItems.map(item => {
                    let data1 = {
                        order_number: item.order_number
                    }
                    Axios.post(`${URL_API}/getDetailDataBoughtItemsTransaksi`, data1)
                        .then(res1 => {
                            tempArr.push(...res1.data)
                            this.setState({ detailDataBoughtItems: tempArr })
                        })
                })
            })
            .catch(err => {
                console.log('gagal get data bought items')
            })
    }

    onTransactionsPerUser = () => {
        Axios.get(`${URL_API}/getDataTransactionPerUser`)
            .then(res => {
                Axios.get(`${URL_API}/getDetailDataTransactionPerUser`)
                    .then(res1 => {
                        this.setState({ 
                            dataTransactionsPerUsers: res.data,
                            detailDataTransactionPerUser: res1.data,
                            navigationButton: "Transactions Per Users" 
                        })
                    })
                    .catch(err => {
                        console.log('gagal get detail data transaction per user')
                    })
            })
            .catch(err => {
                console.log('gagal get data transaction per user')
            })
    }

    onGraphs = () => {
        this.setState({ navigationButton: "Graphs" })
    }

    onFindBoughtItems = () => {
        let month = this.refs.monthNav.value

        let data = {
            month
        }

        let tempArr = []

        Axios.post(`${URL_API}/getDataBoughtItemsTransaksi`, data)
            .then(res => {
                this.setState({ 
                    dataBoughtItems: res.data,
                    navigationButton: "Bought Items"
                })
                this.state.dataBoughtItems.map(item => {
                    let data1 = {
                        order_number: item.order_number
                    }
                    Axios.post(`${URL_API}/getDetailDataBoughtItemsTransaksi`, data1)
                        .then(res1 => {
                            tempArr.push(...res1.data)
                            this.setState({ detailDataBoughtItems: tempArr })
                        })
                })
            })
            .catch(err => {
                console.log('gagal get data bought items')
            })
    }

    countTotalItems = (number) => {
        let totalItems = 0

        this.state.detailDataBoughtItems.map(item => {
            if (item.order_number === number) {
                totalItems = totalItems + item.qty_beli
            }
        })

        return totalItems
    }

    countAllTotalItems = () => {
        let totalItems = 0

        this.state.detailDataBoughtItems.map(item => {
            totalItems = totalItems + item.qty_beli
        })

        return totalItems
    }

    onSearchTransById = (e) => {
        let id = +e.target.value

        let data = {
            id
        }

        Axios.post(`${URL_API}/getDataTransactionPerUserById`, data)
            .then(res => {
                Axios.post(`${URL_API}/getDetailDataTransactionPerUserById`, data)
                    .then(res1 => {
                        this.setState({ 
                            dataTransactionsPerUsers: res.data,
                            detailDataTransactionPerUser: res1.data
                        })
                    })
                    .catch(err => {
                        console.log('gagal get detail data transaction per user by id')
                    })
            })
            .catch(err => {
                console.log('gagal get data transaction per user by id')
            })
    }

    render() {
        if (this.props.role === 'user') {
            return <Redirect to='/' />
        }
        return (
            <div>
                <NavBar />
                <div style={{ marginTop: '84px', padding: '0 28px 28px' }}>
                    <div style={styles.divButtonNav}> 
                        <Button variant="primary" disabled={this.state.navigationButton === "Bought Items" ? true : false} onClick={this.onBoughtItems}>Bought Items</Button>
                        <Button variant="primary" disabled={this.state.navigationButton === "Transactions Per Users" ? true : false} onClick={this.onTransactionsPerUser}>Transactions Per User</Button>
                        <Button variant="primary" disabled={this.state.navigationButton === "Graphs" ? true : false} onClick={this.onGraphs}>Graphs</Button>
                    </div>
                    {this.state.navigationButton === "Bought Items" 
                        ?
                            <div>
                                <div style={styles.divMonthNav}>
                                    <p style={{ margin: 0 }}>Month :</p>
                                    <Form.Select style={{ width: '6vw'}} ref="monthNav">
                                        <option value={new Date().getMonth() + 1}>{new Date().getMonth() + 1}</option>
                                        {(new Date().getMonth() + 1) === 1 ? null : <option value="1">1</option>}
                                        {(new Date().getMonth() + 1) === 2 ? null : <option value="2">2</option>}
                                        {(new Date().getMonth() + 1) === 3 ? null : <option value="3">3</option>}
                                        {(new Date().getMonth() + 1) === 4 ? null : <option value="4">4</option>}
                                        {(new Date().getMonth() + 1) === 5 ? null : <option value="5">5</option>}
                                        {(new Date().getMonth() + 1) === 6 ? null : <option value="6">6</option>}
                                        {(new Date().getMonth() + 1) === 7 ? null : <option value="7">7</option>}
                                        {(new Date().getMonth() + 1) === 8 ? null : <option value="8">8</option>}
                                        {(new Date().getMonth() + 1) === 9 ? null : <option value="9">9</option>}
                                        {(new Date().getMonth() + 1) === 10 ? null : <option value="10">10</option>}
                                        {(new Date().getMonth() + 1) === 11 ? null : <option value="11">11</option>}
                                        {(new Date().getMonth() + 1) === 12 ? null : <option value="12">12</option>}
                                    </Form.Select>
                                    <Button variant="outline-primary" onClick={this.onFindBoughtItems}>Find</Button>
                                </div>
                                <div style={{ marginTop: '24px'}}>
                                    <p style={{ marginBottom: '24px'}}>Total Bought Items = {this.countAllTotalItems()}</p>
                                    <Accordion>
                                        {this.state.dataBoughtItems.map((item, index) => {
                                            return (
                                                <Accordion.Item eventKey={index} key={index}>
                                                    <Accordion.Header style={styles.accordHeader}>
                                                        <p style={{ marginRight: '5vw', marginBottom: 0 }}>{index + 1}.</p>
                                                        <p style={{ marginRight: '5vw', marginBottom: 0 }}>Date: {item.date}</p>
                                                        <p style={{ marginRight: '5vw', marginBottom: 0 }}>Order Number: {item.order_number}</p>
                                                        <p style={{ marginBottom: 0 }}>Total Items: {this.countTotalItems(item.order_number)}</p>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>Product Image</th>
                                                                    <th>Product Name</th>
                                                                    <th>Quantity</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.detailDataBoughtItems.map((item1, index1) => {
                                                                    if (item.order_number === item1.order_number) {
                                                                        return (
                                                                            <tr key={index1 + 10000}>
                                                                                <td><Image style={{ width: '10vw' }} src={"https://api-pharmacy-2.purwadhikafs2.com/" + item1.product_image} /></td>
                                                                                <td>{item1.nama}</td>
                                                                                <td>{item1.qty_beli}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })}
                                                            </tbody>
                                                        </Table>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        })}
                                    </Accordion>
                                </div>
                            </div>
                        :
                            <div></div>
                    }
                    {this.state.navigationButton === "Transactions Per Users" 
                        ?
                            <div>
                                <div style={styles.divTransNav}>
                                    <p style={{ margin: 0 }}>Search By User ID :</p>
                                    <Form.Control style={{ width: '6vw'}} type="number" onChange={(e) => this.onSearchTransById(e)} />
                                    <Button variant="outline-primary" onClick={this.onTransactionsPerUser}>Show All</Button>
                                </div>
                                <Accordion style={{ marginTop: '24px'}}>
                                        {this.state.dataTransactionsPerUsers.map((item, index) => {
                                            return (
                                                <Accordion.Item eventKey={index} key={index}>
                                                    <Accordion.Header style={styles.accordHeader}>
                                                        <p style={{ marginRight: '5vw', marginBottom: 0 }}>{index + 1}.</p>
                                                        <p style={{ marginRight: '5vw', marginBottom: 0 }}>User ID: {item.iduser}</p>
                                                        <p style={{ marginRight: '5vw', marginBottom: 0 }}>Number of Transactions: {item['count(iduser)']}</p>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <th>Order Number</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.detailDataTransactionPerUser.map((item1, index1) => {
                                                                    if (item.iduser === item1.iduser) {
                                                                        return (
                                                                            <tr key={index1 + 10000}>
                                                                                <td>{item1.date}</td>
                                                                                <td>{item1.order_number}</td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })}
                                                            </tbody>
                                                        </Table>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        })}
                                    </Accordion>
                            </div>
                        :
                            <div></div>
                    }
                    {this.state.navigationButton === "Graphs" 
                        ?
                            <div>
                                <Barchart />
                            </div>
                        :
                            <div></div>
                    }
                </div>
            </div>
        )
    }
}

const styles = {
    divButtonNav: {
        width: '35vw',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px'
    },
    divMonthNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20vw',
    },
    accordHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    divTransNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '25vw',
    },
}

export default SalesPage
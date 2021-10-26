import React from 'react'
import Axios from 'axios'
import { Table, Button, InputGroup, Form } from 'react-bootstrap'

// Import Components
import NavBar from '../components/navbar'

const URL_API = "https://api-pharmacy-2.purwadhikafs2.com/admin"
//As Admin see Revenue (hasil) by filter Date, user, item --> total penghasilan

class RevenueAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            page: 1,
            revenueRes: [], //table
            revenueSat: [],
            revJuly: [], //bulan
            revSatJuly: [],
            totalRevResep: [], //total belanja_resep
            totalRevsatuan: [],
            totalRevResJuly: [],//bulan
            totalSatuanJuly: [],
            next: '', //button
            prev: '',
            revenueResep: '', //penyesuain revenue per bulan
        }
    }

    //headTABLE_function
    headTable = () => {
        return (
            <thead>
                <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>ID User</th>
                    <th>Order Number</th>
                    <th>Total Transaction</th>
                </tr>
            </thead>
        )
    }

    //button_function
    buttonNextPrev = () => {
        return (
            <div style={{ width: '30vw', height: '6vh', flexBasis: '60%', display: 'flex' }}>
                <Button style={{ marginRight: '2px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)', }} variant="warning" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
                <p style={{ margin: '1vh', marginLeft: '1vw', marginRight: '1vw' }}>Page {this.state.page} of {this.state.maxPage}</p>
                <Button style={{ marginLeft: '2px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)', }} variant="warning" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
            </div>
        )
    }

    //TOTAL_belanjaALL_RESEP
    totalRevenueResep = () => {
        Axios.post(`${URL_API}/total-revresep`)
            .then(res => {
                this.setState({ totalRevResep: res.data.Total_Belanja })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    totalRevenueSatuan = () => {
        Axios.post(`${URL_API}/total-revsatuan`)
            .then(res => {
                this.setState({ totalRevsatuan: res.data.Total_Belanja })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    onTotalResep = () => {
        let name = this.refs.name.value

        let data = {
            name,
            page: 1
        }

        Axios.post(`${URL_API}/total-revjuly`, data)
            .then(res => {
                this.setState({ totalRevResJuly: res.data.Total_Belanja})
                console.log(this.state.totalRevResJuly)
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    //TOTAL_SATUAN_PERBULAN
    onTotalSatuan = () => {
        let name = this.refs.name.value

        let data = {
            name,
            page: 1
        }

        Axios.post(`${URL_API}/total-satjuly`, data)
            .then(res => {
                this.setState({  totalSatuanJuly : res.data.Total_Belanja})
            })
            .catch(err => {
                console.log(err)
            })
    }

    //REVENUE_RESEP
    onByResep = () => {
        Axios.post(`${URL_API}/reven-resep`, { page: 1 })
            .then(res => {
                // console.log(res.data)
                this.setState({ revenueRes: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ next: 'resep', prev: 'resep' })
                this.totalRevenueResep()
                this.setState({ filter: 'allResep' })
                this.setState({ revenueResep: 'resep' })
            })
            .catch(err => {
                console.log(err)
            })

    }
    onBysatuan = () => {
        Axios.post(`${URL_API}/reven-satuan`, { page: 1 })
            .then(res => {
                // console.log(res.data)
                this.setState({ revenueSat: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ next: 'satuan', prev: 'satuan' })
                this.totalRevenueSatuan()
                this.setState({ filter: 'satuan' })
                this.setState({ revenueResep: 'satuan' })
            })
            .catch(err => {
                console.log(err)
            })
    }
    onFilterResep = () => {
        let name = this.refs.name.value

        let data = {
            name,
            page: 1
        }
        Axios.post(`${URL_API}/reven-july`, data)
            .then(res => {
                console.log(this.state.revJuly)
                this.setState({ revJuly: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ page: 1 })
                this.setState({ next: 'july', prev: 'july' })
                this.onTotalResep()
                this.setState({ filter: 'julyresep' })
                this.setState({ revenueResep: 'resep' })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ next: '', prev: '' })
    }

    // REVENUE_SATUAN_PERBULAN
    onFilterSatuan = () => {
        let name = this.refs.name.value

        let data = {
            name,
            page: 1
        }
        Axios.post(`${URL_API}/satuan-july`, data)
            .then(res => {
                this.setState({ revSatJuly: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ page: 1 })
                this.setState({ next: 'julysatuan', prev: 'julysatuan' })
                this.onTotalSatuan()
                this.setState({ filter: 'julysatuan' })
                this.setState({ revenueResep: 'satuan' })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ next: '', prev: ''})
    }

    //All Button Next
    onNext = () => {
        if (this.state.next === 'resep') {
            Axios.post(`${URL_API}/reven-resep`, { page: this.state.page + 1 })
                .then(res => {
                    this.setState({ revenueRes: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.next === 'satuan') {
            Axios.post(`${URL_API}/reven-satuan`, { page: this.state.page + 1 })
                .then(res => {
                    this.setState({ revenueSat: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.next === 'july') {
            let name = this.refs.name.value

            let data = {
                name,
                page: this.state.page + 1 
            }
    
            Axios.post(`${URL_API}/reven-july`, data)
                .then(res => {
                    this.setState({ revJuly: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.next === 'julysatuan') {
            let name = this.refs.name.value

            let data = {
                name,
                page: this.state.page + 1 
            }
    
            Axios.post(`${URL_API}/satuan-july`, data)
                .then(res => {
                    this.setState({ revSatJuly: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    //All Button Preview
    onPrev = () => {
        if (this.state.prev === 'resep') {
            Axios.post(`${URL_API}/reven-resep`, { page: this.state.page - 1 })
                .then(res => {
                    this.setState({ revenueRes: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.prev === 'satuan') {
            Axios.post(`${URL_API}/reven-satuan`, { page: this.state.page - 1 })
                .then(res => {
                    this.setState({ revenueSat: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.next === 'july') {
            let name = this.refs.name.value

            let data = {
                name,
                page: this.state.page - 1 
            }
    
            Axios.post(`${URL_API}/reven-july`, data)
                .then(res => {
                    this.setState({ revJuly: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.next === 'julysatuan') {
            let name = this.refs.name.value

            let data = {
                name,
                page: this.state.page - 1 
            }
    
            Axios.post(`${URL_API}/satuan-july`, data)
                .then(res => {
                    this.setState({ revSatJuly: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    onFilterRevenue = () => {
        if (this.state.filter === 'allResep') {
            return (
                <div>
                    <h3>Revenue Obat Resep</h3>
                    <div style={styles.paginationDiv}>
                        {this.buttonNextPrev()}
                        <div style={{ display: 'felx', flexBasis: '40%' }}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-poll"> Total</i>
                                </InputGroup.Text>
                                <InputGroup.Text id="basic-addon1" style={styles.total}>
                                    <strong>Rp. {this.state.totalRevResep.toLocaleString()},-</strong>
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        {this.headTable()}
                        <tbody>
                            {this.state.revenueRes.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.iduser}</td>
                                    <td>{item.order_number}</td>
                                    <td>{item.total_belanja}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        } else if (this.state.filter === 'satuan') {
            return (
                <div>
                    <h3>Revenue Obat Satuan</h3>
                    <div style={styles.paginationDiv}>
                        {this.buttonNextPrev()}
                        <div style={{ display: 'felx', flexBasis: '40%' }}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-poll"> Total</i>
                                </InputGroup.Text>
                                <InputGroup.Text id="basic-addon1" style={styles.total}>
                                    <strong>Rp. {this.state.totalRevsatuan.toLocaleString()},-</strong>
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        {this.headTable()}
                        <tbody>
                            {this.state.revenueSat.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.iduser}</td>
                                    <td>{item.order_number}</td>
                                    <td>{item.total_belanja}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        } else if (this.state.filter === 'julyresep') {
            return (
                <div>
                    <h3>Revenue Obat Resep, Bulan ke-{this.refs.name.value}</h3>
                    <div style={styles.paginationDiv}>
                        {this.buttonNextPrev()}
                        <div style={{ display: 'felx', flexBasis: '40%' }}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-poll"> Total</i>
                                </InputGroup.Text>
                                <InputGroup.Text id="basic-addon1" style={styles.total}>
                                    <strong>{this.state.totalRevResJuly ? `Rp. ${this.state.totalRevResJuly.toLocaleString()}` : 'NO SALE'},-</strong>
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        {this.headTable()}
                        <tbody>
                            {this.state.revJuly.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.iduser}</td>
                                    <td>{item.order_number}</td>
                                    <td>{item.total_belanja}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        } else if (this.state.filter === 'julysatuan') {
            return (
                <div>
                    <h3>Revenue Obat Satuan, Bulan ke-{this.refs.name.value}</h3>
                    <div style={styles.paginationDiv}>
                        {this.buttonNextPrev()}
                        <div style={{ display: 'felx', flexBasis: '40%' }}>
                            <InputGroup className="mb-1">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-poll"> Total</i>
                                </InputGroup.Text>
                                <InputGroup.Text id="basic-addon1" style={styles.total}>
                                    <strong>{this.state.totalSatuanJuly ? `Rp. ${this.state.totalSatuanJuly.toLocaleString()},-` : 'NO SALE'}</strong>
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>
                    <Table striped bordered hover style={styles.table}>
                        {this.headTable()}
                        <tbody>
                            {this.state.revSatJuly.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.iduser}</td>
                                    <td>{item.order_number}</td>
                                    <td>{item.total_belanja}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    render() {
        return (
            <div style={styles.cont}>
                <NavBar />
                <div style={{ display: 'flex', marginRight: '0' }}>
                    {this.onFilterRevenue()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10vh' }}>
                    <h3 style={{ marginBottom: '8vh' }}>As Admin see Revenue</h3>
                    <Button variant="warning" style={styles.btn} onClick={this.onByResep}>Revenue Obat Resep</Button>
                    <Button variant="warning" style={styles.btn} onClick={this.onBysatuan}>Revenue Obat Satuan</Button>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '28vw' }}>
                        <h4 style={{ marginBottom: '3vh' }}>Revenue by Month</h4>
                        <div style={styles.divForm}>
                            <p style={{ margin: 0, width: '5vw'}}>Filter :</p>
                            <Form.Control style={styles.filterForm} type="text" placeholder="Ex : 1" ref="name" />
                            <Button style={styles.btn2} onClick={this.state.revenueResep === 'resep' ? this.onFilterResep : this.onFilterSatuan}>Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    cont: {
        display: 'flex',
        background: "url(https://media.istockphoto.com/photos/empty-product-stand-platform-podium-with-cloud-picture-id1252597644?b=1&k=20&m=1252597644&s=170667a&w=0&h=hDkXmpVxiNFDBHiwJbkPLNUA-P_5DCEgILtHIrUiUIU=) no-repeat center",
        backgroundSize: 'cover',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        paddingLeft: '5vw',
        paddingTop: '17vh',
        paddingBottom: '16vh',

    },
    table: {
        backgroundColor: 'white',
        marginBottom: '5vh',
        width: '40vw',
    },
    btn: {
        width: '12vw',
        marginLeft: '5vw',
        marginBottom: '4vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
    },
    btn2: {
        width: '8vw',
        marginLeft:'1vw',
        backgroundColor: '#FE8F8F',
        border:'none',
        fontSize: '16px',
        color:'black',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
    },
    filterSort: {
        width: "2vw",
        backgroundColor: '#3D56B2',
        color: 'white',
    },
    paginationDiv: {
        width: '50vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2vh'
    },
    total: {
        backgroundColor: '#FE8F8F',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',

    },
    divForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: '2vw',
        marginTop: '0',
        marginLeft: '0'
    },
    filterForm: {
        width: "13vw",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
    },

    //status : done upload foto(biru) --> waiting konfirmasi (yellow)--> accept by admin(green) --> payment --> on going process --> cart
}

export default RevenueAdmin
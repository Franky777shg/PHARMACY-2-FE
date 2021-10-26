import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar';

// Redux
import { connect } from 'react-redux'

// React Router DOM
import { Redirect } from 'react-router-dom'

// React Bootstrap
import {
    Table
} from 'react-bootstrap'

const URL_API = "https://api-pharmacy-2.purwadhikafs2.com/product"

class RawMaterialUsagePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProdukResep: null,
            dataUsageProdukResep: null
        }
    }
    componentDidMount() {
        let idproduk_resep = +this.props.location.pathname.slice(18)

        Axios.get(`${URL_API}/detail-productr/${idproduk_resep}`)
            .then(res => {
                this.setState({ dataProdukResep: res.data })
                Axios.get(`${URL_API}/rawMaterialUsage/${idproduk_resep}`)
                    .then(res1 => {
                        this.setState({ dataUsageProdukResep: res1.data })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.props.role !== "admin") {
            return <Redirect to="/" />
        }
        console.log(this.state.dataUsageProdukResep)
        return (
            <div>
                <NavBar />
                <div style={{ padding: '84px 28px 28px' }}>
                    <h1>Data Pemakaian {this.state.dataProdukResep ? this.state.dataProdukResep.nama : null}</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Order Number</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        {this.state.dataUsageProdukResep ? this.state.dataUsageProdukResep.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.date}, {item.time}</td>
                                        <td>{item.order_number}</td>
                                        <td>{item.qty_beli >= 100 ? `${Math.floor(item.qty_beli/100)} botol ${item.qty_beli%100} ml` : `${item.qty_beli} ml`}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                        :
                        <div></div>
                        }
                    </Table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps)(RawMaterialUsagePage)
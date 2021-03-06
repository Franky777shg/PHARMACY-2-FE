import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// React Bootstrap
import {
    Button,
    Image,
    Modal,
    Form,
    Table
} from 'react-bootstrap'

// Redux
import { connect } from 'react-redux'

// React Router DOM
import { Redirect } from 'react-router-dom'

const URL_API = "https://api-pharmacy-2.purwadhikafs2.com/transaction"

class TransactionAdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            daftarTransaksi: [],
            transaksiObat: 'satuan',
            pilihanStatusTransaksi: 'On Going',
            showModal: false,
            dataOrder: null, // data buat di modal resep
            dataDetailOrder: null,
            cariBahan: null, // untuk di isi dengan data produk resep yang dicari
            inputOrder: [], // data produk yang akan di pakai buat resep
            totalHargaResep: 0,
            imageBuktiPembayaranResep: null
        }
    }

    onTransaksiObatSatuan = () => {
        this.setState({ transaksiObat: 'satuan', pilihanStatusTransaksi: 'On Going' })
    }

    onTransaksiObatResep = () => {
        Axios.get(`${URL_API}/getTransOROnGoing`)
            .then(res => {
                this.setState({ daftarTransaksi: res.data })
                this.setState({ transaksiObat: 'resep', pilihanStatusTransaksi: 'On Going' })
            })
            .catch(err => console.log(err))
    }

    onOnGoingSatuan = () => {
        this.setState({ pilihanStatusTransaksi: 'On Going' })
    }

    onCompletedSatuan = () => {
        this.setState({ pilihanStatusTransaksi: 'Completed' })
    }

    onCancelledSatuan = () => {
        this.setState({ pilihanStatusTransaksi: 'Cancelled' })
    }

    onOnGoingResep = () => {
        Axios.get(`${URL_API}/getTransOROnGoing`)
            .then(res => {
                this.setState({ daftarTransaksi: res.data })
                this.setState({ pilihanStatusTransaksi: 'On Going' })
            })
            .catch(err => console.log(err))
    }

    onCompletedResep = () => {
        Axios.get(`${URL_API}/getTransORComplete`)
            .then(res => {
                this.setState({ daftarTransaksi: res.data })
                this.setState({ pilihanStatusTransaksi: 'Completed' })
            })
            .catch(err => console.log(err))
    }

    onCancelledResep = () => {
        Axios.get(`${URL_API}/getTransORCancel`)
            .then(res => {
                this.setState({ daftarTransaksi: res.data })
                this.setState({ pilihanStatusTransaksi: 'Cancelled' })
            })
            .catch(err => console.log(err))
    }

    onDetailTransaksi = (order_number) => {
        let data = {
            order_number
        }

        Axios.post(`${URL_API}/getDataOrder`, data)
            .then(res => {
                this.setState({ dataOrder: res.data })
                this.setState({ showModal: true })
                this.setState({
                    cariBahan: null,
                    inputOrder: [],
                    totalHargaResep: 0,
                    imageBuktiPembayaranResep: null 
                })
            })
            .catch(err => console.log(err))
    }

    onCariBahan = () => {
        let nama = this.refs.namaBahan.value

        let data = {
            nama
        }

        Axios.post(`${URL_API}/cariBahan`, data)
            .then(res => {
                this.setState({ cariBahan: res.data })
            })
            .catch(err => console.log(err))
    }

    onAddCariBahan = (id) => {
        let idproduk_resep = id
        let qty_beli = +this.refs.qtyBahan.value

        let dataId = {
            id: idproduk_resep
        }

        let tempArr = this.state.inputOrder

        Axios.post(`${URL_API}/pilihBahan`, dataId)
            .then(res => {
                let data = {
                    ...res.data,
                    qty: qty_beli,
                    order_number: this.state.dataOrder.order_number
                }
                tempArr.push(data)
                this.setState({ inputOrder: tempArr })
                this.totalBelanjaResep()
            })
            .catch(err => console.log(err))
    }

    onDeleteItemInputResep = (index) => {
        let tempArr = this.state.inputOrder
        tempArr.splice(index, 1)

        this.setState({ inputOrder: tempArr })
        this.totalBelanjaResep()
    }

    totalBelanjaResep = () => {
        let total = 0

        this.state.inputOrder.map((item) => {
            total = total + (item.qty * item.harga)
        })

        this.setState({ totalHargaResep: total })
    }

    onSendPaymentRequestResep = () => {
        this.state.inputOrder.map((item) => {
            let data = {
                order_number: this.state.dataOrder.order_number,
                idproduk: item.idproduk_resep,
                nama_produk: item.nama,
                qty_beli: item.qty,
                harga: item.harga
            }
            Axios.post(`${URL_API}/addOrderDetailResep`, data)
                .then(() => {
                    let newStok = item.stok_ml - item.qty
                    let data2 = {
                        id: item.idproduk_resep,
                        stok: newStok
                    }
                    Axios.post(`${URL_API}/updateStokResep`, data2)
                        .then(() => {
                            let data3 = {
                                statusBaru: 'Waiting For Payment',
                                order_number: this.state.dataOrder.order_number
                            }
                            Axios.post(`${URL_API}/updateStatusResep`, data3)
                                .then(() => {
                                    this.onTransaksiObatResep()
                                    this.setState({ showModal: false })
                                })
                                .catch(err => console.log('error update status resep'))
                        })
                        .catch(err => console.log('error update stok resep'))
                })
                .catch(err => console.log('error add order detail'))
        })
    }

    onRejectTransactionResep = () => {
        let data = {
            statusBaru: 'Cancel',
            order_number: this.state.dataOrder.order_number
        }

        Axios.post(`${URL_API}/rejectTransactionResep`, data)
            .then(() => {
                this.onTransaksiObatResep()
                this.setState({ showModal: false })
                this.setState({
                    cariBahan: null,
                    inputOrder: [],
                    totalHargaResep: 0
                })
            })
            .catch(err => console.log('error reject transaksi resep'))
    }

    getDataOrderResep = (order_number) => {
        let data = {
            order_number
        }

        Axios.post(`${URL_API}/getDetailOrderResep`, data)
            .then(res => {
                this.setState({ inputOrder: res.data })
                let total = 0

                this.state.inputOrder.map((item) => {
                    total = total + (item.qty_beli * item.harga)
                })

                this.setState({ totalHargaResep: total })
            })
            .catch(err => console.log('error get data order resep'))
    }

    modalPaymentApprovalResep = (order_number) => {
        let data = {
            order_number
        }

        Axios.post(`${URL_API}/getDetailOrderResep`, data)
            .then(res => {
                this.setState({ inputOrder: res.data })
                let total = 0

                this.state.inputOrder.map((item) => {
                    total = total + (item.qty_beli * item.harga)
                })

                this.setState({ totalHargaResep: total })
                Axios.post(`${URL_API}/getImageBuktiPembayaranResep`, data)
                    .then(res => {
                        this.setState({ imageBuktiPembayaranResep: res.data })
                    })
            })
            .catch(err => console.log('error modal payment approval'))
    }

    onCloseModalResep = () => {
        this.setState({ 
            showModal: false,
        })
    }

    onProsesOrderResep = () => {
        let data = {
            statusBaru: 'Processing',
            order_number: this.state.dataOrder.order_number
        }

        Axios.post(`${URL_API}/updateStatusResep`, data)
            .then(() => {
                this.onTransaksiObatResep()
                this.setState({ showModal: false })
            })
            .catch(err => console.log('error update status resep'))
    }

    onRequestReuploadBuktiPembayaranResep = () => {
        let data = {
            statusBaru: 'Waiting For Payment',
            order_number: this.state.dataOrder.order_number
        }

        Axios.post(`${URL_API}/updateStatusResep`, data)
            .then(() => {
                this.onTransaksiObatResep()
                this.setState({ showModal: false })
            })
            .catch(err => console.log('error update status resep'))
    }

    onSendPackageResep = () => {
        let data = {
            statusBaru: 'Sending Package',
            order_number: this.state.dataOrder.order_number
        }

        Axios.post(`${URL_API}/updateStatusResep`, data)
            .then(() => {
                this.onTransaksiObatResep()
                this.setState({ showModal: false })
            })
            .catch(err => console.log('error update status resep'))
    }

    render() {
        if (this.props.role !== "admin") {
            return <Redirect to="/" />
        }
        return (
            <div>
                <NavBar />
                <div style={{ marginTop: '84px', padding: '0 28px 28px' }}>
                    <div >
                        <Button
                            variant="primary"
                            disabled={this.state.transaksiObat === 'satuan' ? true : false}
                            onClick={this.onTransaksiObatSatuan}
                        >Transaksi Obat Satuan</Button>
                        <Button
                            style={{ marginLeft: '10px' }}
                            variant="primary"
                            disabled={this.state.transaksiObat === 'resep' ? true : false}
                            onClick={this.onTransaksiObatResep}
                        >Transaksi Obat Resep</Button>
                    </div>
                    {this.state.transaksiObat === 'satuan' ?
                        <div style={styles.divPilihanStatusTransaksi}>
                            <Button
                                variant="primary"
                                disabled={this.state.pilihanStatusTransaksi === 'On Going' ? true : false}
                                onClick={this.onOnGoingSatuan}
                            >On Going Satuan</Button>
                            <Button
                                variant="primary"
                                disabled={this.state.pilihanStatusTransaksi === 'Completed' ? true : false}
                                onClick={this.onCompletedSatuan}
                            >Completed Satuan</Button>
                            <Button
                                variant="primary"
                                disabled={this.state.pilihanStatusTransaksi === 'Cancelled' ? true : false}
                                onClick={this.onCancelledSatuan}
                            >Cancelled Satuan</Button>
                        </div>
                        :
                        <div style={styles.divPilihanStatusTransaksi}>
                            <Button
                                variant="primary"
                                disabled={this.state.pilihanStatusTransaksi === 'On Going' ? true : false}
                                onClick={this.onOnGoingResep}
                            >On Going Resep</Button>
                            <Button
                                variant="primary"
                                disabled={this.state.pilihanStatusTransaksi === 'Completed' ? true : false}
                                onClick={this.onCompletedResep}
                            >Completed Resep</Button>
                            <Button
                                variant="primary"
                                disabled={this.state.pilihanStatusTransaksi === 'Cancelled' ? true : false}
                                onClick={this.onCancelledResep}
                            >Cancelled Resep</Button>
                        </div>
                    }
                    {this.state.daftarTransaksi ?
                        this.state.daftarTransaksi.map((item, index) => {
                            return (
                                <div style={styles.transaction} key={index}>
                                    <Image style={styles.imageTransaction} src={"https://api-pharmacy-2.purwadhikafs2.com/" + item.image_resep} />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h5>{`Date : ${item.date}, ${item.time}`}</h5>
                                        <h5>{`Order Number : ${item.order_number}`}</h5>
                                        <h5>{`User ID : ${item.iduser}`}</h5>
                                        <h5 style={{ margin: 0 }}>{`Status : ${item.status}`}</h5>
                                    </div>
                                    <div>
                                        <Button style={styles.detailTrasaksiButton} variant="outline-light" onClick={() => this.onDetailTransaksi(item.order_number)}>Detail Transaksi</Button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div></div>
                    }
                </div>
                <Modal
                    show={this.state.showModal}
                    onHide={this.onCloseModalResep}
                    fullscreen={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Detail Transaksi
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={styles.modalBody}>
                        <Image style={styles.imageDetailProduk} src={this.state.dataOrder ? "https://api-pharmacy-2.purwadhikafs2.com/" + this.state.dataOrder.image_resep : null} />
                        {this.state.dataOrder && this.state.dataOrder.status === "Waiting For Approval" ?
                            <div style={styles.divCariBahan}>
                                <h3 style={{ margin: '20px 0 20px' }}>Cari Bahan:</h3>
                                <div style={styles.modalSearchProduk}>
                                    <Form.Control style={{ width: '15vw' }} type="text" placeholder="Nama Bahan" ref="namaBahan" />
                                    <Button variant="primary" onClick={this.onCariBahan}>Cari</Button>
                                </div>
                                <div>
                                    {this.state.cariBahan ?
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Nama Bahan</th>
                                                    <th>Stok(ml)</th>
                                                    <th>Usage(ml)</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {this.state.cariBahan.map((item, index) => {
                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>{item.nama}</td>
                                                            <td>{item.stok_ml}</td>
                                                            <td>
                                                                <Form.Control
                                                                    style={{ width: '10vw' }}
                                                                    type="number"
                                                                    ref="qtyBahan"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="success"
                                                                    onClick={() => this.onAddCariBahan(item.idproduk_resep)}
                                                                >
                                                                    Add
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </Table>
                                        :
                                        <div></div>
                                    }
                                </div>
                                {this.state.inputOrder.length === 0 ?
                                    <div></div>
                                    :
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <h3 style={{ margin: '20px 0 20px' }}>Bahan yang akan dipakai :</h3>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Nama Bahan</th>
                                                    <th>Quantity(ml)</th>
                                                    <th>Harga(/ml)</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {this.state.inputOrder.map((item, index) => {
                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>{item.nama}</td>
                                                            <td>{item.qty}</td>
                                                            <td>Rp {(item.harga).toLocaleString()}</td>
                                                            <td>Rp {(item.harga * item.qty).toLocaleString()}</td>
                                                            <td>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => this.onDeleteItemInputResep(index)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="4">Total</td>
                                                    <td>Rp {(this.state.totalHargaResep).toLocaleString()}</td>
                                                </tr>
                                            </tfoot>
                                        </Table>
                                        <div style={{ width: '40vw', display: 'flex', justifyContent: 'center' }}>
                                            <Button style={{ marginBottom: '20px' }} variant="success" onClick={this.onSendPaymentRequestResep}>Send Payment Request</Button>
                                        </div>
                                    </div>
                                }
                                <Button variant="danger" onClick={this.onRejectTransactionResep}>Reject Transaction</Button>
                            </div>
                            :
                            <div></div>
                        }
                        {this.state.dataOrder && this.state.dataOrder.status === "Waiting For Payment" ?
                            this.state.inputOrder.length === 0 ? 
                                this.getDataOrderResep(this.state.dataOrder.order_number)
                                :
                                <Table style={{ marginTop: '20px' }} striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nama Bahan</th>
                                            <th>Quantity(ml)</th>
                                            <th>Harga(/ml)</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    {this.state.inputOrder.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{item.nama_produk}</td>
                                                    <td>{item.qty_beli}</td>
                                                    <td>Rp {(item.harga).toLocaleString()}</td>
                                                    <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3">Total</td>
                                            <td>Rp {(this.state.totalHargaResep).toLocaleString()}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            :
                            <div></div>
                        }
                        {this.state.dataOrder && this.state.dataOrder.status === "Waiting For Payment Approval" ?
                            this.state.inputOrder.length === 0 ? 
                                this.modalPaymentApprovalResep(this.state.dataOrder.order_number)
                                :
                                <div>
                                    <Table style={{ marginTop: '20px' }} striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Nama Bahan</th>
                                                <th>Quantity(ml)</th>
                                                <th>Harga(/ml)</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        {this.state.inputOrder.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{item.nama_produk}</td>
                                                        <td>{item.qty_beli}</td>
                                                        <td>Rp {(item.harga).toLocaleString()}</td>
                                                        <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3">Total</td>
                                                <td>Rp {(this.state.totalHargaResep).toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                    <h3 style={{ textDecoration: 'underline', textAlign: 'center' }}>Bukti Pembayaran</h3>
                                    <Image style={styles.imageBuktiPembayaranResep} src={`https://api-pharmacy-2.purwadhikafs2.com/${this.state.imageBuktiPembayaranResep}`} />
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Button variant="success" onClick={this.onProsesOrderResep}>Process Order</Button>
                                        <Button  style={{ marginLeft: '20px'}} variant="danger" onClick={this.onRequestReuploadBuktiPembayaranResep}>Request Reupload Payment Proof</Button>
                                    </div>
                                </div>
                            :
                            <div></div>
                        }
                        {this.state.dataOrder && this.state.dataOrder.status === "Processing" ?
                            this.state.inputOrder.length === 0 ? 
                                this.getDataOrderResep(this.state.dataOrder.order_number)
                                :
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Table style={{ marginTop: '20px', width: '40vw' }} striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Nama Bahan</th>
                                                <th>Quantity(ml)</th>
                                                <th>Harga(/ml)</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        {this.state.inputOrder.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{item.nama_produk}</td>
                                                        <td>{item.qty_beli}</td>
                                                        <td>Rp {(item.harga).toLocaleString()}</td>
                                                        <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                        <tfoot>
                                            <tr>
                                                <td colSpan="3">Total</td>
                                                <td>Rp {(this.state.totalHargaResep).toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                    <Button style={{ marginTop: '20px' }} variant="success" onClick={this.onSendPackageResep}>Send Package</Button>
                                </div>
                            :
                            <div></div>
                        }
                        {this.state.dataOrder && this.state.dataOrder.status === "Sending Package" ?
                            this.state.inputOrder.length === 0 ? 
                                this.getDataOrderResep(this.state.dataOrder.order_number)
                                :
                                <Table style={{ marginTop: '20px', width: '40vw' }} striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nama Bahan</th>
                                            <th>Quantity(ml)</th>
                                            <th>Harga(/ml)</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    {this.state.inputOrder.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{item.nama_produk}</td>
                                                    <td>{item.qty_beli}</td>
                                                    <td>Rp {(item.harga).toLocaleString()}</td>
                                                    <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3">Total</td>
                                            <td>Rp {(this.state.totalHargaResep).toLocaleString()}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            :
                            <div></div>
                        }
                        {this.state.dataOrder && this.state.dataOrder.status === "Complete" ?
                            this.state.inputOrder.length === 0 ? 
                                this.getDataOrderResep(this.state.dataOrder.order_number)
                                :
                                <Table style={{ marginTop: '20px', width: '40vw' }} striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nama Bahan</th>
                                            <th>Quantity(ml)</th>
                                            <th>Harga(/ml)</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    {this.state.inputOrder.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{item.nama_produk}</td>
                                                    <td>{item.qty_beli}</td>
                                                    <td>Rp {(item.harga).toLocaleString()}</td>
                                                    <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3">Total</td>
                                            <td>Rp {(this.state.totalHargaResep).toLocaleString()}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            :
                            <div></div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const styles = {
    divPilihanStatusTransaksi: {
        width: '40vw',
        marginTop: '28px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    transaction: {
        width: '60vw',
        padding: '14px',
        marginTop: '28px',
        backgroundColor: '#80F1B2',
        border: '5px solid #343892',
        height: '30vh',
        borderRadius: '10px',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailTrasaksiButton: {
        height: '110px',
        fontSize: '20px',
        fontWeight: '500',
        border: '3px solid'
    },
    imageTransaction: {
        width: '110px',
        height: '110px'
    },
    modalBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    imageDetailProduk: {
        width: '60vw',
        border: '5px solid #343892',
        borderRadius: '10px'
    },
    modalSearchProduk: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20vw',
        marginBottom: '20px'
    },
    divCariBahan: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    imageBuktiPembayaranResep: {
        marginTop: '20px',
        width: '40vw',
        border: '5px solid #343892',
        borderRadius: '10px'
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps)(TransactionAdminPage)
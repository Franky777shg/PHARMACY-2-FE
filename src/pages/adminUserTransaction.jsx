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
const URL_API2 = "https://api-pharmacy-2.purwadhikafs2.com"

class AdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            daftarTransaksi: [], //data yg mau di map
            transaksiObat: 'satuan',
            pilihanStatusTransaksi: 'On Going',
            showModal: false,
            dataOrder: null, // data buat di modal resep
            dataDetailOrder: null,
            cariBahan: null, // untuk di isi dengan data produk resep yang dicari
            inputOrder: [], // data produk yang akan di pakai buat resep
            totalHargaResep: 0,
            imageBuktiPembayaranResep: null,
            page: 1,
            maxPage: null,
            nextSatuan: null,
            prevSatuan: null,
            nextResep: null,
            prevResep: null,
            show: "satuan",
            dataOrderSatuan: null,
            showModalSatuan: false,
            totalHargaSatuan: null,
            statusOrderSatuan: "status",
            imageBuktiPembayaranSatuan: false,
            orderNumberSatuan: false,
        }
    }

    //pagination
    fetchData = () => {
        Axios.post(`${URL_API2}/admin/order-resep`, { page: 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetchData2 = () => {
        Axios.post(`${URL_API2}/admin/order-satuan`, { page: 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.fetchData2()
        // this.fetchData()
    }

    onNextResep = () => {
        if (this.state.nextResep === null) {
            Axios.post(`${URL_API2}/admin/order-resep`, { page: this.state.page + 1 })
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.nextResep === 'filter') {
            let name = this.refs.name.value
            let page = this.state.page + 1

            let data = {
                name,
                page
            }

            Axios.post(`${URL_API2}/admin/filter-resep`, data)
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })

        }  else if (this.state.prevResep === 'ongoing') {
            Axios.get(`${URL_API}/getTransOROnGoing`, { page: this.state.page + 1 })
                .then(res => {
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
            })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    onPrevResep = () => {
        if (this.state.prevResep === null) {
            Axios.post(`${URL_API2}/admin/order-resep`, { page: this.state.page - 1 })
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.prevResep === 'filter') {
            let name = this.refs.name.value
            let page = this.state.page - 1

            let data = {
                name,
                page
            }

            Axios.post(`${URL_API2}/admin/filter-resep`, data)
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.prevResep === 'ongoing') {
            Axios.get(`${URL_API}/getTransOROnGoing`, { page: this.state.page - 1 })
                .then(res => {
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
            })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    onNextSatuan = () => {
        if (this.state.nextSatuan === null) {
            Axios.post(`${URL_API2}/admin/order-satuan`, { page: this.state.page + 1 })
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.nextSatuan === 'filter') {
            let name = this.refs.name.value
            let page = this.state.page + 1

            let data = {
                name,
                page
            }

            Axios.post(`${URL_API2}/admin/filter-satuan`, data)
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1 })
                })
                .catch(err => {
                    console.log(err)
                })

        }
        // this.setState({nextSatuan : null})

    }

    onPrevSatuan = () => {
        if (this.state.prevSatuan === null) {
            Axios.post(`${URL_API2}/admin/order-satuan`, { page: this.state.page - 1 })
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.prevSatuan === 'filter') {
            let name = this.refs.name.value
            let page = this.state.page - 1

            let data = {
                name,
                page
            }

            Axios.post(`${URL_API2}/admin/filter-satuan`, data)
                .then(res => {
                    this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1 })
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    onTransaksiObatSatuan = () => {
        Axios.post(`${URL_API2}/admin/order-satuan`, { page: 1 })
            .then(res => {
                console.log(res.data)
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ transaksiObat: 'satuan', pilihanStatusTransaksi: 'On Going' })
            })
            .catch(err => {
                console.log(err)
            })
    }

    onTransaksiObatResep = () => {
        Axios.post(`${URL_API2}/admin/order-resep`, { page: 1 })
            .then(res => {
                this.setState({ daftarTransaksi: res.data })
                this.setState({ transaksiObat: 'resep', pilihanStatusTransaksi: 'On Going' })
            })
            .catch(err => console.log(err))
    }

    //filter Resep by Name, date, order_number
    onFilterResep = () => {
        let name = this.refs.name.value

        let data = {
            name,
            page: 1
        }

        Axios.post(`${URL_API2}/admin/filter-resep`, data)
            .then(res => {
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ page: 1 })
                this.setState({ nextResep: 'filter', prevResep: 'filter' })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ nextResep: null, prevResep: null })
    }

    //filter Satuan by Name, date, order_number
    onFilterSatuan = () => {
        let name = this.refs.name.value

        let data = {
            name,
            page: 1
        }

        Axios.post(`${URL_API2}/admin/filter-satuan`, data)
            .then(res => {
                this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
                this.setState({ page: 1 })
                this.setState({ nextSatuan: 'filter', prevSatuan: 'filter' })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ nextSatuan: null, prevSatuan: null })
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

    //ON_GOING_RESEP
    // onOnGoingResep = () => {
    //     Axios.get(`${URL_API}/getTransOROnGoing`, { page: 1 })
    //         .then(res => {
    //             // this.setState({ daftarTransaksi: res.data })
    //             this.setState({ daftarTransaksi: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
    //             this.setState({ pilihanStatusTransaksi: 'On Going' })
    //             this.setState({ nextResep: 'ongoing', prevResep: 'ongoing' })
    //         })
    //         .catch(err => console.log(err))
    // }

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
                idproduk_resep: item.idproduk_resep,
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
        this.onTransaksiObatResep()
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

    onDetailTransaksiSatuan = (order_number, status) => {
        let data = {
            order_number
        }

        Axios.post(`${URL_API}/getDataOrderSatuan`, data)
            .then(res => {
                this.setState({ dataOrderSatuan: res.data, showModalSatuan: true, statusOrderSatuan: status, imageBuktiPembayaranSatuan: false, orderNumberSatuan: order_number })
                let totalHarga = 0
                this.state.dataOrderSatuan.forEach((item) => {
                    totalHarga = totalHarga + (item.qty_beli * item.harga)
                })
                this.setState({ totalHargaSatuan: totalHarga })
                Axios.post(`${URL_API}/getBuktiPembayaranSatuan`, data)
                    .then(res => {
                        this.setState({ imageBuktiPembayaranSatuan: res.data.payment_proof_satuan })
                    })
            })
            .catch(err => console.log(`error get data order satuan`))
    }

    onCloseModalSatuan = () => {
        this.setState({
            showModalSatuan: false,
            imageBuktiPembayaranSatuan: false
        })
    }

    requestReuploadSatuan = () => {
        let data = {
            order_number: this.state.orderNumberSatuan,
            statusBaru: "Waiting For Payment"
        }

        Axios.post(`${URL_API}/updateStatusSatuan`, data)
            .then(() => {
                this.onTransaksiObatSatuan()
                this.setState({
                    showModalSatuan: false,
                    imageBuktiPembayaranSatuan: false
                })
            })
            .catch(err => console.log('gagal ganti status request upload payment proof'))
    }

    onProcessSatuan = () => {
        let data = {
            order_number: this.state.orderNumberSatuan,
            statusBaru: "Processing"
        }

        Axios.post(`${URL_API}/updateStatusSatuan`, data)
            .then(() => {
                this.onTransaksiObatSatuan()
                this.setState({
                    showModalSatuan: false,
                    imageBuktiPembayaranSatuan: false
                })
            })
            .catch(err => console.log('gagal ganti status processing'))
    }

    onSendPackageSatuan = () => {
        let data = {
            order_number: this.state.orderNumberSatuan,
            statusBaru: "Sending Package"
        }

        Axios.post(`${URL_API}/updateStatusSatuan`, data)
            .then(() => {
                this.onTransaksiObatSatuan()
                this.setState({
                    showModalSatuan: false,
                    imageBuktiPembayaranSatuan: false
                })
            })
            .catch(err => console.log('gagal ganti status sending package'))
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
                            {/* <div style={{ display: 'flex', flexBasis: '60%', justifyContent: 'space-between', marginRight: '2vw' }}>
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
                            </div> */}
                            <div style={styles.divForm}>
                                <p style={{ margin: 0, width: '5vw' }}>Filter :</p>
                                <Form.Control style={styles.filterForm} type="text" placeholder="Name/ Date/ OrderNumb" ref="name" />
                                <Button variant="outline-primary" onClick={this.onFilterSatuan}>Search</Button>
                            </div>
                            <div style={styles.paginationDiv}>
                                <Button style={{ marginRight: '10px' }} variant="primary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrevSatuan}>Prev</Button>
                                <p style={{ margin: 0 }}>Page {this.state.page} of {this.state.maxPage}</p>
                                <Button style={{ marginLeft: '10px' }} variant="primary" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNextSatuan}>Next</Button>
                            </div>
                        </div>
                        :
                        <div style={styles.divPilihanStatusTransaksi}>
                            {/* <div style={{ display: 'flex', flexBasis: '60%', justifyContent: 'space-between', marginRight: '2vw' }}>
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
                            </div> */}
                            <div style={styles.divForm}>
                                <p style={{ margin: 0, width: '5vw' }}>Filter :</p>
                                <Form.Control style={styles.filterForm} type="text" placeholder="Name/ Date/ OrderNumb" ref="name" />
                                <Button variant="outline-primary" onClick={this.onFilterResep}>Search</Button>
                            </div>
                            <div style={styles.paginationDiv}>
                                <Button style={{ marginRight: '10px' }} variant="primary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrevResep}>Prev</Button>
                                <p style={{ margin: 0 }}>Page {this.state.page} of {this.state.maxPage}</p>
                                <Button style={{ marginLeft: '10px' }} variant="primary" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNextResep}>Next</Button>
                            </div>
                        </div>
                    }
                    {this.state.daftarTransaksi ?
                        this.state.daftarTransaksi.map((item, index) => {
                            if (this.state.transaksiObat === 'resep') {
                                return (
                                    <div style={styles.transaction} key={index}>
                                        <Image style={styles.imageTransaction} src={"https://api-pharmacy-2.purwadhikafs2.com/" + item.image_resep} />
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h5>{`Date : ${item.date}, ${item.time}`}</h5>
                                            <h5>{`Order Number : ${item.order_number}`}</h5>
                                            <h5>{`User ID : ${item.iduser}`}</h5>
                                            <h5>{`Username : ${item.username}`}</h5>
                                            <h5 style={{ margin: 0 }}>{`Status : ${item.status}`}</h5>
                                        </div>
                                        <div>
                                            <Button style={styles.detailTrasaksiButton} variant="outline-light" onClick={() => this.onDetailTransaksi(item.order_number)}>Detail Transaksi</Button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={styles.transaction} key={index}>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h5>{`Date : ${item.date}, ${item.time}`}</h5>
                                            <h5>{`Order Number : ${item.order_number}`}</h5>
                                            <h5>{`User ID : ${item.iduser}`}</h5>
                                            <h5>{`Username : ${item.username}`}</h5>
                                            <h5 style={{ margin: 0 }}>{`Status : ${item.status}`}</h5>
                                        </div>
                                        <div>
                                            <Button style={styles.detailTrasaksiButton} variant="outline-light" onClick={() => this.onDetailTransaksiSatuan(item.order_number, item.status)}>Detail Transaksi</Button>
                                        </div>
                                    </div>
                                )
                            }

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
                                        <Button style={{ marginLeft: '20px' }} variant="danger" onClick={this.onRequestReuploadBuktiPembayaranResep}>Request Reupload Payment Proof</Button>
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
                                <div>
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
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Button variant="success" disabled={true}>Sending Package</Button>
                                    </div>
                                </div>
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
                <Modal
                    show={this.state.showModalSatuan}
                    onHide={this.onCloseModalSatuan}
                    fullscreen={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Detail Transaksi
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={styles.modalBody}>
                        {this.state.statusOrderSatuan === "Waiting For Payment" ? 
                            <div style={styles.table}>
                                <Table style={styles.table} striped bordered hover variant="light" style={{ backgroundColor: '#000051' }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nama Obat</th>
                                            <th>Quantity</th>
                                            <th>Harga</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    {this.state.dataOrderSatuan ? this.state.dataOrderSatuan.map((item, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama}</td>
                                                    <td>{item.qty_beli}</td>
                                                    <td>Rp {(item.harga).toLocaleString()}</td>
                                                    <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                    :
                                    <div></div>
                                    }
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4">Total</td>
                                            <td>Rp {this.state.totalHargaSatuan ? (this.state.totalHargaSatuan).toLocaleString() : null}</td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        :
                        <div></div>
                        }
                        {this.state.statusOrderSatuan === "Waiting For Payment Approval" ?
                            <div>
                                <div style={styles.table}>
                                    <Table style={styles.table} striped bordered hover variant="light" style={{ backgroundColor: '#000051' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Obat</th>
                                                <th>Quantity</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        {this.state.dataOrderSatuan ? this.state.dataOrderSatuan.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.qty_beli}</td>
                                                        <td>Rp {(item.harga).toLocaleString()}</td>
                                                        <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                        :
                                        <div></div>
                                        }
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4">Total</td>
                                                <td>Rp {this.state.totalHargaSatuan ? (this.state.totalHargaSatuan).toLocaleString() : null}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                    <h3 style={{ textDecoration: 'underline', textAlign: 'center' }}>Bukti Pembayaran</h3>
                                    <Image style={styles.imageBuktiPembayaranResep} src={this.state.imageBuktiPembayaranSatuan ? `https://api-pharmacy-2.purwadhikafs2.com/${this.state.imageBuktiPembayaranSatuan}` : null} />
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Button variant="success" onClick={this.onProcessSatuan}>Process Order</Button>
                                        <Button style={{ marginLeft: '20px' }} variant="danger" onClick={this.requestReuploadSatuan}>Request Reupload Payment Proof</Button>
                                    </div>
                                </div>
                            </div>
                        :
                            <div></div>
                        }
                        {this.state.statusOrderSatuan === "Processing" ?
                            <div>
                                <div style={styles.table}>
                                    <Table style={styles.table} striped bordered hover variant="light" style={{ backgroundColor: '#000051' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Obat</th>
                                                <th>Quantity</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        {this.state.dataOrderSatuan ? this.state.dataOrderSatuan.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.qty_beli}</td>
                                                        <td>Rp {(item.harga).toLocaleString()}</td>
                                                        <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                        :
                                        <div></div>
                                        }
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4">Total</td>
                                                <td>Rp {this.state.totalHargaSatuan ? (this.state.totalHargaSatuan).toLocaleString() : null}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                    <h3 style={{ textDecoration: 'underline', textAlign: 'center' }}>Bukti Pembayaran</h3>
                                    <Image style={styles.imageBuktiPembayaranResep} src={this.state.imageBuktiPembayaranSatuan ? `https://api-pharmacy-2.purwadhikafs2.com/${this.state.imageBuktiPembayaranSatuan}` : null} />
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Button variant="success" onClick={this.onSendPackageSatuan}>Send Package</Button>
                                    </div>
                                </div>
                            </div>
                        :
                            <div></div>
                        }
                        {this.state.statusOrderSatuan === "Sending Package" ?
                            <div>
                                <div style={styles.table}>
                                    <Table style={styles.table} striped bordered hover variant="light" style={{ backgroundColor: '#000051' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Obat</th>
                                                <th>Quantity</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        {this.state.dataOrderSatuan ? this.state.dataOrderSatuan.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.qty_beli}</td>
                                                        <td>Rp {(item.harga).toLocaleString()}</td>
                                                        <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                        :
                                        <div></div>
                                        }
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4">Total</td>
                                                <td>Rp {this.state.totalHargaSatuan ? (this.state.totalHargaSatuan).toLocaleString() : null}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                    <h3 style={{ textDecoration: 'underline', textAlign: 'center' }}>Bukti Pembayaran</h3>
                                    <Image style={styles.imageBuktiPembayaranResep} src={this.state.imageBuktiPembayaranSatuan ? `https://api-pharmacy-2.purwadhikafs2.com/${this.state.imageBuktiPembayaranSatuan}` : null} />
                                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                        <Button variant="success" disabled={true}>Sending Package</Button>
                                    </div>
                                </div>
                            </div>
                        :
                            <div></div>
                        }
                        {this.state.statusOrderSatuan === "Complete" ?
                            <div>
                                <div style={styles.table}>
                                    <Table style={styles.table} striped bordered hover variant="light" style={{ backgroundColor: '#000051' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nama Obat</th>
                                                <th>Quantity</th>
                                                <th>Harga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        {this.state.dataOrderSatuan ? this.state.dataOrderSatuan.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.nama}</td>
                                                        <td>{item.qty_beli}</td>
                                                        <td>Rp {(item.harga).toLocaleString()}</td>
                                                        <td>Rp {(item.harga * item.qty_beli).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                        :
                                        <div></div>
                                        }
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4">Total</td>
                                                <td>Rp {this.state.totalHargaSatuan ? (this.state.totalHargaSatuan).toLocaleString() : null}</td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                    <h3 style={{ textDecoration: 'underline', textAlign: 'center' }}>Bukti Pembayaran</h3>
                                    <Image style={styles.imageBuktiPembayaranResep} src={this.state.imageBuktiPembayaranSatuan ? `https://api-pharmacy-2.purwadhikafs2.com/${this.state.imageBuktiPembayaranSatuan}` : null} />
                                </div>
                            </div>
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
        marginTop: '5vh',
        height: '7vh',
        display: 'flex',
        justifyContent: 'space-between'
    },
    transaction: {
        width: '60vw',
        padding: '14px',
        marginTop: '28px',
        backgroundColor: '#3D56B2',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',
        height: '30vh',
        borderRadius: '5px',
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
    },
    paginationDiv: {
        width: '100vw',
        display: 'flex',
        flexBasis: '30%',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: "17vw",
    },
    table: {
        textAlign: 'center',
        width: '90vw'
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps)(AdminPage)
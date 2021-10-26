import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// Redux
import { connect } from 'react-redux'
import { editProduct1 } from '../redux/actions'
// React Router DOM
import { Link, Redirect } from 'react-router-dom'

// React Bootstrap
import {
    Image,
    Button,
    Form,
    FormControl,
    FloatingLabel, Alert, Modal
} from 'react-bootstrap'

const URL_API = 'https://api-pharmacy-2.purwadhikafs2.com/product'

class EditSatuanPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            qty: 1,
            selectValue: '',
            images: '',
            max: null,
            stok: null,
            nama: null,
            harga: null,
            satuan: null,
            kategori: null,
            deskripsi: null,
            indikasi_umum: null,
            komposisi: null,
            dosis: null,
            aturan_pakai: null,
            kontra_indikasi: null,
            perhatian: null,
            efek_samping: null,
            segmentasi: null,
            kemasan: null,
            manufaktur: null,
            no_registrasi: null,
            message: '',
            showmodal: false,
            adafoto: false,
            error: false,
            errormes: '',
            berhasil: false,
            berhasilmes: ''
        }
    }

    componentDidMount() {
        let idProduct = this.props.location.pathname.slice(13)
        Axios.get(`${URL_API}/detail-product/${idProduct}`)
            .then(res => {
                this.setState({
                    product: res.data, max: res.data.stok, stok: res.data.stok,
                    nama: res.data.nama,
                    harga: res.data.harga,
                    satuan: res.data.satuan,
                    kategori: res.data.kategori,
                    deskripsi: res.data.deskripsi,
                    indikasi_umum: res.data.indikasi_umum,
                    komposisi: res.data.komposisi,
                    dosis: res.data.dosis,
                    aturan_pakai: res.data.aturan_pakai,
                    kontra_indikasi: res.data.kontra_indikasi,
                    perhatian: res.data.perhatian,
                    efek_samping: res.data.efek_samping,
                    segmentasi: res.data.segmentasi,
                    kemasan: res.data.kemasan,
                    manufaktur: res.data.manufaktur,
                    no_registrasi: res.data.no_registrasi
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    fetchData = () => {
        let idProduct = this.props.location.pathname.slice(13)
        Axios.get(`${URL_API}/detail-product/${idProduct}`)
            .then(res => {
                this.setState({
                    product: res.data, max: res.data.stok, stok: res.data.stok,
                    nama: res.data.nama,
                    harga: res.data.harga,
                    satuan: res.data.satuan,
                    kategori: res.data.kategori,
                    deskripsi: res.data.deskripsi,
                    indikasi_umum: res.data.indikasi_umum,
                    komposisi: res.data.komposisi,
                    dosis: res.data.dosis,
                    aturan_pakai: res.data.aturan_pakai,
                    kontra_indikasi: res.data.kontra_indikasi,
                    perhatian: res.data.perhatian,
                    efek_samping: res.data.efek_samping,
                    segmentasi: res.data.segmentasi,
                    kemasan: res.data.kemasan,
                    manufaktur: res.data.manufaktur,
                    no_registrasi: res.data.no_registrasi
                })
            })
            .catch(err => {
                console.log(err)
            })
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
    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }

    handleChoose = (e) => {
        this.setState({ images: e.target.files[0] })
        console.log('e.target.files', e.target.files)
        console.log(e.target.files[0])
        console.log(this.state.images)
    }

    handleUpload = () => {
        //foto dan data = 2, data aja = 1
        let foto = new FormData()
        console.log(foto)
        console.log(this.state.images)
        let message = ''
        foto.append('IMG', this.state.images)
        // if(this.state.images !==''){
        //     data.append('IMG', this.state.images)
        //     message="2"
        // }
        // else{
        //     data = ''
        //     message="1"
        // }
        console.log(this.refs.namaobat.value)
        // console.log(data.get('IMG'))
        let nama = this.refs.namaobat.value
        let harga = +this.refs.harga.value
        let satuan = this.refs.satuan.value
        // const link_foto = res.data
        let stok = +this.refs.stok.value
        let kategori = this.refs.category.value
        let deskripsi = this.refs.deskripsi.value
        let indikasi_umum = this.refs.indikasi_umum.value
        let komposisi = this.refs.komposisi.value
        let dosis = this.refs.dosis.value
        let aturan_pakai = this.refs.aturan_pakai.value
        let kontra_indikasi = this.refs.kontra_indikasi.value
        let perhatian = this.refs.perhatian.value
        let efek_samping = this.refs.efek_samping.value
        let segmentasi = this.refs.segmentasi.value
        let kemasan = this.refs.kemasan.value
        let manufaktur = this.refs.manufaktur.value
        let no_registrasi = this.refs.no_registrasi.value
        // let message = this.state.message
        let idproduct = this.props.location.pathname.slice(13)
        let body = {
            nama,
            harga,
            satuan,
            // link_foto,
            stok,
            kategori,
            deskripsi,
            indikasi_umum,
            komposisi,
            dosis,
            aturan_pakai,
            kontra_indikasi,
            perhatian,
            efek_samping,
            segmentasi,
            kemasan,
            manufaktur,
            no_registrasi,
            idproduct,
            message: this.state.message
        }
        // console.log(data.get('IMG'),body)
        console.log(this.state.images)
        console.log(foto)
        console.log(foto.length)
        // console.log(message)
        // this.props.editProduct1(foto, body, idproduct, this.state.adafoto)
        if (this.state.adafoto === true) {
            Axios.post(`${URL_API}/edit-product1foto/${idproduct}`, foto, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    // console.log(res.data.data[0].idproduk)
                    console.log(res.data)
                    // const hasil = res.data
                    // const kirim = { ...data, hasil }
                    Axios.post(`${URL_API}/edit-product1data/${idproduct}`, body)
                        .then(res => {
                            // console.log(res.data.data[0].idproduk)
                            // console.log(res.data)
                            // dispatch({
                            //     type: 'EDITPRODUCT1',
                            //     payload: 'Berhasil update produk'

                            // })
                            console.log('Berhasil update produk')
                            this.fetchData()
                            this.setState({ berhasil: true, berhasilmes: `Berhasil update produk dengan id ${idproduct}` , images: ''})
                        })
                        .catch(err => {
                            console.log(err)
                            this.setState({ error: true, errormes: 'Gagal update produk, refresh kembali dan coba lagi', images: '' })
                            // dispatch({
                            //     type: 'EDITPRODUCT1_FAIL',
                            //     payload: err.response.data

                            // })
                        })

                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (this.state.adafoto === false) {
            Axios.post(`${URL_API}/edit-product1data/${idproduct}`, body)
                .then(res => {
                    // console.log(res.data.data[0].idproduk)
                    // console.log(res.data)
                    // dispatch({
                    //     type: 'EDITPRODUCT1',
                    //     payload: 'Berhasil update produk'

                    // })
                    console.log('Berhasil update produk')
                    this.fetchData()
                    this.setState({ berhasil: true, berhasilmes: `Berhasil update produk dengan id ${idproduct}` , images: ''})
                })
                .catch(err => {
                    console.log(err)
                    // dispatch({
                    //     type: 'EDITPRODUCT1_FAIL',
                    //     payload: err.response.data

                    // })
                    this.setState({ error: true, errormes: 'Gagal update produk, refresh kembali dan coba lagi', images: '' })
                })
        }
        this.setState({ images: '' })
    }

    // onChangeStock = (e) => {
    //     this.setState({ stok: e.target.value })
    // }

    onRemove = () => {
        // this.props.deletePhoto(this.props.location.pathname.slice(13))
        let idproduct = this.props.location.pathname.slice(13)
        Axios.post(`${URL_API}/defaultphoto-product1/${idproduct}`)
            .then(res => {
                this.fetchData()
                this.setState({ images: '', berhasil: true, berhasilmes: 'Berhasil remove foto produk resep diganti dengan default' })
            })
            .catch(err => {
                this.setState({ error: true, errormes: 'Gagal remove foto produk, refresh dan coba lagi' , images: ''})
            })
    }

    render() {
        if (this.props.role !== "admin") {
            return <Redirect to="/" />
        }
        return (
            <div>
                <NavBar />
                <div style={{ padding: '100px 50px' }}>
                    {/* <Alert variant="success" onClose={() => this.setState({ showmodal: true })} dismissible show={this.state.showmodal===true ? false : this.props.show}>
                        <Alert.Heading>{this.props.upload1an}</Alert.Heading>
                    </Alert> */}
                    <div style={styles.container}>
                        <div style={styles.imageDiv}>
                            <Image style={styles.image} src={this.state.product ? `https://api-pharmacy-2.purwadhikafs2.com/${this.state.product.link_foto}` : ""} />
                            <div style={styles.buttonProfile}>
                                <form encType="multipart/form-data">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="IMG"
                                        onChange={(e) => this.setState({ images: e.target.files[0], adafoto: true })}
                                    />
                                </form>
                                <Button
                                    className="button"
                                    // variant="success"
                                    style={{ background: '#DF2E2E', border: 'none' }}
                                    onClick={this.onRemove}
                                >
                                   <i class="fas fa-trash" style={{ marginRight: '10px' }}></i> Remove
                                </Button>
                            </div>
                            <div style={styles.h4}>
                                <h4 style={{ marginTop: '25px' }}>Nama Obat</h4>
                                {/* <FloatingLabel
                                    controlId="floatingInput"
                                    label="Nama Obat"
                                    className="mb-1"
                                >                                    */}
                                <FormControl
                                    // placeholder={this.state.product ? this.state.product.nama : ""}
                                    value={this.state.nama}
                                    onChange={(e) => this.setState({ nama: e.target.value })}
                                    type="text"
                                    ref="namaobat"
                                    placeholder="namaobat"
                                />
                                {/* </FloatingLabel> */}
                                <h4 style={styles.h4}>Harga</h4>
                                <FormControl className="mb-1"
                                    // placeholder={this.state.product ? `Rp ${(this.state.product.harga).toLocaleString()}` : ""}
                                    value={this.state.harga}
                                    onChange={(e) => this.setState({ harga:+e.target.value})}
                                    type="number"
                                    ref="harga"
                                />
                                <h4 style={styles.h4}>Satuan</h4>
                                <FormControl className="mb-1"
                                    // placeholder={this.state.product ? this.state.product.satuan : ""}
                                    value={this.state.satuan}
                                    onChange={(e) => this.setState({ satuan: e.target.value })}
                                    type="text"
                                    ref="satuan"
                                />
                            </div>
                            <h4 style={styles.h4}>Stok
                                {/* <FormControl
                                    placeholder={this.state.product ? `Stok: ${this.state.product.stok}` : ""}
                                    type="text"
                                    ref="nama"
                                /> */}
                            </h4>
                            {this.props.username
                                ?
                                <div style={styles.controlDiv}>
                                    <div style={styles.inputJumlahStokDiv}>
                                        <Button variant="outline-primary" disabled={this.state.stok === 0 ? true : false} onClick={() => this.setState({ stok: this.state.stok - 1 })}>-</Button>
                                        <Form.Control
                                            style={styles.form}
                                            type="number"
                                            value={this.state.stok}
                                            //setiap placeholder ada state masing2
                                            onChange={(e) => this.setState({ stok: +e.target.value })}
                                            ref="stok"

                                        />
                                        <Button variant="outline-primary" onClick={() => this.setState({ stok: this.state.stok + 1 })}>+</Button>
                                    </div>
                                    <Button style={styles.button} variant="primary" onClick={this.handleUpload} className="d-grid gap-2">Update data</Button>
                                </div>
                                :
                                <div></div>
                            }

                        </div>
                        <div style={styles.textDiv}>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Kategori</h5>
                                {/* <Form.Control style={styles.filterForm} type="text" placeholder="Name" ref="name" /> */}
                                <Form.Select style={styles.filterForm} ref="category" value={this.state.kategori} onChange={(e) => this.setState({ kategori: e.target.value })} >
                                    <option value="">Category</option>
                                    <option value="Asma">Asma</option>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Jantung">Jantung</option>
                                    <option value="Kulit">Kulit</option>
                                    <option value="Mata">Mata</option>
                                    <option value="Saluran Pencernaan">Saluran Pencernaan</option>
                                </Form.Select>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Deskripsi</h5>
                                <p style={{ textAlign: 'justify' }}>
                                    {/* <FloatingLabel controlId="floatingTextarea2" label="Deskripsi"> */}
                                    <FormControl
                                        // placeholder={this.state.product ? this.state.product.deskripsi : ""}
                                        as="textarea"
                                        value={this.state.deskripsi}
                                        onChange={(e) => this.setState({ deskripsi: e.target.value })}
                                        type="text"
                                        ref="deskripsi"
                                        placeholder="deskripsi"
                                        // rows="25"
                                        style={{ height: '100px' }}
                                    />
                                    {/* </FloatingLabel> */}
                                </p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Indikasi Umum</h5>
                                <p style={{ textAlign: 'justify' }}>
                                    {/* <FloatingLabel controlId="floatingTextarea2" label="Indikasi Umum"> */}
                                    <FormControl
                                        // placeholder={this.state.product ? this.state.product.indikasi_umum : ""}
                                        as="textarea"
                                        value={this.state.indikasi_umum}
                                        onChange={(e) => this.setState({ indikasi_umum: e.target.value })}
                                        type="text"
                                        ref="indikasi_umum"
                                        style={{ height: '55px' }}
                                    />
                                    {/* </FloatingLabel> */}
                                </p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Komposisi</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.komposisi : ""}
                                    value={this.state.komposisi}
                                    onChange={(e) => this.setState({ komposisi: e.target.value })}
                                    type="text"
                                    ref="komposisi"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Dosis</h5>
                                <p style={{ textAlign: 'justify' }}>
                                    {/* <FloatingLabel controlId="floatingTextarea2" label="Dosis"> */}
                                    <FormControl
                                        // placeholder={this.state.product ? this.state.product.dosis : ""}
                                        as="textarea"
                                        value={this.state.dosis}
                                        onChange={(e) => this.setState({ dosis: e.target.value })}
                                        type="text"
                                        ref="dosis"
                                        style={{ height: '65px' }}
                                    />
                                    {/* </FloatingLabel> */}
                                </p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Aturan Pakai</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.aturan_pakai : ""}
                                    value={this.state.aturan_pakai}
                                    onChange={(e) => this.setState({ aturan_pakai: e.target.value })}
                                    type="text"
                                    ref="aturan_pakai"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Kontra Indikasi</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.kontra_indikasi : ""}
                                    value={this.state.kontra_indikasi}
                                    onChange={(e) => this.setState({ kontra_indikasi: e.target.value })}
                                    type="text"
                                    ref="kontra_indikasi"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Perhatian</h5>
                                <p style={{ textAlign: 'justify' }}>
                                    {/* <FloatingLabel controlId="floatingTextarea2" label="Perhatian"> */}
                                    <FormControl
                                        // placeholder={this.state.product ? this.state.product.perhatian : ""}
                                        as="textarea"
                                        value={this.state.perhatian}
                                        onChange={(e) => this.setState({ perhatian: e.target.value })}
                                        type="text"
                                        ref="perhatian"
                                    />
                                    {/* </FloatingLabel> */}
                                </p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Efek Samping</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.efek_samping : ""}
                                    value={this.state.efek_samping}
                                    onChange={(e) => this.setState({ efek_samping: e.target.value })}
                                    type="text"
                                    ref="efek_samping"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Segmentasi</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.segmentasi : ""}
                                    value={this.state.segmentasi}
                                    onChange={(e) => this.setState({ segmentasi: e.target.value })}
                                    type="text"
                                    ref="segmentasi"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Kemasan</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.kemasan : ""}
                                    value={this.state.kemasan}
                                    onChange={(e) => this.setState({ kemasan: e.target.value })}
                                    type="text"
                                    ref="kemasan"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Manufaktur</h5>
                                <p style={{ textAlign: 'justify' }}><FormControl
                                    // placeholder={this.state.product ? this.state.product.manufaktur : ""}
                                    value={this.state.manufaktur}
                                    onChange={(e) => this.setState({ manufaktur: e.target.value })}
                                    type="text"
                                    ref="manufaktur"
                                /></p>
                            </div>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>No. Registrasi</h5>
                                <p style={{ textAlign: 'justify' }}>
                                    {/* <FloatingLabel controlId="floatingTextarea2" label="No. Registrasi"> */}
                                    <FormControl
                                        // placeholder={this.state.product ? this.state.product.no_registrasi : ""}
                                        as="textarea"
                                        value={this.state.no_registrasi}
                                        onChange={(e) => this.setState({ no_registrasi: e.target.value })}
                                        type="text"
                                        ref="no_registrasi"
                                    />
                                    {/* </FloatingLabel> */}
                                </p>
                            </div>
                        </div>
                        <Modal show={this.state.error} onHide={() => this.setState({ error: false, errormes: '' })}>
                            <Modal.Header closeButton>
                                <Modal.Title>Error!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{this.state.errormes}</Modal.Body>
                            <Modal.Footer>
                                <Button style={{ backgroundColor: '#000051', color: 'white' }} onClick={() => this.setState({ error: false, errormes: '' })}>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.berhasil} onHide={() => this.setState({ berhasil: false, berhasilmes: '' })}>
                            <Modal.Header closeButton>
                                <Modal.Title>Congrats!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{this.state.berhasilmes}</Modal.Body>
                            <Modal.Footer>
                                <Button style={{ backgroundColor: '#000051', color: 'white' }} onClick={() => this.setState({ berhasil: false, berhasilmes: '' })}>
                                    OK
                                </Button>
                            </Modal.Footer>
                        </Modal>
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
        margin: '0 0 10px',
        justifyContent: 'left',
        alignItems: 'left',
        textAlign: 'left'
    },
    imageDiv: {
        height: '150vh',
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        color: '#343892'
    },
    textDiv: {
        flex: 3,
        padding: '0 20px'
    },
    controlDiv: {
        marginTop: '10px',
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
        width: '5vw',
        textAlign: 'center'
    },
    textDescription: {
        borderBottom: '1px solid #80F1B2',
        marginBottom: '1rem',
        color: '#343892'
    }, button: {
        backgroundColor: '#343892',
        border: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        width: '400px',
        marginBottom: '30px'
        // { width: '10vw',  }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { editProduct1 })(EditSatuanPage)
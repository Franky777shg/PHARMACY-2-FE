import React, { useState } from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// Redux
import { connect } from 'react-redux'
import { uploadProduct1 } from '../redux/actions'
// React Bootstrap
import {
    Image,
    Button,
    Form,
    InputGroup,
    FormControl,
    Alert
} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';

const URL_API = 'http://localhost:2000/product'

class AddPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            // qty: 1,
            max: null,
            images: '',
            idEdit: null,
            remove: false,
            products: [],
            selectValue: ''
        }
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data)
        data.append('IMG', this.state.images)
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
            no_registrasi

        }
        this.props.uploadProduct1(data, body)
        this.setState({ images: '' })

        console.log(this.props.upload1an)
        console.log(this.props.show)
        // if (this.props.show) {
        //     return (
        //         <Alert variant="success">
        //             <Alert.Heading>{this.show.upload1an}</Alert.Heading>
        //             <hr />
        //             <p className="mb-0">
        //                 Whenever you need to, be sure to use margin utilities to keep things nice
        //                 and tidy.
        //             </p>
        //         </Alert>
        //     )
        // }

        // function AlertDismissibleExample() {
        // const [show, setShow] = useState(true);

        // return(
        //     <div>if (this.props.show===true) {
        //     return (
        //         <div>
        //         <Alert variant="success" onClose={!this.props.show} dismissible>
        //             <Alert.Heading>{this.props.upload1an}</Alert.Heading>
        //             <p>
        //                 Change this and that and try again. Duis mollis, est non commodo
        //                 luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
        //                 Cras mattis consectetur purus sit amet fermentum.
        //             </p>
        //         </Alert>
        //         </div>
        //     );
        // }

        this.refs.namaobat.value = ''
        this.refs.harga.value = ''
        this.refs.satuan.value = ''
        // const link_foto = res.data
        this.refs.stok.value = ''
        this.refs.category.value = ''
        this.refs.deskripsi.value = ''
        this.refs.indikasi_umum.value = ''
        this.refs.komposisi.value = ''
        this.refs.dosis.value = ''
        this.refs.aturan_pakai.value = ''
        this.refs.kontra_indikasi.value = ''
        this.refs.perhatian.value = ''
        this.refs.efek_samping.value = ''
        this.refs.segmentasi.value = ''
        this.refs.kemasan.value = ''
        this.refs.manufaktur.value = ''
        this.refs.no_registrasi.value = ''

        //         return <Button onClick={this.props.show}>Show Alert</Button>;
        //       }

        //       AlertDismissibleExample()
    }

    handleChoose = (e) => {
        this.setState({ images: e.target.files[0] })
        console.log('e.target.files', e.target.files)
        console.log(e.target.files[0])
        console.log(this.state.images)
    }

    handleRemove = (e) => {
        // console.log('e.target.files', e.target.files)
        // this.setState({ images: '' })
    }

    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
    }


    render() {
        const { upload1an } = this.props
        const { remove } = this.state
        if (this.props.role === "admin") {
            return (
                <div>
                    <NavBar />
                    <div style={{ padding: '125px 50px' }}>
                        <div style={styles.container}>
                            <div style={styles.imageDiv}>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vw' }}>
                                    <h1>Add Products</h1>

                                    {/* <img style={styles.imgProf} src={`url(${upload1an ? URL_API + upload1an : null})`}/> */}
                                </div>
                                <div >
                                    <div style={{ margin: '3vh', marginLeft: '13vw' }}>
                                        <form encType="multipart/form-data">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="IMG"
                                                onChange={(e) => this.setState({ images: e.target.files[0] })}
                                            />
                                        </form>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '3vh' }}>
                                        {/* <div>
                                <Button
                                    variant="primary" style={styles.button}
                                    className="button"
                                    variant="success"
                                    onClick={this.handleUpload}
                                >
                                    <i class="fas fa-file-upload" style={{ marginRight: '10px' }}></i>
                                    Upload
                                </Button>
                            </div> */}
                                        <div style={styles.contButton}>
                                            <Button variant="primary" style={{ background: '#DF2E2E', border: 'none' }} onClick={() => this.setState({ images: '' })}>
                                                <i class="fas fa-trash" style={{ marginRight: '10px' }}></i>
                                                Remove
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div style={styles.textDiv}>


                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Nama obat</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Nama obat"
                                            type="text"
                                            ref="namaobat"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Harga Obat</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Rp"
                                            type="number"
                                            ref="harga"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Satuan obat</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="ml, botol, dus dan sebagainya"
                                            type="text"
                                            ref="satuan"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Stok obat</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Jumlah obat tersedia dalam satuannya"
                                            type="number"
                                            ref="stok"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Kategori</h5>
                                    {/* <Form.Control style={styles.filterForm} type="text" placeholder="Name" ref="name" /> */}
                                    <Form.Select style={styles.filterForm} ref="category" value={this.state.selectValue} onChange={this.handleChange} >
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
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Deskripsi"
                                            type="text"
                                            ref="deskripsi"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Indikasi Umum</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Indikasi Umum"
                                            type="text"
                                            ref="indikasi_umum"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Komposisi</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Komposisi"
                                            type="text"
                                            ref="komposisi"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Dosis</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Dosis"
                                            type="text"
                                            ref="dosis"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Aturan Pakai</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Aturan Pakai"
                                            type="text"
                                            ref="aturan_pakai"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Kontra Indikasi</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Kategori"
                                            type="text"
                                            ref="kontra_indikasi"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Perhatian</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Perhatian"
                                            type="text"
                                            ref="perhatian"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Efek Samping</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Efek Samping"
                                            type="text"
                                            ref="efek_samping"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Segmentasi</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Segmentasi"
                                            type="text"
                                            ref="segmentasi"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Kemasan</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Kemasan"
                                            type="text"
                                            ref="kemasan"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Manufaktur</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Manufaktur"
                                            type="text"
                                            ref="manufaktur"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>No. Registrasi</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="Nomor Registrasi"
                                            type="text"
                                            ref="no_registrasi"
                                        /></InputGroup>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="primary" style={styles.button}
                            className="button"
                            variant="success"
                            onClick={this.handleUpload}
                        // as={Link} to={`http://localhost:3000/product/detail-product/${this.props.halproduk}`}
                        >
                            <i class="fas fa-file-upload" style={{ marginRight: '10px' }}></i>
                            Upload
                        </Button>
                    </div>
                    <Alert variant="success" onClose={!this.props.show} dismissible show={this.props.show}>
                        <Alert.Heading>{this.props.upload1an}</Alert.Heading>
                    </Alert>
                </div>
            )
        }
        else {
            return <Redirect to="/login" />
        }
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
        borderBottom: '1px solid #343892',
        marginBottom: '1rem',
        color: '#343892'
    },
    button: {
        backgroundColor: '#343892',
        border: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        width: '400px',
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        upload1an: state.productReducer.upload1an,
        halproduk: state.productReducer.halproduk,
        show: state.productReducer.show,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { uploadProduct1 })(AddPage)
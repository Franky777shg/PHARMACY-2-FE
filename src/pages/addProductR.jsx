import React from 'react'
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
    FormControl
} from 'react-bootstrap'

const URL_API = 'http://localhost:2000/product'

class AddPageR extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            // qty: 1,
            max: null,
            images: '',
            idEdit: null,
            remove: false,
            products: []
        }
    }

    fetchData = () => {
        let idProduk = this.props.location.pathname.slice(9)
        // console.log(idUser)
        Axios.get(`http://localhost:2000/product/detail-product/${idProduk}`)
            .then(res => {
                // console.log(res.data)
                this.setState({ users: res.data })
                // console.log(this.state.users[0].username)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // handleUpload = () => {
    //     const data = new FormData()
    //     console.log(data) //siapin form data untuk image

    //     data.append('IMG', this.state.images)
    //     console.log(data.get('IMG')) // masukin data Image ke formData

    //     // let idUser = this.props.location.pathname.slice(9)
    //     // console.log(idUser)
    //     Axios.post(`${URL_API}/add-product1`, data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(res => {
    //             this.setState({ images: res.data })
    //             this.fetchData()
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    //     // this.setState({ images: '' })
    // }

    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }

    handleRemove = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: '' })
    }
    handleUpload = () => {
        const data = new FormData()
        console.log(data)
        data.append('IMG', this.state.images)
        // console.log(data.get('IMG'))
        this.props.uploadProduct1(data)
        this.setState({images: ''})
    }

    onAddP1 = () => {
        const data = new FormData()
        console.log(data) //sia pin form data untuk image
        console.log("tes")
        data.append('IMG', this.state.images)
        console.log(data.get('IMG')) // masukin data Image ke formData

        // let idUser = this.props.location.pathname.slice(9)
        // console.log(idUser)
        Axios.post(`${URL_API}/add-product1foto`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                this.setState({ images: res.data })
                // this.fetchData()
                console.log(res.data)
                // const nama = this.refs.nama.value
                // const harga = +this.refs.harga.value
                // const satuan = this.refs.satuan.value
                // // const link_foto = res.data
                // const stok = +this.refs.stok.value
                // const kategori = this.refs.kategori.value
                // const deskripsi = this.refs.deskripsi.value
                // const indikasi_umum = this.refs.indikasi_umum.value
                // const komposisi = this.refs.komposisi.value
                // const dosis = this.refs.dosis.value
                // const aturan_pakai = this.refs.aturan_pakai.value
                // const kontra_indikasi = this.refs.kontra_indikasi.value
                // const perhatian = this.refs.perhatian.value
                // const efek_samping = this.refs.efek_samping.value
                // const segmentasi = this.refs.segmentasi.value
                // const kemasan = this.refs.kemasan.value
                // const manufaktur = this.refs.manufaktur.value
                // const no_registrasi = this.refs.no_registrasi.value

                // const body = {
                //     nama,
                //     harga,
                //     satuan,
                //     // link_foto,
                //     stok,
                //     kategori,
                //     deskripsi,
                //     indikasi_umum,
                //     komposisi,
                //     dosis,
                //     aturan_pakai,
                //     kontra_indikasi,
                //     perhatian,
                //     efek_samping,
                //     segmentasi,
                //     kemasan,
                //     manufaktur,
                //     no_registrasi

                // }
                // console.log(body)


                // // let idUser = this.props.location.pathname.slice(9)
                // Axios.post(`${URL_API}/add-product1data`, body)
                //     .then(res => {
                //         console.log(res.data)
                //         this.setState({ products: res.data})
                //         // this.fetchData()
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            })
            .catch(err => {
                console.log(err)
            })

        // this.setState({ images: '' })



    }

    render() {
        const { upload1an } = this.props
        const { remove } = this.state
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
                                            onChange={remove ? (e) => this.handleChoose(e) : (e) => this.handleRemove(e)}
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
                                        <Button variant="primary" style={{ background: '#DF2E2E', border: 'none' }} onClick={() => this.setState({ remove: true })}>
                                            <i class="fas fa-trash" style={{ marginRight: '10px' }}></i>
                                            Remove
                                        </Button>
                                    </div>
                                </div>

                            </div>
                            {/* <Image style={styles.image} src={`url(${profilePic ? URL_API + profilePic : null})`} />
                            <h3 style={styles.h3}>{this.state.product ? this.state.product.nama : ""}</h3>
                            <h4 style={styles.h4}>{this.state.product ? `Rp ${(this.state.product.harga).toLocaleString()}` : ""}</h4>
                            <h4 st  yle={styles.h4}>{this.state.product ? this.state.product.satuan : ""}</h4>
                            <h4 style={styles.h4}>{this.state.product ? `Stok: ${this.state.product.stok}` : ""}</h4> */}
                            {/* {this.props.username
                                ?
                                <div style={styles.controlDiv}>
                                    <div style={styles.inputJumlahStokDiv}>
                                        <Button variant="primary" disabled={this.state.qty === 1 ? true : false} onClick={() => this.setState({ qty: this.state.qty - 1 })}>-</Button>
                                        <Form.Control
                                            style={styles.form}
                                            type="text"
                                            value={this.state.qty}
                                            onChange={(e) => this.onChangeQty(e)}
                                        />
                                        <Button variant="primary" disabled={this.state.qty === this.state.max ? true : false} onClick={() => this.setState({ qty: this.state.qty + 1 })}>+</Button>
                                    </div>
                                    <Button style={{ width: '10vw', marginBottom: '30px' }} variant="success">Add to Cart</Button>
                                </div>
                                :
                                <div></div>
                            } */}

                        </div>
                        <div style={styles.textDiv}>


                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Nama obat</h5>
                                <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                </InputGroup.Text>
                                    <FormControl
                                        placeholder="Nama obat"
                                        type="text"
                                        ref="nama"
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
                                        placeholder="ml, botol,dus dan sebagainya"
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
                                <Form.Select style={styles.filterForm} ref="category">
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
                                        ref="fullname"
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
                    >
                        <i class="fas fa-file-upload" style={{ marginRight: '10px' }}></i>
                        Upload
                    </Button>
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
        borderBottom: '1px solid #80F1B2',
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
        upload1an: state.productReducer.username
    }
}

export default connect(mapStateToProps, { uploadProduct1 })(AddPageR)


// const URL_API = 'http://localhost:2000/'
// class ProfilePage extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state= {
//           images:''
//       }
//     }
//     handleChoose = (e) => {
//         console.log('e.target.files', e.target.files)
//         this.setState({images: e.target.files[0]})
//     }
//     handleUpload = () => {
//         const data = new FormData()
//         console.log(data)
//         data.append('IMG', this.state.images)
//         console.log(data.get('IMG'))
//         this.props.uploadFile(data, this.props.idusers)
//         this.setState({images: ''})
//     }
//     render(){
//         const { profilePic } = this.props
//         console.log(this.state.images)
//         return (
//             <div>
//                 <h1>Profile Page</h1>
//                 <div style={styles.profileContainer}>
//                     <div style={styles.profileBox}>
//                         <div
//                             style={{
//                                 height: '100%',
//                                 width: '100%',
//                                 backgroundColor: 'blue',
//                                 backgroundImage: `url(${profilePic ? URL_API + profilePic : null})`,
//                                 backgroundPosition: 'center',
//                                 backgroundSize: 'contain',
//                                 backgroundRepeat: 'no-repeat'
//                             }}>
//                         </div>
//                         <div style={styles.buttonProfile}>
//                             <form encType="multipart/form-data">
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     name="IMG"
//                                     onChange={(e) => this.handleChoose(e)}
//                                 />
//                             </form>
//                             <Button
//                                 className="button"
//                                 variant="success"
//                                 onClick={this.handleUpload}
//                             >
//                                 Upload
//                             </Button>
//                         </div>
//                     </div>
//                 </div >
//             </div>
//         );
//     }
// }

// const styles = {
//     profileContainer: {
//         width: '100%',
//         height: '90vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: 'violet'
//     },
//     profileBox: {
//         width: '50vw',
//         height: '75vh',
//         // backgroundColor: 'yellowgreen',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: '2% 5%',
//     },
//     buttonProfile: {
//         marginTop: '3%'
//     }
// }

// const mapStatetoProps = (state) => {
//     return {
//         idusers: state.userReducer.id,
//         profilePic: state.userReducer.profilePic
//     }
// }

// export default connect(mapStatetoProps, { uploadFile })(ProfilePage);
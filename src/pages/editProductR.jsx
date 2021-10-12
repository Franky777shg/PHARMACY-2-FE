import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// Redux
import { connect } from 'react-redux'
import { editProductR } from '../redux/actions'
// React Router DOM
import { Link, Redirect } from 'react-router-dom'

// React Bootstrap
import {
    Image,
    Button,
    Form,
    FormControl
} from 'react-bootstrap'

const URL_API = 'http://localhost:2000/product'

class EditSatuanPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            qty: 1,
            selectValue:'',
            images:'',
            maxbotol: null,
            maxml: null,
            stok_botol: null,
            nama: null,
            harga: null,
            stok_ml: null,
            kategori: null,
            message:''
        }
    }

    componentDidMount() {
        let idProduct = this.props.location.pathname.slice(13)
        Axios.get(`${URL_API}/detail-product/${idProduct}`)
            .then(res => {
                this.setState({
                    product: res.data, maxbotol: res.data.stok_botol, stok_ml: res.data.stok_ml,
                    nama: res.data.nama,
                    harga: res.data.harga,
                    stok_botol: res.data.stok_botol,
                    kategori: res.data.kategori,
                    deskripsi: res.data.deskripsi,
                    
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChangeQty = (e) => {
        let value = +e.target.value
        let maxQty = this.state.product.stok_botol

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
        let data = new FormData()
        console.log(data)
        console.log(this.state.images)
        let message=''
        data.append('IMG', this.state.images)
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
        // const link_foto = res.data
        let stok_botol = +this.refs.stok_botol.value
        let kategori = this.refs.category.value
        let stok_ml = +this.refs.stok_ml.value
        // let message = this.state.message
        let idproduct = this.props.location.pathname.slice(13)
        let body = {
            nama,
            harga,
            stok_botol,
            // link_foto,
            stok_ml,
            kategori,
            idproduct,
            message: this.state.message
        }
        // console.log(data.get('IMG'),body)
        console.log(this.state.images)  
        console.log(data)  
        console.log(data.length)
        // console.log(message)
        this.props.editProduct1(data,body, idproduct)
        // this.setState({ images: '' })
    }

    // onChangeStock = (e) => {
    //     this.setState({ stok: e.target.value })
    // }

   

    render() {
        if (this.props.role !== "admin") {
            return <Redirect to="/" />
        }
        return (
            <div>
                <NavBar />
                <div style={{ padding: '100px 50px' }}>
                    <div style={styles.container}>
                        <div style={styles.imageDiv}>
                            <Image style={styles.image} src={this.state.product ? this.state.product.link_foto : ""} />
                            <div style={styles.buttonProfile}>
                                <form encType="multipart/form-data">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="IMG"
                                        onChange={(e) => this.setState({ images: e.target.files[0], message: '0' })}
                                    />
                                </form>
                                <Button
                                    className="button"
                                    variant="success"
                                    onClick={this.handleUpload}
                                >
                                    Upload
                                </Button>
                            </div>
                            <h3 style={styles.h3}>Nama Obat<FormControl
                                // placeholder={this.state.product ? this.state.product.nama : ""}
                                value={this.state.nama}
                                onChange={(e) => this.setState({ nama: e.target.value })}
                                type="text"
                                ref="namaobat"
                            /></h3>
                            <h4 style={styles.h4}>Harga<FormControl
                                // placeholder={this.state.product ? `Rp ${(this.state.product.harga).toLocaleString()}` : ""}
                                value={this.state.harga}
                                onChange={(e) => this.setState({ harga: `Rp ${e.target.value.toLocaleString()}` })}
                                type="number"
                                ref="harga"
                            /></h4>
 
                          

                        </div>
                        <div style={styles.textDiv}>
                            <div style={styles.textDescription}>
                                <h5 style={{ marginBottom: '2px' }}>Kategori</h5>
                                {/* <Form.Control style={styles.filterForm} type="text" placeholder="Name" ref="name" /> */}
                                <Form.Select style={styles.filterForm} ref="category" value={this.state.kategori} onChange={(e) => this.setState({kategori: e.target.value})} >
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
                            <h4 style={styles.h4}>Stok Botol
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
                                        <Button variant="outline-primary" disabled={this.state.stok_botol === 0 ? true : false} onClick={() => this.setState({ stok: this.state.stok_botol - 1 })}>-</Button>
                                        <Form.Control
                                            style={styles.form}
                                            type="number"
                                            value={this.state.stok_botol}
                                            //setiap placeholder ada state masing2
                                            onChange={(e) => this.setState({ stok_botol: e.target.value })}
                                            ref="stok_botol"

                                        />
                                        <Button variant="outline-primary" onClick={() => this.setState({ stok: this.state.stok_botol + 1 })}>+</Button>
                                    </div>
                                   </div>
                                :
                                <div></div>
                            }
                            <h4 style={styles.h4}>Stok ml
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
                                        <Button variant="outline-primary" disabled={this.state.stok_ml === 0 ? true : false} onClick={() => this.setState({ stok_ml: this.state.stok_ml - 1 })}>-</Button>
                                        <Form.Control
                                            style={styles.form}
                                            type="number"
                                            value={this.state.stok_ml}
                                            //setiap placeholder ada state masing2
                                            onChange={(e) => this.setState({ stokml: e.target.value })}
                                            ref="stok_ml"

                                        />
                                        <Button variant="outline-primary" onClick={() => this.setState({ stok_ml: this.state.stok_ml + 1 })}>+</Button>
                                    </div>
                                    <Button style={{ width: '10vw', marginBottom: '30px' }} variant="primary" onClick={this.handleUpload}>Update data</Button>
                                </div>
                                :
                                <div></div>
                            }
                            </div>
                            
                        </div>
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
        margin: '0 0 10px'
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
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, {editProductR})(EditSatuanPage)
import React, { useState } from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar'

// Redux
import { connect } from 'react-redux'
import { uploadProductR } from '../redux/actions'
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
        // const link_foto = res.data
        let kategori = this.refs.category.value
        let stokbotol = +this.refs.stokbotol.value
        let stokml = +this.refs.stokml.value
        

        let body = {
            nama,
            harga,
            kategori,
            stokbotol,
            // link_foto,
            stokml
        }
        this.props.uploadProductR(data, body)
        this.setState({ images: '' })

        console.log(this.props.uploadr)
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

        this.refs.namaobat.value =''
        this.refs.harga.value=''
        // const link_foto = res.data
        this.refs.category.value=''
        this.refs.stokbotol.value=''
        this.refs.stokml.value=''

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
                    <div style={{ display: 'flex', paddingTop:'100px', marginLeft: '10vw',color:'#343892' }}>
                                    <h1>Add Products</h1>

                                    {/* <img style={styles.imgProf} src={`url(${upload1an ? URL_API + upload1an : null})`}/> */}
                                </div>
                    <div style={{ padding: '45px 50px' }}>
                        
                        <div style={styles.container}>
                            <div style={styles.imageDiv}>
                               
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
                                    <h5 style={{ marginBottom: '2px' }}>Stok obat dalam satuan botol</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="botol"
                                            type="number"
                                            ref="stokbotol"
                                        /></InputGroup>
                                </div>
                                <div style={styles.textDescription}>
                                    <h5 style={{ marginBottom: '2px' }}>Stok obat dalam satuan ml</h5>
                                    <InputGroup className="mb-3"><InputGroup.Text id="basic-addon1"><i class="fas fa-pills"></i>
                                    </InputGroup.Text>
                                        <FormControl
                                            placeholder="ml"
                                            type="number"
                                            ref="stokml"
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
                        <Alert.Heading>{this.props.uploadr}</Alert.Heading>
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
        height: '105vh',
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
        uploadr: state.productReducer.uploadr,
        halproduk: state.productReducer.halproduk,
        show: state.productReducer.show,
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { uploadProductR })(AddPage)
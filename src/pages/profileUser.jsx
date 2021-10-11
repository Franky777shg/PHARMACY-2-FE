import React from 'react'
import {
    FormControl,
    InputGroup,
    Button,
} from 'react-bootstrap'
import Axios from 'axios'
import { connect } from 'react-redux'
import NavBar from '../components/navbar'
import {uploadFile, deletePhoto} from '../redux/actions'
import {PHOTO} from '../assets'

const URL_API = 'http://localhost:2000/'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility1: false,
            users: [],
            editUser: [],
            idEdit: null,
            images: ''

        }
    }

    fetchData = () => {
        let token = localStorage.getItem("token")
        Axios.get(`http://localhost:2000/user/userbyid`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ users: res.data })
                // console.log(this.state.users[0].username)
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.fetchData()
    }

    renderDataUser = () => {
        return (
            <div>
                {this.state.users.map((item, index) => {
                    if (this.state.idEdit === item.idUser) {
                        return (
                            <div key={index}>
                                <label>Full Name</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-user-check"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Full Name"
                                        defaultValue={item.fullname}
                                        type="text"
                                        ref="fullnameedit"
                                    />
                                </InputGroup>
                                <label>Email</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-envelope"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Email"
                                        defaultValue={item.email}
                                        type="text"
                                        ref="emailedit"
                                    />
                                </InputGroup>
                                <label>Address</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-home"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Address"
                                        defaultValue={item.address}
                                        type="text"
                                        ref="addressedit"
                                    />
                                </InputGroup>
                                <label>Age</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-street-view"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Age, must number"
                                        defaultValue={item.age}
                                        type="number"
                                        ref="ageedit"
                                    />
                                </InputGroup>
                                <label>Gender</label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="fas fa-street-view"></i>
                                    </InputGroup.Text>
                                    <FormControl
                                        style={styles.textprof2}
                                        placeholder="Edit Gender Female/ Male"
                                        defaultValue={item.gender}
                                        type="text"
                                        ref="genderedit"
                                    />
                                </InputGroup>
                            </div>
                        )
                    }
                    return (
                        <div>
                            <label>Full Name</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-user-check"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.users[0] ? this.state.users[0].fullname : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Email</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-envelope"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.users[0] ? this.state.users[0].email : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Address</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-home"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.users[0] ? this.state.users[0].address : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Age</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-street-view"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.users[0] ? this.state.users[0].age : ""}
                                </InputGroup.Text>
                            </InputGroup>
                            <label>Gender</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i class="fas fa-street-view"></i>
                                </InputGroup.Text>
                                <InputGroup.Text style={styles.textprof}>
                                    {this.state.users[0] ? this.state.users[0].gender : ""}
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    )
                })}
            </div>
        )
    }

    onSave = () => {
        const fullnameEdit = this.refs.fullnameedit.value
        const emailEdit = this.refs.emailedit.value
        const addressEdit = this.refs.addressedit.value
        const ageEdit = +this.refs.ageedit.value
        const genderEdit = this.refs.genderedit.value

        const body = {
            fullname: fullnameEdit,
            email: emailEdit,
            address: addressEdit,
            age: ageEdit,
            gender: genderEdit
        }
        console.log(body)

        Axios.patch(`http://localhost:2000/user/edituser/${this.props.iduser}`, body)
            .then(res => {
                console.log(res.data)
                this.setState({ editUser: res.data, idEdit: null })
                this.fetchData()
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data) //siapin form data untuk image

        data.append('IMG', this.state.images)
        console.log(data.get('IMG')) // masukin data Image ke formData

        this.props.uploadFile(data, this.props.iduser)
        this.fetchData()
        this.setState({ images: '' })
    }

    onRemove = () => {
        this.props.deletePhoto(this.props.iduser)
        this.fetchData()
        this.setState({ images: '' })
    }

    render() {
        const {profilePic } = this.props
        const { images } = this.state
        console.log(images) //288
        console.log(profilePic) //images/IMG-1633710182861.jpg
        return (
            <div style={styles.cont}>
                < NavBar />
                <div style={styles.contForm}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vw' }}>
                        <h1>My Profile</h1>
                        <img style={styles.imgProf} src={profilePic ? `${URL_API}/${profilePic}` : PHOTO.default} />
                    </div>
                    <div >
                        <div style={{ margin:'3vh', marginLeft:'13vw'}}>
                            <form encType="multipart/form-data">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="IMG"
                                    onChange={(e) => this.handleChoose(e)}
                                />
                            </form>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', margin:'3vh' }}>
                            <div>
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
                            <div style={styles.contButton}>
                                <Button variant="primary" 
                                        style={{ background: '#DF2E2E', border: 'none' }}
                                        onClick={this.onRemove}
                                        >
                                    <i class="fas fa-trash" style={{ marginRight: '10px' }}></i>
                                    Remove
                                </Button>
                            </div>
                        </div>

                    </div>
                    {this.renderDataUser()}
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:'3vh' }}>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={styles.button} onClick={() => this.setState({ idEdit: this.state.idUser })}>
                                <i class="fas fa-user-edit" style={{ marginRight: '10px' }}></i>
                                Edit Profile
                            </Button>
                        </div>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={{ background: '#29BB89', border: 'none' }} onClick={() => this.onSave()}>
                                <i class="fas fa-save" style={{ marginRight: '10px' }}></i>
                                Save
                            </Button>
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
        display: 'flex',
        marginTop:'10vh'

    },
    contForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '40vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '12vh',
        marginTop: '12vh',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, .1)',
        padding: '2% 3%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.12)'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '10px'
    },
    button: {
        backgroundColor: '#6B7AA1',
        border: 'none'
    },
    goToRegis: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0'
    },
    imgProf: {
        height: '33vh',
        width: '16vw',
        display: 'flex',
        margin: '5px',
        borderRadius: '98px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    textprof: {
        width: '30vw',
        backgroundColor: 'rgba(255, 255, 255, .9)',
    },
    textprof2: {
        width: '30vw',
        backgroundColor: 'rgba(255, 255, 255, .5)',
    }
}

const mapStateToProps = (state) => {
    return {
        iduser : state.userReducer.id,
        profilePic : state.userReducer.profilePic
    }
}
export default connect (mapStateToProps, {uploadFile, deletePhoto})(ProfilePage)
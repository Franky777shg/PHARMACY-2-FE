import React from 'react'
import {
    FormControl,
    InputGroup,
    Button
} from 'react-bootstrap'
import Axios from 'axios'

// const idUser = this.props.location.pathname.slice(9)

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility1: false,
            users: [],
            editUser: [],
            idEdit: null

        }
    }

    fetchData = () => {
        let idUser = this.props.location.pathname.slice(9)
        // console.log(idUser)
        Axios.get(`http://localhost:2000/user/userbyid/${idUser}`)
            .then(res => {
                // console.log(res.data)
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
          fullname : fullnameEdit,
          email: emailEdit,
          address: addressEdit,
          age : ageEdit,
          gender : genderEdit
        }
        console.log(body)
        
        
        let idUser = this.props.location.pathname.slice(9)
        Axios.patch(`http://localhost:2000/user/edituser/${idUser}`, body)
            .then(res => {
                console.log(res.data)
                this.setState({ editUser: res.data, idEdit: null })
                this.fetchData()
            })
            .catch(err => {
                console.log(err)
            })
    
    }

    render() {
        // console.log(this.state.users)
        // console.log(this.state.users[0].username)
        return (
            <div style={styles.cont}>
                <div style={styles.contForm}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10vw' }}>
                        <h1>My Profile</h1>
                        <img style={styles.imgProf} src={'https://media.istockphoto.com/photos/young-hispanic-nurse-in-pink-scrubs-with-clipboard-picture-id157743225?b=1&k=20&m=157743225&s=170667a&w=0&h=y3dCPBIXD4JZ8R3ehQxj0Dy-BS_4PydxqQ3opW5rqKM='} alt="Girl in a jacket" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={styles.button}>
                                <i class="fas fa-file-upload" style={{ marginRight: '10px' }}></i>
                                Upload
                            </Button>
                        </div>
                        <div style={styles.contButton}>
                            <Button variant="primary" style={{ background: '#DF2E2E', border: 'none' }}>
                                <i class="fas fa-trash" style={{ marginRight: '10px' }}></i>
                                Remove
                            </Button>
                        </div>
                    </div>
                    {this.renderDataUser()}
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
        height: '30vh',
        width: '15vw',
        display: 'flex',
        margin: '5px',
        borderRadius: '200px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    textprof: {
        width: '30vw',
        backgroundColor: 'rgba(255, 255, 255, .6)',
    }
}

export default ProfilePage
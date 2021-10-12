import React from 'react'
import { Card, Button, InputGroup } from 'react-bootstrap'
import NavBar from '../components/navbar'
import Axios from 'axios'
import { connect } from 'react-redux'
import { PAY } from '../assets'
import { getDataResep, uploadResep } from '../redux/actions'

const URL_API = 'http://localhost:2000/'

class UploadResep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: '',
            recipes: [],
            done: 'Account Confirmation ',
            disabled: false

        }
    }


    fetchData = () => {
        Axios.get(`http://localhost:2000/profile/resepbyid/${this.props.idResep}`)
            .then(res => {
                console.log(res.data)
                this.setState({ recipes: res.data })
                console.log(this.state.recipes[0].idresep)
            })
            .catch(err => {
                console.log(err)
            })

    }
    componentDidMount() {
        this.fetchData()

    }

    addResep = () => {
        let newData = {
            date: `${new Date().toLocaleString()}`,
            order_number: `${Date.now()}`,
            idusers: `${this.props.iduser}`,
            image_resep: `${this.props.imageRes}`,
            status: 'waiting for approval',
        }
        console.log(newData)
        Axios.post(`http://localhost:2000/profile/newdata`, newData)
            .then(res => {
                console.log(res.data)
                this.setState({ recipes: res.data })
                this.props.getDataResep()
                this.setState({ done: 'Please Upload your recipe' })
                this.setState({ disabled: true })
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
        console.log(this.props.idResep)

        Axios.patch(`http://localhost:2000/profile/resep/${this.props.idResep}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ images: res.data })
                this.fetchData()
                this.props.getDataResep()
            })
            .catch(err => {
                console.log(err)
            })
        // this.props.uploadResep(data, this.props.idResep)
        this.fetchData()
        this.addResep()
        this.setState({ images: '' })
    }

    render() {
        const { imageRes, idResep } = this.props
        console.log(imageRes)
        console.log(idResep)
        return (
            <div style={styles.cont}>
                <NavBar />
                <div style={{ display: 'flex', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8vh' }}>
                        <h1 style={{ display: 'flex', marginLeft: '9vw', marginBottom: '5vh' }} >Upload Recipe</h1>
                        <div style={{ margin: '3vh', marginLeft: '13vw' }}>
                            <form encType="multipart/form-data">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="IMG"
                                    onChange={(e) => this.handleChoose(e)}
                                />
                            </form>
                        </div>
                        <div style={{ display: 'flex', marginLeft: '13vw' }}>
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
                        </div>
                        <InputGroup className="mb-3" style={{ marginTop: '12vh', marginLeft: '5vw' }}>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-user-check">  Status</i>
                            </InputGroup.Text>
                            <Button variant="info" style={{ width: '15vw' }} onClick={this.addResep} disabled={this.state.disabled} >{this.state.done}</Button>
                        </InputGroup>
                    </div>
                    <Card style={{ width: '20rem', marginTop: '0', marginLeft: '8vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Img variant="top" src={imageRes ? `${URL_API}/${imageRes}` : PAY.default} />
                        <Card.Body>
                            <Card.Title>Your Recipe</Card.Title>
                            <Card.Text>
                                Please click <strong>ACCOUNT CONFIRMATION </strong> before you upload your Recipe.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

const styles = {
    cont: {
        display: 'flex',
        flexDirection: 'column',
        background: "url(https://media.istockphoto.com/photos/empty-product-stand-platform-podium-with-cloud-picture-id1252597644?b=1&k=20&m=1252597644&s=170667a&w=0&h=hDkXmpVxiNFDBHiwJbkPLNUA-P_5DCEgILtHIrUiUIU=) no-repeat center",
        backgroundSize: 'cover',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '16vh',
        marginTop: '8vh'

    },
    button: {
        backgroundColor: '#6B7AA1',
        border: 'none'
    },

    //status : done upload foto(biru) --> waiting konfirmasi (yellow)--> accept by admin(green) --> payment --> on going process --> cart
}

const mapStateToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        imageRes: state.userReducer.resepPic,
        idResep: state.userReducer.idResep
    }
}

export default connect(mapStateToProps, { getDataResep, uploadResep })(UploadResep)
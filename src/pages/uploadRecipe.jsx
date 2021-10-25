import React from 'react'
import { Card, Button, InputGroup } from 'react-bootstrap'
import NavBar from '../components/navbar'
import Axios from 'axios'
import { connect } from 'react-redux'
import { PAY } from '../assets'
import { Link } from 'react-router-dom'
import { uploadResep, addResepAct, addPayment } from '../redux/actions' //getDataResep

const URL_API = 'http://localhost:2000/'

class UploadResep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: '',
            recipes: [], //hasil data id
            done: 'Account Confirmation ',
            disabled: false,
            totalHarga : '',
            statusNew : '',

        }
    }

    addResep = () => {
        let newData = {
            date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            order_number: `${Date.now()}`,
            iduser: `${this.props.iduser}`,
            image_resep: ``,
            status: 'Waiting For Approval',
        }
        console.log(newData)
        this.props.addResepAct(newData)
        this.setState({ done: 'Please Upload your recipe' })
        this.setState({ disabled: true })

    }

    fetchData = () => {
        Axios.get(`http://localhost:2000/profile/byid/${this.props.idResep}`)
            .then(res => {
                console.log(res.data[0])
                this.setState({ recipes: res.data[0] })
                this.setState({statusNew : res.data[0].status})
                console.log(this.state.statusNew)

            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.fetchData()
        this.totalBelanja()
    }

    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
        this.fetchData()
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data) //siapin form data untuk image

        data.append('IMG', this.state.images)
        console.log(data.get('IMG')) // masukin data Image ke formData

        this.props.uploadResep(data, this.props.idResep)
        this.fetchData()
        this.setState({ done : 'Waiting For Approval Recipe by Admin'})
        console.log(this.props.resep_Image)
        // this.setState({ images: '' })
    }

    totalBelanja = () => {
        let data2 = {
            order_number: this.props.order_Numb
        }
        console.log(data2)
        Axios.post(`http://localhost:2000/payment/total-harga`, data2)
            .then(res => {
                this.setState({ totalHarga: res.data.Total_Harga })
                console.log(res.data)
                console.log(this.state.totalHarga)
                this.fetchData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    addPayment = async () => {
        this.fetchData()
        this.totalBelanja()
        this.state.statusNew === 'Waiting For Payment' ? this.setState({disabled:false}) : this.setState({disabled:true})
        let newData = {
            order_number: `${this.props.order_Numb}`,
            iduser : this.props.iduser,
            payment_proof_resep: ``,
            total_belanja: parseInt(this.state.totalHarga),
        }
        console.log(newData)
        await this.props.addPayment(newData)
        // Axios.post(`http://localhost:2000/payment/newdatapayment`, newData)
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // console.log(this.props.idPayment) //3
        // console.log(this.props.order_numb)
        // console.log(this.props.status)
    }


    render() {
        const { resep_Image} = this.props
        // console.log(this.state.recipes.status)
        return (
            <div style={styles.cont}>
                <NavBar />
                <div style={{ display: 'flex', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8vh' }}>
                        <h1 style={{ display: 'flex', marginLeft: '9vw', marginBottom: '5vh' }} >Upload Recipe</h1>
                        <InputGroup className="mb-3" style={{ marginTop: '2vh', marginLeft: '5vw' }}>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-user-check">  Status</i>
                            </InputGroup.Text>
                            <Button variant="info" style={{ width: '15vw' }} onClick={this.addResep} disabled={this.state.disabled} >{this.state.done}</Button>
                        </InputGroup>
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
                    </div>
                    <Card style={{ width: '20rem', marginTop: '0', marginLeft: '8vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Img variant="top" src={resep_Image ? `${URL_API}/${resep_Image}` : PAY.default} />
                        <Card.Body>
                            <Card.Title>Your Recipe</Card.Title>
                            <Card.Text>
                                Please click <strong>ACCOUNT CONFIRMATION </strong> before you upload your Recipe.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <Button variant="info" style={{ width: '15vw', marginLeft: '10vw' }} onClick={this.addPayment}
                >Done Upload</Button>
                {/* <Button variant="warning" style={{ width: '15vw', marginLeft: '10vw' }} disabled={this.state.disabled} onClick={this.addPayment} as={Link} to={`/paymentresep/${this.props.order_Numb}`} */}
                <Button variant="warning" style={{ width: '15vw', marginLeft: '10vw' }} disabled={this.state.disabled} as={Link} to={`/paymentresep/${this.props.order_Numb}`} 
                >payment</Button>
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
        idResep: state.userReducer.idResep,
        order_Numb: state.userReducer.orderNumb,
        resep_Image: state.userReducer.resepPic,
        status: state.userReducer.status
        // idPay: state.userReducer.idPayment
    }
}

export default connect(mapStateToProps, { uploadResep, addResepAct, addPayment })(UploadResep)
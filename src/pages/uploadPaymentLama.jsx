import React from 'react'
import { Card, Button, InputGroup } from 'react-bootstrap'
import NavBar from '../components/navbar'
import Axios from 'axios'
import { connect } from 'react-redux'
import { PAY } from '../assets'
import { Link } from 'react-router-dom'

const URL_API = "http://localhost:2000/payment"
const URL_IMG = 'http://localhost:2000/'

class UploadPaymentLama extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            disabled: false,
            images: '',
            payImage: '',
            recipes: [],
            statusNew: '',
            disabled: false,

        }
    }

    fetchData = () => {
        let idProduct = this.props.location.pathname.slice(20)
        // console.log(idProduct)
        let data = {
            order_number: idProduct
        }
        console.log(data)
        Axios.post(`${URL_API}/paymentbyid`, data)
            .then(res => {
                console.log(res.data[0])
                this.setState({ payments: res.data[0] })
                console.log(this.state.payments.id_payment_resep)

            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.fetchData()
        this.fetchDataStatus()
    }

    fetchDataStatus = () => {
        Axios.get(`http://localhost:2000/profile/byid/${this.props.idResep}`)
            .then(res => {
                console.log(res.data[0])
                this.setState({ recipes: res.data[0] })

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
        Axios.post(`http://localhost:2000/payment/imgpayresep/${this.state.payments.id_payment_resep}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ payImage: res.data })
            })
            .catch(err => {
                console.log(err)
            })
        this.fetchDataStatus()
        this.fetchData()
        this.setState({ images: '' })
    }

    statusAprovPay = () => {
        let idProduct = this.props.location.pathname.slice(20)
        // console.log(idProduct)
        let data2 = {
            order_number: idProduct
        }
        console.log(data2)
        Axios.post(`http://localhost:2000/payment/update-status`, data2)
            .then(res => {
                console.log(res.data)
                this.setState({ statusNew: res.data })
                this.setState({ disabled: true })

            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        console.log(this.props.order_Numb)
        // console.log(this.props.status)
        const { payImage } = this.state
        return (
            <div style={styles.cont}>
                <NavBar />
                <div style={{ display: 'flex', }}>
                    <Card style={{ width: '20rem', marginTop: '0', marginLeft: '4vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Img variant="top" src={payImage ? `${URL_IMG}/${payImage}` : PAY.default} />
                        <Card.Body>
                            <Card.Title>Your Payment</Card.Title>
                            <Card.Text>
                                Please upload a Photo of your Payment, then <strong>Click DONE </strong> to wait for Confirmation from the Admin.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8vh', marginLeft: '6vw' }}>
                        <h1 style={{ display: 'flex', marginLeft: '9vw', marginBottom: '5vh' }} >Payment Upload</h1>
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
                        <InputGroup className="mb-3" style={{ marginTop: '12vh', marginLeft: '10vw' }}>
                            <InputGroup.Text id="basic-addon1">
                                <i className="fas fa-hourglass-half"> Status</i>
                            </InputGroup.Text>
                            <Button variant="info" style={{ width: '15vw' }} disabled={this.state.disabled} onClick={this.statusAprovPay}>Done Upload Payment</Button>
                        </InputGroup>
                        <Button variant="warning" style={{ width: '15vw', marginLeft: '10vw' }} as={Link} to={`/history`}
                        >OnGoing Transaction</Button>
                    </div>

                </div>
            </div >
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

    //status : done upload foto(biru) --> waiting konfirmasi (yellow)--> accept by admin(green) --> payment --> on going process --> cart
}

const mapStateToProps = (state) => {
    return {
        idPayment: state.userReducer.idPayment,
        order_Numb: state.userReducer.orderNumb,
        iduser: state.userReducer.iduser,
        status: state.userReducer.status,
        idResep: state.userReducer.idResep,

    }
}

export default connect(mapStateToProps)(UploadPaymentLama)
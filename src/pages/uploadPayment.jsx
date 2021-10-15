import React from 'react'
import { Card, Button, InputGroup } from 'react-bootstrap'
import NavBar from '../components/navbar'
import Axios from 'axios'
import { connect } from 'react-redux'
import {addPayment} from '../redux/actions'

const URL_API = "http://localhost:2000/payment"

class UploadPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            addData: [],
            disabled: false,
            images: ''
        }
    }

    addPayment = () => {
        let newData = {
            order_number: `${Date.now()}`,
            payment_proof_resep: `${this.props.imageRes}`,
            total_belanja: 100000,
        }
        console.log(newData)
        this.props.addPayment(newData)
        this.setState({payments: newData})
        console.log(this.props.idPayment) //3
        console.log(this.props.order_numb)
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

        // let data = {
        //     order_number
        // }

        Axios.post(`http://localhost:2000/payment/imgpayresep`, data)
            .then(res => {
                console.log(res.data)
                // this.setState({ payments: res.data })
            })
            .catch(err => {
                console.log(err)
            })
        // this.props.uploadFile(data, this.props.iduser)
        this.setState({ images: '' })
    }


    render() {
        
        return (
            <div style={styles.cont}>
                <NavBar />
                <div style={{ display: 'flex', }}>
                    <Card style={{ width: '20rem', marginTop: '0', marginLeft: '4vw', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <Card.Img variant="top" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAdVBMVEXe3t4xMTHi4uIeHh4zMzO8vLwuLi6srKyzs7MYGBjm5uYiIiIrKytYWFhOTk65ubmTk5MmJiaenp7Hx8fW1tY3NzehoaHY2NhDQ0OAgIBhYWGoqKhoaGjOzs6Hh4dGRkYAAAATExN5eXlkZGTt7e10dHSXl5fi/GD7AAAEqklEQVR4nO2cDXfaIBSGw4WgA6xi1MSP6Nqt/f8/cUCsn0m3KlsXfJ+259jTmGOe3gsXAskyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIgDZRSbr76keyGVFXlcilJ51X2FaLatpOaaR8RUy7LPSvK5liwyklk57G0GUW6lYFIIORfxYHJu7bivTrLKB4lTImIGiz+fmc+++tpugxZa+FjXluuIuDgRTL/1M1DUq3VOZLUYxGS9Yz4hV+qrL+8m1Mi4OLcLFbU6UWvrpMinnsaJc8KYHcT99DTmPvqeop70nxGcCB7difa501sn7sOLszihpgC9xxLl3HVj/XVimOsh3p2QL+KU+3Lf/uWNZ3W5w3qdO+7T62OcUD0Ziedv1WZwR6Qk5mRitfRVreHV7XVoOk5cQ1JufIcRBiyS8SnRbcGSjhN3/a/6UOK7fkOvb2xRUnKy5r7+3A9thRux1LedNR0nlO3YuxEfJ0LY7YPHCfmq4nRs665q1PW+fae9f3n111ScuNTRF0N++dFwn4pRrdrb4IScTC+dMFF3Jg/l1lYFtRZ2CTkZXMVJ1RknamiZa4THrdMB6TjJCn7hxHS0J+TnoprOadg2QZ+QE3oy52GiJx2zQmqi97WdXbcckoyTktTwPHlkVba3oWprxb6LkvztWkoyTvz3kofZauGrWCHtuKUB9Ye9aN9TN1YE315JScaJh5bPMkhxFb7hw7bMKVW24ey0kOEv6qL3ScuJGsytMVIaa0az9tpjNtLiVAkTenN5TEpO/M30wctot/uxzX+2voHqnWVnYeLb4tUs4TjxPyrQOk1AVMyNFBdSBLOj+jR7knLyOyh3SubsGrOrTyQ+khM1dM2vaFHiSlpRHFvkB3Ki1ibMIbQocf2UPNb56Tqhw32N5lf1xsP99rY48QrMwPXJYdlJqk4oq30TUR4P3bqypEtIQE9VsxInWSe1nhfH8R3RK+9InGP+8ElzeKJOqNCu3cwPSrJNWIDwwSIV3/ryZXN0ak5C+KuB8c3m+wIsmq30ByFy5HmabHtCCxuaU2kWfnqRan8L9U8WMtlJqk7UWxMVfmnKRJWqePJK/iBOpAkzLuk5IdoeEsWV7cufrp5vXj9knJS++Qg9zMm/fvOJ5X8JOvHQ6uw2jzSfWRCZpBMqR/pskCc+qkmSd0Khh3my4nIm4HHjJJQlxc787rIfyUnZTI98KixSd+IYyzuVJOeEhpf3AR/eSemq17v3ISTmJMuu1xU8vBMFJ4Hz9ScWTrLLOIETD5xcEzl3RGJOXF/8/du9fE/LSRzCvY/eOxGH3IkiJoU4kUwwfuvC+g5o7Ccv++qEfO40+7wiWqGcO9W2p072ubMIe7vi7Rsd2JA7Pd03+mqkFLKajgfDeKx3fk2cWfXTCS38LU8hLdcxN6KH8TXv6T70LKv8pus7Z5LakGLevkjw/4dye98MbCe8v8+1UOO/8PwTJq1s357QD2i23ZmoT8kJz8np3uXSC1T5V56n1G/CTraohLP2O1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wu/AITbVU+O0vu/AAAAAElFTkSuQmCC" />
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
                            <Button variant="info" style={{ width: '15vw' }}>Done Upload Payment</Button>

                        </InputGroup>
                        <Button disabled={this.state.disabled} variant="warning" style={{ width: '15vw' }} onClick={this.addPayment}>ADD DATA</Button>
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
        idPayment: state.userReducer.id,
        order_numb : state.userReducer.order_numb,
        iduser : state.userReducer.iduser
    }
}

export default connect(mapStateToProps, {addPayment})(UploadPayment)
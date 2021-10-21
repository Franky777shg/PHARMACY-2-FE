import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import NavBar from '../components/navbar'
import {
    Table,
    Image,
    Button,
    FormControl,
    Form,
    Modal, Alert
} from 'react-bootstrap'
import Axios from 'axios';
class SalesPage extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state={
    //         history: []
    //     }
    // }
    

    render() {
        // const {history} = this.state

        if (this.props.role === 'user') {
            return <Redirect to='/login' />
        }
        return (
            <div style={{ padding: '1%', minHeight: '100vh' }}>
                <NavBar />

            </div>
        )
    }
}

export default SalesPage
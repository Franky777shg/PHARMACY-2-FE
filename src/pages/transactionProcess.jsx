import React from 'react'
import Axios from 'axios'
import { Table, Button, InputGroup, Form } from 'react-bootstrap'

// Import Components
import NavBar from '../components/navbar'

class TransactionProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={styles.cont}>
                <NavBar />
                <Table striped bordered hover style={styles.table}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Date</th>
                            <th>ID User</th>
                            <th>Order Number</th>
                            <th>Total Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ok</td>
                            <td>dina</td>
                            <td>ok</td>
                            <td>ok</td>
                            <td>ok</td>
                        </tr>
                    </tbody>
                </Table>
                <div >
                    <h1>process</h1>
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
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        paddingLeft: '5vw',
        paddingTop: '17vh',
        paddingBottom: '16vh',
    },
    table: {
        backgroundColor: 'white',
        marginBottom: '5vh',
        width: '40vw',
    },
}
export default TransactionProcess
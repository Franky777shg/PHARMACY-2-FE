import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar';

// React Bootstrap
import {
  Button,
  Card,
  Row,
  Col
} from 'react-bootstrap'

// URL API
const URL_API = "http://localhost:2000"

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      page: 1,
      maxPage: null,
    }
  }

  fetchData = () => {
    Axios.post(`${URL_API}/product/get-product`, { page: 1 })
      .then(res => {
        this.setState({ products: res.data.slice(0,10), maxPage: res.data[10] })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  onNext = () => {
    Axios.post(`${URL_API}/product/get-product`, { page: this.state.page + 1 })
      .then(res => {
        this.setState({ products: res.data.slice(0,10), maxPage: res.data[10], page: this.state.page + 1})
      })
      .catch(err => {
        console.log(err)
      })
  }

  onPrev = () => {
    Axios.post(`${URL_API}/product/get-product`, { page: this.state.page - 1 })
      .then(res => {
        this.setState({ products: res.data.slice(0,10), maxPage: res.data[10], page: this.state.page - 1})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <NavBar />
        <div style={styles.paginationDiv}>
          <Button style={{ marginRight: '10px' }} variant="primary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrev}>Prev</Button>
          <p style={{ margin: 0 }}>Page {this.state.page} of {this.state.maxPage}</p>
          <Button style={{ marginLeft: '10px' }} variant="primary" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNext}>Next</Button>
        </div>
        <Row style={{ margin: '20px' }} xs={1} md={5} className="g-4">
          {this.state.products.map((item, index) => (
            <Col>
              <Card style={styles.card}>
                <Card.Img variant="top" src={item.link_foto} />
                <Card.Body style={styles.cardBody}>
                  <Card.Title style={{ textAlign: 'center', marginBottom: '15px' }}>{item.nama}</Card.Title>
                  <Card.Text>{item.satuan}</Card.Text>
                  <Card.Text>Rp {(item.harga).toLocaleString()}</Card.Text>
                  <Button style={{ position: 'absolute', bottom: '25px'}}>Detail</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

const styles = {
  card: {
    height: '85vh'
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationDiv: {
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    marginTop: '44px',
    justifyContent: 'center'
  }
}

export default HomePage;
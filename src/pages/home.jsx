import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar';

// React Bootstrap
import {
  Button,
  Card,
  Row,
  Col,
  Form
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
      next: null,
      prev: null,
    }
  }

  fetchData = () => {
    Axios.post(`${URL_API}/product/get-product`, { page: 1 })
      .then(res => {
        this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  onNext = () => {
    if (this.state.next === null) {
      Axios.post(`${URL_API}/product/get-product`, { page: this.state.page + 1 })
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.next === 'filter') {
      let name = this.refs.name.value
      let category = this.refs.category.value
      let page = this.state.page + 1

      let data = {
        name,
        category,
        page
      }

      Axios.post(`${URL_API}/product/filter-product`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.next === 'sort') {
      let name = this.refs.name.value
      let category = this.refs.category.value
      let sort = this.refs.sort.value
      let page = this.state.page + 1

      let data

      if (sort === "nama asc") {
        data = {
          name,
          category,
          page,
          order: "nama",
          sort: "asc"
        }
      } else if (sort === "nama desc") {
        data = {
          name,
          category,
          page,
          order: "nama",
          sort: "desc"
        }
      } else if (sort === "harga asc") {
        data = {
          name,
          category,
          page,
          order: "harga",
          sort: "asc"
        }
      } else if (sort === "harga desc") {
        data = {
          name,
          category,
          page,
          order: "harga",
          sort: "desc"
        }
      } else {
        return
      }

      console.log(data)

      Axios.post(`${URL_API}/product/sort-product`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  onPrev = () => {
    if (this.state.prev === null) {
      Axios.post(`${URL_API}/product/get-product`, { page: this.state.page - 1 })
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.prev === 'filter') {
      let name = this.refs.name.value
      let category = this.refs.category.value
      let page = this.state.page - 1

      let data = {
        name,
        category,
        page
      }

      Axios.post(`${URL_API}/product/filter-product`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.prev === 'sort') {
      let name = this.refs.name.value
      let category = this.refs.category.value
      let sort = this.refs.sort.value
      let page = this.state.page - 1

      let data

      if (sort === "nama asc") {
        data = {
          name,
          category,
          page,
          order: "nama",
          sort: "asc"
        }
      } else if (sort === "nama desc") {
        data = {
          name,
          category,
          page,
          order: "nama",
          sort: "desc"
        }
      } else if (sort === "harga asc") {
        data = {
          name,
          category,
          page,
          order: "harga",
          sort: "asc"
        }
      } else if (sort === "harga desc") {
        data = {
          name,
          category,
          page,
          order: "harga",
          sort: "desc"
        }
      } else {
        return
      }

      Axios.post(`${URL_API}/product/sort-product`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  onSearchFilter = () => {
    let name = this.refs.name.value
    let category = this.refs.category.value

    let data = {
      name,
      category,
      page: 1
    }

    Axios.post(`${URL_API}/product/filter-product`, data)
      .then(res => {
        this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
        this.setState({ page: 1 })
        this.setState({ next: 'filter', prev: 'filter' })
      })
      .catch(err => {
        console.log(err)
      })

    this.refs.sort.value = ""
  }

  onSort = () => {
    let name = this.refs.name.value
    let category = this.refs.category.value
    let sort = this.refs.sort.value

    let data

    if (sort === "nama asc") {
      data = {
        name,
        category,
        page: 1,
        order: "nama",
        sort: "asc"
      }
    } else if (sort === "nama desc") {
      data = {
        name,
        category,
        page: 1,
        order: "nama",
        sort: "desc"
      }
    } else if (sort === "harga asc") {
      data = {
        name,
        category,
        page: 1,
        order: "harga",
        sort: "asc"
      }
    } else if (sort === "harga desc") {
      data = {
        name,
        category,
        page: 1,
        order: "harga",
        sort: "desc"
      }
    } else {
      return
    }

    console.log(data)

    Axios.post(`${URL_API}/product/sort-product`, data)
      .then(res => {
        this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
        this.setState({ page: 1 })
        this.setState({ next: 'sort', prev: 'sort' })
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
        <div style={styles.divForm}>
          <p style={{ margin: 0 }}>Filter By :</p>
          <Form.Control style={styles.filterForm} type="text" placeholder="Name" ref="name" />
          <Form.Select style={styles.filterForm} ref="category">
            <option value="">Category</option>
            <option value="Asma">Asma</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Jantung">Jantung</option>
            <option value="Kulit">Kulit</option>
            <option value="Mata">Mata</option>
            <option value="Saluran Pencernaan">Saluran Pencernaan</option>
          </Form.Select>
          <Button variant="outline-primary" onClick={this.onSearchFilter}>Search</Button>
        </div>
        <div style={styles.divSort}>
          <p style={{ margin: 0 }}>Sort By :</p>
          <Form.Select style={styles.filterSort} ref="sort">
            <option value="nama asc">Name (Asc)</option>
            <option value="nama desc">Name (Desc)</option>
            <option value="harga asc">Price (Asc)</option>
            <option value="harga desc">Price (Desc)</option>
          </Form.Select>
          <Button variant="outline-primary" onClick={this.onSort}>Sort</Button>
        </div>
        <Row style={{ margin: '20px' }} xs={1} md={5} className="g-4">
          {this.state.products.map((item, index) => (
            <Col key={index}>
              <Card style={styles.card} key={index+1000}>
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
  },
  divForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60vw',
    margin: '44px auto 0 auto',
  },
  filterForm: {
    width: "20vw",
  },
  divSort: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '30vw',
    margin: '44px auto 0 auto',
  },
  filterSort: {
    width: "10vw",
  }
}

export default HomePage;
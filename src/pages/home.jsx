import React from 'react'
import Axios from 'axios'

// Import Components
import NavBar from '../components/navbar';

// Redux
import { connect } from 'react-redux'

// React Bootstrap
import {
  Button,
  Card,
  Row,
  Col,
  Form
} from 'react-bootstrap'

// React Router Dom
import { Link, Redirect } from 'react-router-dom';

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
      nextResep: null,
      prevResep: null,
      show: "satuan",
      redirect: null
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

  fetchDataResep = () => {
    Axios.post(`${URL_API}/product/get-productresep`, { page: 1 })
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

      Axios.post(`${URL_API}/product/sort-product`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  onNextResep = () => {
    if (this.state.nextResep === null) {
      Axios.post(`${URL_API}/product/get-productresep`, { page: this.state.page + 1 })
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.nextResep === 'filter') {
      let name = this.refs.nameResep.value
      let category = this.refs.categoryResep.value
      let page = this.state.page + 1

      let data = {
        name,
        category,
        page
      }

      Axios.post(`${URL_API}/product/filter-productresep`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page + 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.nextResep === 'sort') {
      let name = this.refs.nameResep.value
      let category = this.refs.categoryResep.value
      let sort = this.refs.sortResep.value
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

      Axios.post(`${URL_API}/product/sort-productresep`, data)
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

  onPrevResep = () => {
    if (this.state.prevResep === null) {
      Axios.post(`${URL_API}/product/get-productresep`, { page: this.state.page - 1 })
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.prevResep === 'filter') {
      let name = this.refs.nameResep.value
      let category = this.refs.categoryResep.value
      let page = this.state.page - 1

      let data = {
        name,
        category,
        page
      }

      Axios.post(`${URL_API}/product/filter-productresep`, data)
        .then(res => {
          this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1], page: this.state.page - 1})
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.state.prevResep === 'sort') {
      let name = this.refs.nameResep.value
      let category = this.refs.categoryResep.value
      let sort = this.refs.sortResep.value
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

      Axios.post(`${URL_API}/product/sort-productresep`, data)
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

  onSearchFilterResep = () => {
    let name = this.refs.nameResep.value
    let category = this.refs.categoryResep.value

    let data = {
      name,
      category,
      page: 1
    }

    Axios.post(`${URL_API}/product/filter-productresep`, data)
      .then(res => {
        this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
        this.setState({ page: 1 })
        this.setState({ nextResep: 'filter', prevResep: 'filter' })
      })
      .catch(err => {
        console.log(err)
      })

    this.refs.sortResep.value = ""
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

  onSortResep = () => {
    let name = this.refs.nameResep.value
    let category = this.refs.categoryResep.value
    let sort = this.refs.sortResep.value

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

    Axios.post(`${URL_API}/product/sort-productResep`, data)
      .then(res => {
        this.setState({ products: res.data.slice(0, res.data.length - 1), maxPage: res.data[res.data.length - 1] })
        this.setState({ page: 1 })
        this.setState({ nextResep: 'sort', prevResep: 'sort' })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onObatSatuan = () => {
    this.setState({ show: "satuan", page: 1 })
    this.fetchData()
  }

  onObatResep = () => {
    this.setState({ show: "resep", page: 1 })
    this.fetchDataResep()
  }
  
  onDeletesatuan = (idproduk) => {
     console.log(idproduk)
      Axios.delete(`${URL_API}/product/del-product1/${idproduk}`)
        .then(res => {
          this.setState({ products: res.data })
          this.fetchData()
          // console.log(res.data)
        })
        .catch(err => console.log(err))
    
  }

  onDeleteracikan = (idproduk_resep) => {
    console.log(idproduk_resep)
    Axios.delete(`${URL_API}/product/del-productr/${idproduk_resep}`)
      .then(res => {
        this.setState({ products: res.data })
        this.fetchDataResep()
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  onAddObatsatuan = () => {
    this.setState({})
  }
  
  render () {
    
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }
    // if (this.state.edit) {
    //   return <Redirect to={this.state.edit} />
    // }
    const {redirect,edit} = this.state
    if (this.props.role === "admin") {
      return (
        <div>
          <NavBar />
          <div style={styles.divAdminPilihProduct}>
            <div>
              <Button variant="primary" disabled={this.state.show === "satuan" ? true : false} onClick={this.onObatSatuan}>Obat Satuan</Button>
              <Button style={{ marginLeft: '10px' }}variant="primary" disabled={this.state.show === "resep" ? true : false} onClick={this.onObatResep}>Obat Resep</Button>
            </div>
            {
              this.state.show === "satuan"
              ?
              <Button variant="success" as={Link} to="/add-product1" >Add Obat Satuan</Button> 
              :
              <Button variant="success" as={Link} to="/add-productr">Add Obat Resep</Button>
            }
          </div>
          {
            this.state.show === "satuan"
            ?
            <div>
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
                      <Card.Img style={styles.cardImage} variant="top" src={URL_API + "/" + item.link_foto} />
                      <Card.Body style={styles.cardBody}>
                        <Card.Title style={{ textAlign: 'center', marginBottom: '15px' }}>{item.nama}</Card.Title>
                        <Card.Text>{item.satuan}</Card.Text>
                        <Card.Text>Rp {(item.harga).toLocaleString()}</Card.Text>
                        <Button variant="warning" style={{ position: 'absolute', bottom: '75px'}} as={Link} to={`/edit-satuan/${item.idproduk}`}>Edit</Button>
                        <Button variant="danger" style={{ position: 'absolute', bottom: '25px'}} onClick={() => this.onDeletesatuan(item.idproduk)}>Delete</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            :
            <div>
              <div style={styles.paginationDiv}>
                <Button style={{ marginRight: '10px' }} variant="primary" disabled={this.state.page === 1 ? true : false} onClick={this.onPrevResep}>Prev</Button>
                <p style={{ margin: 0 }}>Page {this.state.page} of {this.state.maxPage}</p>
                <Button style={{ marginLeft: '10px' }} variant="primary" disabled={this.state.page === this.state.maxPage ? true : false} onClick={this.onNextResep}>Next</Button>
              </div>
              <div style={styles.divForm}>
                <p style={{ margin: 0 }}>Filter By :</p>
                <Form.Control style={styles.filterForm} type="text" placeholder="Name" ref="nameResep" />
                <Form.Select style={styles.filterForm} ref="categoryResep">
                  <option value="">Category</option>
                  <option value="Asma">Asma</option>
                  <option value="Jantung">Jantung</option>
                  <option value="Mata">Mata</option>
                </Form.Select>
                <Button variant="outline-primary" onClick={this.onSearchFilterResep}>Search</Button>
              </div>
              <div style={styles.divSort}>
                <p style={{ margin: 0 }}>Sort By :</p>
                <Form.Select style={styles.filterSort} ref="sortResep">
                  <option value="nama asc">Name (Asc)</option>
                  <option value="nama desc">Name (Desc)</option>
                  <option value="harga asc">Price (Asc)</option>
                  <option value="harga desc">Price (Desc)</option>
                </Form.Select>
                <Button variant="outline-primary" onClick={this.onSortResep}>Sort</Button>
              </div>
              <Row style={{ margin: '20px' }} xs={1} md={5} className="g-4">
                {this.state.products.map((item, index) => (
                  <Col key={index}>
                    <Card style={styles.card} key={index+1000}>
                      <Card.Img variant="top" src={URL_API + "/" + item.link_foto} />
                      <Card.Body style={styles.cardBody}>
                        <Card.Title style={{ textAlign: 'center', marginBottom: '15px' }}>{item.nama}</Card.Title>
                        <Card.Text>Stok: {Math.floor(item.stok_ml/100)} botol {item.stok_ml%100} ml</Card.Text>
                        <Card.Text>Rp {(item.harga).toLocaleString()}</Card.Text>
                        <Button variant="info" style={{ position: 'absolute', bottom: '125px'}} as={Link} to={`/rawMaterialUsage/${item.idproduk_resep}`}>Usage</Button>
                        <Button variant="warning" style={{ position: 'absolute', bottom: '75px'}} as={Link} to={`/edit-racikan/${item.idproduk_resep}`}>Edit</Button>
                        <Button variant="danger" style={{ position: 'absolute', bottom: '25px'}} onClick={() => this.onDeleteracikan(item.idproduk_resep)}>Delete</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          }
        </div>
      )
    } else {
      return (
        <div>
          <NavBar />
          <div style={{...styles.paginationDiv, marginTop: '94px'}}>
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
                  <Card.Img style={styles.cardImage} variant="top" src={URL_API + "/" + item.link_foto} />
                  <Card.Body style={styles.cardBody}>
                    <Card.Title style={{ textAlign: 'center', marginBottom: '15px' }}>{item.nama}</Card.Title>
                    <Card.Text>{item.satuan}</Card.Text>
                    <Card.Text>Rp {(item.harga).toLocaleString()}</Card.Text>
                    <Button style={{ position: 'absolute', bottom: '25px'}} as={Link} to={`/detail-product/${item.idproduk}`}>Detail</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )
    }
  }
}

const styles = {
  card: {
    height: '90vh'
  },
  cardImage: {
    height: '200px'
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
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
    justifyContent: 'space-between',
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
    width: "15vw",
  },
  divAdminPilihProduct: {
    width: "35vw",
    display: 'flex',
    flexDirection: 'row',
    margin: '94px auto 0',
    justifyContent: 'space-between'
  },
  divForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60vw',
    margin: '44px auto 0 auto',
  },
}

const mapStateToProps = (state) => {
  return {
      role: state.userReducer.role
  }
}

export default connect(mapStateToProps)(HomePage)
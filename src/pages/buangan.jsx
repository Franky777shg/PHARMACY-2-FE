// onDetailTransaksi = (order_number) => {
//     let data = {
//         order_number
//     }

//     Axios.post(`${URL_API}/paymentbyid`, data)
//         .then(res => {
//             this.setState({ dataOrder: res.data })
//             console.log(res.data)
//         })
//         .catch(err => console.log(err))
// }





    // getDataById = (order_number) => {
    //     Axios.get(`http://localhost:2000/profile/resepbyid`, order_number)
    //         .then(res => {
    //             console.log(res.data) //[0] isi object id 2
    //             console.log(res,)
    //             this.setState({ allDataResep: res.data })
    //             console.log(this.props.order_Numb)
    //             // console.log(this.state.recipes) // = 51
    //             // console.log(this.state.recipes[0].idresep) //id2
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    // componentDidMount = () => {
    //     // this.addResep()
        
    // }
    // getid = () => {
    //     this.setState({recipes : this.getDataById()})
    //     console.log(this.state.recipes)
    // }



      // Axios.post(`http://localhost:2000/profile/newdata`, newData)
        //     .then(res => {
        //         // console.log(res.data)
        //         this.setState({ recipes: res.data })
        //         console.log(this.state.recipes)
        //         console.log(this.state.recipes.idresep)
        //         
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })


        dataAllPayment = () => {
          Axios.get(`http://localhost:2000/payment/allpayment`)
              .then(res => {
                  console.log(res.data)
                  this.setState({ payments: res.data })
              })
              .catch(err => {
                  console.log(err)
              })
      }
  
//axios upload foto resep
        // Axios.post(`http://localhost:2000/profile/resep/${this.props.idResep}`, data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({ images: res.data })
        //         console.log(this.state.images)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
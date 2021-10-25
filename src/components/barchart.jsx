import React from 'react'
import Axios from 'axios'

import { Bar } from 'react-chartjs-2'

class Barchart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dataBarchart: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async() => {
        let tempArr = []
        for(let i = 1; i < 13; i++) {
            let data = {
                month: i
            }
            await Axios.post("http://localhost:2000/admin/getDataBarChart", data)
                .then(res => {
                    let result = res.data["count(date)"]
                    tempArr.push(result)
                })
            }
        this.setState({ dataBarchart: tempArr })
    }

    render() {
        return(
            <Bar 
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: '# of Transactions',
                    data: this.state.dataBarchart,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                    }]
                }}
                height={400}
                width={1400}
            />
        )
    }
}

export default Barchart
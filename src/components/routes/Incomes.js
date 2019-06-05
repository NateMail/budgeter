import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class Incomes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monthly: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/monthlies`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        console.log(res)
        this.setState({ monthly: res.data.monthlies })
      })
      .catch(console.error)
  }

  render () {
    const monthly = this.state.monthly.map(monthly => (
      <li key={monthly.id}>
        <h3>  {monthly.income} </h3>
        <h5>  {monthly.deposited} </h5>
      </li>
    ))
    return (
      <div>
        <h3>All the Incomes</h3>
        <ul>{monthly}</ul>
      </div>
    )
  }
}

export default Incomes

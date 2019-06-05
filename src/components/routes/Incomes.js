import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        <Link to={'/monthlies/' + monthly.id}>{monthly.income ? monthly.income : 'Unknown Income'}</Link>
      </li>
    ))
    return (
      <div>
        <h3>All the Incomes</h3>
        <li> {monthly} </li>
      </div>
    )
  }
}

export default Incomes

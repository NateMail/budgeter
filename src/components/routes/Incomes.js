import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Incomes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monthly: [],
      deleted: false
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
        this.setState({ monthly: res.data.monthlies })
      })
      .catch(console.error)
  }
  render () {
    const monthly = this.state.monthly.map(monthly => (
      <div key={monthly.id}>
        <h3> $ {monthly.income} </h3>
        <h5>  Deposited on: {monthly.deposited} </h5>
        <Link to={`/monthlies/${monthly.id}`} >
          <Button
            variant="info"
            type="button"
            className="m-1"
          >
        Update
          </Button>
        </Link>
      </div>
    ))
    return (
      <div>
        <h3>Your Monthly Income</h3>
        <ul>{monthly}</ul>
        <Link to={'/bills'} >
          <Button
            variant="success"
            type="button"
            className="m-1"
          >
          Bills
          </Button>
        </Link>
        <br />
        <Link to={'/create-bills'} >
          <Button
            variant="info"
            type="button"
            className="m-1"
          >
          Add Bills
          </Button>
        </Link>
      </div>
    )
  }
}

export default withRouter(Incomes)

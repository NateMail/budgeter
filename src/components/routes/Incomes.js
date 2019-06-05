import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
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
        console.log(res)
        this.setState({ monthly: res.data.monthlies })
      })
      .catch(console.error)
  }

  handleDelete = (id) => {
    axios({
      url: `${apiUrl}/monthlies/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const monthly = this.state.monthly.map(monthly => (
      <li key={monthly.id}>
        <h3>  {monthly.income} </h3>
        <h5>  {monthly.deposited} </h5>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={() => this.handleDelete(monthly.id)}
        >
        Delete
        </Button>
      </li>
    ))

    const { deleted } = this.state

    if (!monthly) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Income Successfully deleted!' } }
      } />
    }
    return (
      <div>
        <h3>All the Incomes</h3>
        <ul>{monthly}</ul>
      </div>
    )
  }
}

export default withRouter(Incomes)

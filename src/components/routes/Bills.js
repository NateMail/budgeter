import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

class Bills extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bill: [],
      deleted: false,
      monthly: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/bills`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ bill: res.data.bills })
      })
      .catch(console.error)
  }

  handleDelete = (id) => {
    axios({
      url: `${apiUrl}/bills/${id}`,
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

  income =
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

  render () {
    const bill = this.state.bill.map(bill => (
      <li key={bill.id}>
        <h3>  {bill.name} </h3>
        <h5> $ {bill.amount} </h5>
        <h5>  {bill.due}  </h5>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={() => this.handleDelete(bill.id)}
        >
        Delete
        </Button>
        <Link to={`/bills/${bill.id}`} >
          <Button
            variant="info"
            type="button"
            className="m-1"
          >
        Update
          </Button>
        </Link>
      </li>
    ))

    const { deleted } = this.state

    if (!bill) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/monthlies', state: { msg: 'Bill Successfully deleted!' } }
      } />
    }

    let total = 0
    this.state.bill.forEach(bill => {
      total += Math.abs(bill.amount)
    })
    total = Math.floor(total * 100) / 100

    let monthlyincome = this.state.monthly.map(monthly => {
      return Math.abs(monthly.income)
    })
    monthlyincome = Math.floor(monthlyincome * 100) / 100

    const remainingIncome = monthlyincome - total
    return (
      <div>
        <h3>All your Bills</h3>
        <ul>{bill}</ul>
        <h4>The total amount of your bills is {total}</h4>
        <h4>Your remaining income is: ${remainingIncome}</h4>
      </div>
    )
  }
}

export default withRouter(Bills)

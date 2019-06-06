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
      deleted: false,
      bill: []
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

  bill =
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

    const bill = this.state.bill.map(bill => (
      <div key={bill.id}>
        <h3>  {bill.name} </h3>
        <h5> $ {bill.amount} </h5>
        <h5> Bill is due: {bill.due}  </h5>
      </div>
    ))

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
    console.log(remainingIncome)
    return (
      <div>
        <h3>Your Monthly Income</h3>
        <ul>{monthly}</ul>
        <h4>Your remain income is: ${remainingIncome}</h4>
        <h4>Your Bills</h4>
        <ul>{bill}</ul>
        <Link to={'/bills'} >
          <Button
            variant="success"
            type="button"
            className="m-1"
          >
          Edit Bills
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

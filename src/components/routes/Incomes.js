import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

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
      <ListGroup key={bill.id} className="billist">
        <ListGroup.Item variant="secondary">  {bill.name} </ListGroup.Item>
        <ListGroup.Item variant="secondary"> $ {bill.amount} </ListGroup.Item>
        <ListGroup.Item variant="secondary"> Bill is due: {bill.due}  </ListGroup.Item>
      </ListGroup>
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

    return (
      <div>
        <Card className="monthlyCard">
          <Card.Body><h3>Your Monthly Income</h3></Card.Body>
          <Card.Body>{monthly}</Card.Body>
          <Card.Body className="remaining"> Your remaining income is: ${remainingIncome}</Card.Body>
        </Card>
        <Card className="billsDisplay">
          <Card.Body><h4>Your Bills</h4></Card.Body>
          <div className="billDisplayButtons">
            <Link to='/create-bills'>
              <Button
                variant="success"
                size="sm"
                type="button"
                className="m-1"
              >
            Create Bill
              </Button>
            </Link>
            <Link to='/bills'>
              <Button
                variant="info"
                size="sm"
                type="button"
                className="m-1"
              >
            Edit bills
              </Button>
            </Link>
          </div>
          <Card.Body>{bill}</Card.Body>
        </Card>
      </div>
    )
  }
}

export default withRouter(Incomes)

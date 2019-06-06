import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class IncomeEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monthly: {
        income: '',
        deposited: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/monthlies/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ monthly: res.data.monthly })
      })
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedIncome = Object.assign(this.state.monthly, updatedField)
    this.setState({ monthly: editedIncome })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/monthlies/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        monthly: this.state.monthly
      }
    })
    this.setState({ updated: true })
  }

  render () {
    const { updated } = this.state

    if (updated) {
      return <Redirect to={'/monthlies'} />
    }

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Update Income</h2>
        <Form.Group controlId="MonthlyIncome">
          <Form.Label>Monthly Income $</Form.Label>
          <Form.Control
            type="number"
            value={this.state.income}
            name="income"
            required
            onChange={this.handleChange}
            placeholder="Enter monthly income"
          />
        </Form.Group>
        <Form.Group controlId="monthlyDeposited">
          <Form.Label>Date Deposited</Form.Label>
          <Form.Control
            type="date"
            value={this.state.deposited}
            name="deposited"
            required
            placeholder="Enter the date income was deposited"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Link to={'/monthlies'} >
          <Button
            variant="dark"
            type="button"
            className="m-1"
          > Back
          </Button>
        </Link>
      </Form>
    )
  }
}

export default IncomeEdit

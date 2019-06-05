import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class IncomeCreate extends Component {
  constructor () {
    super()

    this.state = {
      income: '',
      deposited: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/monthlies`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        monthly: {
          income: this.state.income,
          deposited: this.state.deposited
        }
      }
    })
      .then(response => this.setState({
        monthly: response.data.monthly
      }))
      .then(() => this.props.alert(`${this.state.income} has been added!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your income. Please try again.', 'danger')
        this.setState({
          income: '',
          deposited: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    income: '',
    deposited: ''
  })

  render () {
    const { income, deposited } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Income</h2>
        <Form.Group controlId="MonthlyIncome">
          <Form.Label>Monthly Income $</Form.Label>
          <Form.Control
            type="number"
            value={income}
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
            value={deposited}
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
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

export default withRouter(IncomeCreate)

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
        console.log(res)
        this.setState({ monthly: res.data.monthly })
      })
      .catch(console.error)
  }

  handleChange = event => {
    // access and update state
    console.log('changeing stuff....', event.target.value)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    console.log(updatedField)
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
    // .then(res => {
    //   this.setState({ updated: true })
    // })
    // .catch(console.error)
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

export default IncomeEdit

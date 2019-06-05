import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class BillCreate extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      amount: '',
      due: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/bills`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        bill: {
          name: this.state.name,
          amount: this.state.amount,
          due: this.state.due
        }
      }
    })
      .then(response => this.setState({
        bill: response.data.bill
      }))
      .then(() => this.props.alert(`${this.state.name} has been added!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your bill. Please try again.', 'danger')
        this.setState({
          name: '',
          amount: '',
          due: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    name: '',
    amount: '',
    due: ''
  })

  render () {
    const { name, amount, due } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Bill</h2>
        <Form.Group controlId="billName">
          <Form.Label>Bill Name</Form.Label>
          <Form.Control
            type="string"
            value={name}
            name="name"
            required
            onChange={this.handleChange}
            placeholder="Enter Bill Name"
          />
        </Form.Group>
        <Form.Group controlId="billAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            name="amount"
            required
            placeholder="Enter the bills amount"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="billDue">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={due}
            name="due"
            required
            placeholder="Enter when the bill is due"
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

export default withRouter(BillCreate)

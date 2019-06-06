import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class BillEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bill: {
        name: '',
        amount: '',
        due: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/bills/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ Bill: res.data.bill })
      })
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedBill = Object.assign(this.state.bill, updatedField)
    this.setState({ bill: editedBill })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/bills/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        bill: this.state.bill
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
        <h2>Update Bill</h2>
        <Form.Group controlId="billName">
          <Form.Label>Bill Name</Form.Label>
          <Form.Control
            type="string"
            value={this.name}
            name="name"
            required
            onChange={this.handleChange}
            placeholder='Enter new bill name'
          />
        </Form.Group>
        <Form.Group controlId="billAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={this.amount}
            name="amount"
            required
            placeholder="Enter new bill amount"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="billDue">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={this.due}
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
      </Form>
    )
  }
}

export default BillEdit

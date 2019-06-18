import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import apiUrl from '../../apiConfig'

class Bills extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bill: [],
      deleted: false
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

  render () {
    const bill = this.state.bill.map(bill => (
      <Card key={bill.id} className="billsCard">
        <Card.Body>  {bill.name} </Card.Body>
        <Card.Body> $ {bill.amount} </Card.Body>
        <Card.Body> Bill is due: {bill.due}  </Card.Body>
        <div>
          <Button
            variant="danger"
            type="button"
            className="m-1"
            size="sm"
            onClick={() => this.handleDelete(bill.id)}
          >
          Delete
          </Button>
          <Link to={`/bills/${bill.id}`} >
            <Button
              variant="info"
              size="sm"
              type="button"
              className="m-1"
            >
          Update
            </Button>
          </Link>
        </div>
      </Card>
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
    return (
      <div>
        <ul>{bill}</ul>
        <Link to={'/monthlies'} >
          <Button
            variant="dark"
            type="button"
            className="m-1"
          > Back
          </Button>
        </Link>
      </div>
    )
  }
}

export default withRouter(Bills)

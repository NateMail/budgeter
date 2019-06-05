import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

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
        console.log(res)
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
    return (
      <div>
        <h3>All the Incomes</h3>
        <ul>{bill}</ul>
      </div>
    )
  }
}

export default withRouter(Bills)

import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Monthly extends Component {
  constructor (props) {
    super(props)

    this.state = {
      monthly: null,
      deleted: false
    }
  }

  componentDidMount () {
    const response = axios(`${apiUrl}/monthlies/${this.props.match.params.id}`)
    this.setState({ monthly: response.data.monthly })
      .then(res => {
        this.setState({
          monthly: res.data.monthly
        })
      })
      .catch(console.error)
  }

    destroy = () => {
      axios.delete(`${apiUrl}/monthlies/${this.props.match.params.id}`)
        .then(res => {
          this.setState({ deleted: true })
        })
        .catch(console.error)
    }

    render () {
      const { monthly, deleted } = this.state

      if (!monthly) {
        return (
          <div>
            <p>Loading...</p>
          </div>
        )
      }

      if (deleted) {
        return <Redirect to={
          { pathname: '/', state: { msg: 'Income Successfully deleted!' } }
        } />
      }

      return (
        <div>
          <h4>{monthly.income}</h4>
          <p>Deposited on: {monthly.due ? monthly.due : 'Unknown'}</p>

          <button className='btn btn-danger' onClick={this.destroy}>Delete Income</button>
          <Link to={'/monthlies/' + monthly.id + '/edit'}>
            <button className='btn btn-info'>Edit</button>
          </Link>
        </div>
      )
    }
}

export default Monthly

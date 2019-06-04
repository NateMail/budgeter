import React, { Component } from 'react'

class Monthlies extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { user } = this.props
    return (
      <div>
        <h1>Monthlies test</h1>
        <p>{user.email}</p>
      </div>
    )
  }
}

export default Monthlies

import React, { Component } from 'react'

class Bill extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { user } = this.props
    return (
      <div>
        <h1>Bills test</h1>
        <p>{user.email}</p>
      </div>
    )
  }
}
export default Bill

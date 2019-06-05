import React from 'react'
import { Link } from 'react-router-dom'

const IncomeForm = ({ monthlies, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Monthly Income</label>
    <input name="income" placeholder="100.00" value={monthlies.income} onChange={handleChange}/>

    <label>Deposited Date</label>
    <input name="deposited" type="date" placeholder="YYYY-MM-DD" value={monthlies.deposited} onChange={handleChange}/>

    <button type="submit">Submit</button>
    <Link to={cancelPath}><button>Cancel</button></Link>
  </form>
)

export default IncomeForm

import React from 'react'
import { Link } from 'react-router-dom'

const BillForm = ({ bill, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Bill Name</label>
    <input name="name" placeholder="Bill Name" value={bill.name} onChange={handleChange}/>

    <label>Bill Amount</label>
    <input name="amount" placeholder="Bill Amount" value={bill.amount} onChange={handleChange}/>

    <lable>Due Date</lable>
    <input name="due" type="date" placeholder="YYYY-MM-DD" value={bill.due} onChange={handleChange} />

    <button type="submit">Submit</button>
    <Link to={cancelPath}><button>Cancel</button></Link>
  </form>
)

export default BillForm

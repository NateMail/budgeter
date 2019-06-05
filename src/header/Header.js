import React from 'react'
import { Link } from 'react-router-dom'
// import Incomes from '../components/routes/Incomes'
// import Income from '../components/routes/Income'
// import IncomeCreate from '../components/routes/IncomeCreate'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
    <Link to="/monthlies">Incomes</Link>
    <Link to="/create-monthlies">Income Create</Link>
    <Link to="/bills">Bills</Link>
    <Link to="/create-bills">Create Bills</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Budgeter</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header

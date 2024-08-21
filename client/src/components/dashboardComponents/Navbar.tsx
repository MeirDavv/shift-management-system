import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav>
        <ul>
            <li><Link to="schedule">Schedule</Link></li>
            <li><Link to="availability">Availability</Link></li>
            <li><Link to="employees">Employees</Link></li>
            <li><Link to="settings">Settings</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
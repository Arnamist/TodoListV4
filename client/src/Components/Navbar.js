import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../Images/ProfPic.jpg';

const Navbar = () => {
  const [show, setShow] = useState(false);

  const logWhat = async () => {
      try {
          const res = await fetch('/getdata', {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              },
          });
          await res.json();
          setShow(true);

      } catch (err) {
          console.log(err);
      }
  }

  useEffect(() => {
      logWhat();
  });
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark flex justify-content-between">
      <a className="navbar-brand" href="/">
          &nbsp;
          <img src={logo} width="40" height="40" alt="" />
          &nbsp;&nbsp;Todo List v4
      </a>
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={!show? "/login": "/logout"}>{!show?'Login':'Logout'}</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Registration</NavLink>
          </li>    
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
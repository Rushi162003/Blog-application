import React from 'react'
// import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/blog.png'
import './componant.css';

const Navbar = (props) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/login")
    props.showAlert("Login Successfully ", "success")
  }
  
  return (
    <div className='container'>
      <div className="secound-nav d-flex justify-content-between">
        <div><img className='logo' src={Logo} alt="" /></div>
        <div className='navbar'>
          <ul className='align-item-center'>
            <li><Link className='link' to="/">Home</Link></li>
            <li><Link className='link' to="/about">About</Link></li>
            <li><Link className='link' to="/myblog">MyBlogs</Link></li>
            <li><Link className='link' to="/writeblog">Write a Blog</Link></li>
          </ul>
        </div>
        <div className='navbar'>
          <ul className='align-item-center'>
            {!localStorage.getItem("authToken") ? <li><Link className='link' to="/login">Login</Link> </li> : <li><Link onClick={handleLogout} to="/login" className='link'>Logout</Link></li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

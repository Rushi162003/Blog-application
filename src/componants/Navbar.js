import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Logo from '../images/blog.png'
import './componant.css';

const Navbar = () => {
  return (
    <div className='container'>
      <div className="secound-nav d-flex justify-content-between">
        <div><img className='logo' src={Logo} alt="" /></div>
        <div className='navbar'>
          <ul className='align-item-center'>
            <li><Link className='link' to="/">Home</Link></li>
            <li><Link className='link' to="/about">About</Link></li>
            <li><Link className='link' to="/contact">Contact</Link></li>
            <li><Link className='link' to="/writeblog">Write a Blog</Link></li>
          </ul>
        </div>
        <div className='navbar'>
          <ul className='align-item-center'>
            <li><Link className='link' to="/login">Login</Link></li>
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

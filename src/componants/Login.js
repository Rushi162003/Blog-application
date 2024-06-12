import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json()
      console.log(json)
      if (json.success) {
        localStorage.setItem('authToken', json.authToken);
        props.showAlert("Login Successfully ", "success")
        navigate("/")
      }
      else {
        props.showAlert("Invalid Details ", "danger")
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during login. Please try again.");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h1 className='m-3 my-5'>Login</h1>
      <form className='container ' onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwoed" className="form-label">Password</label>
          <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name='password' />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login

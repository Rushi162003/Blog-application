import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'

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
      {/* <div className="mb-3 ">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
          <label htmlFor="passwoed" className="form-label">Password</label>
          <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name='password' />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button> */}
      <div id="login_main" class="container">
        <div class="signup">
          {/* <form action="action1.php" method='post'> */}
          <form className='container' onSubmit={handleSubmit}>
            <p className='d-flex justify-content-center'>Login</p>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input name="email" value={credentials.email} onChange={onChange} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Password</label>
              <input name="password" value={credentials.password} onChange={onChange} required type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className='d-flex justify-content-center'>
              <button className='login_button' type="submit" name="login">Countinue</button>
            </div>
            <p class="bio">By continuing, you agree to Blogs Conditions of Use and Privacy Notice.</p>
            <div class="login">
            </div>
            <hr />

            {/* </form> */}
          </form>
          <div class="last">
            <Link to="/signup" class="last1">
              <p>Create your account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

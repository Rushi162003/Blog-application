import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ sname: "", email: "", password: "" })
    let navigate = useNavigate()
    const { sname, email, password } = credentials
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sname, email, password })
            });
            const json = await response.json()
            console.log(json)
            if (json.success) {
                localStorage.setItem('authToken', json.authToken);
                props.showAlert("Account Created Successfully Please login", "success")
                navigate("/login")
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
          <label htmlhtmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
          <label htmlhtmlFor="passwoed" className="form-label">Password</label>
          <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name='password' />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button> */}
            <div id="login_main" className="container">
                <div className="signup">
                    {/* <form action="action1.php" method='post'> */}
                    <form className='container' onSubmit={handleSubmit}>
                        <p className='d-flex justify-content-center'>Signup</p>
                       
                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Name</label>
                            <input name="sname" onChange={onChange} minLength={3} required type="text" className="form-control" id="sname" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input name="email" onChange={onChange} minLength={3} required type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input name="password" onChange={onChange} minLength={3} required type="password" className="form-control" id="password" aria-describedby="emailHelp" />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='login_button' type="submit" name="login">Countinue</button>
                        </div>
                        <p className="bio">By continuing, you agree to Blogs Conditions of Use and Privacy Notice.</p>
                        <div className="login">
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup

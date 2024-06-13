import Navbar from './componants/Navbar'
import About from './componants/About'
import Home from './componants/Home'
import Addblog from './componants/Addblog'
import Myblogs from './componants/Myblog'
import Login from './componants/Login'
import Alert from './componants/Alert'
import Getblog from './componants/Getblog'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BlogState from './context/blogs/BlogState';
import Signup from './componants/Signup'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <BlogState>
      <Alert alert={alert} />
      <div className="container appbody">
        <Router>
          <Navbar showAlert={showAlert} />
          <div className="container ">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/myblog" element={<Myblogs showAlert={showAlert} />} />
              <Route path="/writeblog" element={<Addblog showAlert={showAlert} />} />
              <Route path="/getBlog/:id" element={<Getblog />} />
              <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router >
      </div >
    </BlogState>
  )
};

export default App;

import Navbar from './componants/Navbar'
import About from './componants/About'
import Home from './componants/Home'
import Addblog from './componants/Addblog'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BlogState from './context/blogs/BlogState';

function App() {
  return (
    <BlogState>
      <div className="container">
        <Router>
          <Navbar />
          {/* <Alert /> */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/writeblog" element={<Addblog/>} />
            </Routes>
          </div>
        </Router >
      </div >
    </BlogState>
  );
}

export default App;

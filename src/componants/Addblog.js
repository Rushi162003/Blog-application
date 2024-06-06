import React, { useContext, useState } from 'react'
import './componant.css';
import BlogContext from '../context/blogs/BlogContest'; // Ensure correct import path


const Addblog = () => {

  const context = useContext(BlogContext);
  const { addBlog } = context;
  const [blog, setblog] = useState({ title: "", description: "", image: "", tag: "default" })

  const handleClick = (e) => {
    e.preventDefault();
    addBlog(blog.title, blog.description, blog.image, blog.tag)
  }
  const onChange = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form className='container form' style={{ width: "50%" }}>
        <div className="mb-3 ">
          <textarea rows={3} type="text" name="title" className="form-control" onChange={onChange} id="exampleInputEmail1" placeholder='Enter your title here....' aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <textarea rows={5} type="password" name="description" className="form-control" onChange={onChange} placeholder='Enter your description here....' id="exampleInputPassword1" />
        </div>
        <div className="mb-3 ">
          <textarea rows={3} type="text" name="image" className="form-control" onChange={onChange} placeholder='Enter your image here....' id="exampleCheck1" />
        </div>
        <div className="mb-3 ">
          <textarea rows={3} type="text" name="tag" className="form-control" onChange={onChange} placeholder='Enter your image here....' id="exampleCheck1" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default Addblog

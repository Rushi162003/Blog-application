import React, { useContext, useEffect } from 'react';
import BlogContext from '../context/blogs/BlogContest';
import './componant.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const context = useContext(BlogContext);
  const { blogs, getBlog } = context;
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      // eslint-disable-next-line
      getBlog();
    }
    else {
      navigate('/login')
    }

  }, []); // Empty dependency array ensures it runs once after the initial render

  return (
    <div className=''>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {blogs.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner" >
          {blogs.map((blog, index) => (
            <div key={blog._id} style={{ color: "black" }} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={blog.image} style={{objectFit: "fill"}} className="d-block w-100" alt={blog.title} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{blog.title && blog.title.length > 60 ? blog.title.substring(0, 60) : blog.title}...</h5>
                <p>{blog.description && blog.description.length > 255 ? blog.description.substring(0, 255) : blog.description}...</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <section className='container'>
        <h1 className='mt-5 link'>Latest Blogs</h1>
        <div className="row">
          {blogs && blogs.length > 0 ? blogs.map((blog) => (
            <div className="col-md-6 my-5 blog" key={blog._id}>
              <div className="card">
                <img src={blog.image} style={{objectFit:"fill "}} className="" alt="..." />
                <div className="card-body">
                  <h4 className="card-title">{blog.title && blog.title.length > 60 ? blog.title.substring(0, 60) : blog.title}...</h4>
                  {/* <h4 className="card-title">{blog.title}</h4> */}
                  <p className="card-text">{blog.description && blog.description.length > 255 ? blog.description.substring(0, 255) : blog.description}...</p>
                  {/* <p className="card-text">{blog.description}</p> */}
                  <Link to={`/getBlog/${blog._id}`} className="btn btn-dark">Read more</Link>
                </div>
                <div className="card-footer text-muted">
                  {blog.date}
                </div>
              </div>
            </div>
          )) : <p>Loading blogs...</p>}
        </div>
      </section>
    </div>
  );
}

export default Home;

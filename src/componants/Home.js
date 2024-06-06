import React, { useContext, useEffect } from 'react';
import baseball from '../images/baseball.jpg';
import BlogContext from '../context/blogs/BlogContest'; // Ensure correct import path
import './componant.css';

const Home = () => {
  const context = useContext(BlogContext);
  const { blogs, getBlog } = context;
  useEffect(() => {
    getBlog();
  }, []); // Empty dependency array ensures it runs once after the initial render

  return (
    <div className=''>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={baseball} className="d-block w-100" alt="" />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={baseball} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={baseball} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Some sports that will be affected by big-data advances</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
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
                <img src={baseball} className="d-block w-100" alt="..." />
                <div className="card-body">
                  <h4 className="card-title">{blog.title && blog.title.length > 60 ? blog.title.substring(0, 60) : blog.title}...</h4>
                  {/* <h4 className="card-title">{blog.title}</h4> */}
                  <p className="card-text">{blog.description && blog.description.length > 255 ? blog.description.substring(0, 255) : blog.description}...</p>
                  {/* <p className="card-text">{blog.description}</p> */}
                  <a href="#" className="btn btn-dark">Read more</a>
                </div>
                <div className="card-footer text-muted">
                  2 days ago
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

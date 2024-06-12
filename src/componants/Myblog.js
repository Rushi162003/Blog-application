import React, { useContext, useEffect } from 'react';
// import baseball from '../images/baseball.jpg';
import BlogContext from '../context/blogs/BlogContest'; // Ensure correct import path
import './componant.css';
import { Link, useNavigate } from 'react-router-dom'

const Myblog = () => {

    const context = useContext(BlogContext);
    const { blogs, getBlog } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getBlog();
            // eslint-disable-next-line
        }
        else {
            navigate("/login")
        }
    }, []); // Empty dependency array ensures it runs once after the initial render
    return (
        <div>
            <section className='container'>
                <h1 className='mt-5 link'>Latest Blogs</h1>
                <div className="row">
                    {blogs && blogs.length > 0 ? blogs.map((blog) => (
                        <div className="col-md-6 my-5 blog" key={blog._id}>
                            <div className="card">
                                <img src={blog.image} style={{ height: "400px" }} className="d-block w-100" alt={blog.title} />
                                <div className="card-body">
                                    <h4 className="card-title">{blog.title && blog.title.length > 60 ? blog.title.substring(0, 60) : blog.title}...</h4>
                                    <p className="card-text">{blog.description && blog.description.length > 255 ? blog.description.substring(0, 255) : blog.description}...</p>
                                    <Link to={"/getBlog/"+blog._id} className="btn btn-dark">Read more</Link>
                                </div>
                                <div className="card-footer text-muted">

                                </div>
                            </div>
                        </div>
                    )) : <p>Loading blogs...</p>}
                </div>
            </section>    </div>
    )
}

export default Myblog

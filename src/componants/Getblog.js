import React, { useContext, useState, useEffect } from 'react'
import baseball from '../images/baseball.jpg';
import './componant.css';
import BlogContext from '../context/blogs/BlogContest';
import { useParams } from 'react-router-dom';

const Getblog = () => {
    const { id } = useParams();
    const context = useContext(BlogContext);
    const { getSingleBlogId } = context; 
    const [blog, setBlog] = useState();
    useEffect(() => {
        const fetchBlog = async () => {
            const fetchedBlog = await getSingleBlogId(id);
            setBlog(fetchedBlog);
        };
        fetchBlog();
    }, [id, getSingleBlogId]);
    
    if (!blog) return <p>Loading...</p>;

    return (
        <div className='container'>
            <div className="my-4 title d-flex justify-content-center">
                <h2>{blog.title}</h2>
            </div>
            <div className="my-4 image d-flex justify-content-center ">
                <img src={blog.image} className='d-block  ' style={{ height: "500px" }} alt={blog.title} />
            </div>
            <div className=' my-4 container description d-flex justify-content-center'>
                <p>
                    {blog.description}
                </p>
            </div>
        </div >
    )
}

export default Getblog

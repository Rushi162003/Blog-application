import React, { useState } from 'react'
import BlogContext from "./BlogContest";


const BlogState = (props) => {
    const Host = "http://localhost:5000"
    const getD = []
    const [blogs, setBlog] = useState(getD)

    // Fetch all blogs
    const getBlog = async () => {
        //API call
        const response = await fetch(`${Host}/api/blog/fetchallblogs`, {
            method: "GET",
            headers: {
                "Accept": " */*",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken'),
            },
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json(); // SyntaxError:  Unexpected token '<', "<!DOCTYPE "... is not valid JSON
        setBlog(json)
    }

    // Add Blog
    const addBlog = async (title, description, image, tag) => {
        const response = await fetch(`${Host}/api/blog/addblog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken'),
            },
            body: JSON.stringify({ title, description, image, tag })
        });

        const blog = await {
            "user": "665c5e8d3a20ed6f03274434",
            "title": title,
            "description": description,
            "image": image,
            "tag": tag,
            "_id": "665fef807ee78eb5903bf05c",
            "__v": 0
        };
        setBlog(blogs.concat(blog))
    }

    const getSingleBlogId = async (id) => {
        try{
        const response = await fetch(`${Host}/api/blog/getBlog/${id}`, {
            method: "POST",
            headers: {
                "Accept": " */*",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken'),
            },
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    return response.data;
    }
    catch(error){
        console.log(error)
    }

    };

    // const getSingleBlogId = async (id) => {
    //     try {
    //         const response = await fetch(`${Host}/api/getBlog/${id}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };

    return (
        <BlogContext.Provider value={{ blogs, getBlog, addBlog, getSingleBlogId }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState

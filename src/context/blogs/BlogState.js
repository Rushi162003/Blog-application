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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzVlOGQzYTIwZWQ2ZjAzMjc0NDM0In0sImlhdCI6MTcxNzMyOTU0OX0.l_Iu0oPCVTG5UARIJQOkKNN7b6C2akG2n-rcXRYQYyA",
            },
            // body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json(); // SyntaxError:  Unexpected token '<', "<!DOCTYPE "... is not valid JSON
        console.log(json)
        setBlog(json)
    }

    // Add Blog
    const addBlog = async (title, description, image, tag) => {
        const response = await fetch(`${Host}/api/blog/addblog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzVlOGQzYTIwZWQ2ZjAzMjc0NDM0In0sImlhdCI6MTcxNzMyOTU0OX0.l_Iu0oPCVTG5UARIJQOkKNN7b6C2akG2n-rcXRYQYyA",
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
        console.log(blog)
    }

    return (
        <BlogContext.Provider value={{ blogs, getBlog, addBlog }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState

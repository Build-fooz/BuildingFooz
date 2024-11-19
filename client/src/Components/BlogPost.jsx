// client/src/components/BlogPost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPost.css';

function BlogPost() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', newBlog);
      fetchBlogs();
      setNewBlog({ title: '', content: '', image: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container blog-post">
      <h1>Blog Posts</h1>
      <form onSubmit={handleAddBlog}>
        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newBlog.image}
          onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
        />
        <button type="submit">Add Blog</button>
      </form>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            {blog.image && <img src={blog.image} alt={blog.title} />}
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPost;

// client/src/components/CustomerStory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerStory.css';

function CustomerStory() {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ name: '', story: '', image: '' });

  // Fetch customer stories
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customer-stories');
      setStories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle adding a new customer story
  const handleAddStory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customer-stories', newStory);
      fetchStories();
      setNewStory({ name: '', story: '', image: '' });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a customer story
  const handleDeleteStory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customer-stories/${id}`);
      fetchStories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container customer-story">
      <h1>Customer Stories</h1>
      <form onSubmit={handleAddStory}>
        <input type="text" placeholder="Name" value={newStory.name} onChange={(e) => setNewStory({ ...newStory, name: e.target.value })} required/>
        <textarea placeholder="Story" value={newStory.story} onChange={(e) => setNewStory({ ...newStory, story: e.target.value })} required/>
        <input type="text" placeholder="Image URL" value={newStory.image} onChange={(e) => setNewStory({ ...newStory, image: e.target.value })} />
        <button type="submit">Add Story</button>
      </form>
      <div className="story-list">
        {stories.map((story) => (
          <div key={story._id} className="story-item">
            {story.image && <img src={story.image} alt={story.name} />}
            <h2>{story.name}</h2>
            <p>{story.story}</p>
            <button onClick={() => handleDeleteStory(story._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerStory;

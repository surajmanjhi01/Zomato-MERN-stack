import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './createfood.css';

const Createfood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !video) {
      setMessage('Please add a reel title and video file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('video', video);

    setIsSubmitting(true);
    setMessage('');

    try {
      await api.post('/api/food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Reel uploaded successfully.');
      setName('');
      setDescription('');
      setVideo(null);
      event.target.reset();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to upload reel.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="create-food-page">
      <section className="create-food-card">
        <h1>Upload Food Reel</h1>
        <p>Add a short video to promote your dish.</p>

        <form onSubmit={handleSubmit} className="create-food-form">
          <label htmlFor="name">Reel Title</label>
          <input
            id="name"
            type="text"
            placeholder="Cheesy pizza slice"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Freshly baked with extra mozzarella"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="video">Reel Video</label>
          <input
            id="video"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Upload Reel'}
          </button>
        </form>

        {message && <p className="create-food-message">{message}</p>}

        <div className="create-food-actions">
          <button type="button" onClick={() => navigate('/food-partner/dashboard')}>
            Go to Dashboard
          </button>
          <Link to="/home">View Public Feed</Link>
        </div>
      </section>
    </main>
  );
};

export default Createfood;

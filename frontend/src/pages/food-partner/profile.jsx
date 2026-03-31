import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import api from '../../services/api';

const Profile = () => {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    setIsLoading(true);
    api
      .get('/api/food-partner/dashboard/me')
      .then((response) => {
        setDashboard(response.data.dashboard);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const profile = dashboard?.foodPartner;
  const reels = dashboard?.reels || [];
  const totalReels = dashboard?.stats?.totalReels || 0;

  const initials = useMemo(() => {
    if (!profile?.name) return 'FP';
    return profile.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }, [profile?.name]);

  const handleUploadReel = async (event) => {
    event.preventDefault();

    if (!title.trim() || !videoFile) {
      setUploadMessage('Please add reel title and choose a video.');
      return;
    }

    const formData = new FormData();
    formData.append('name', title.trim());
    formData.append('description', description.trim());
    formData.append('video', videoFile);

    setIsUploading(true);
    setUploadMessage('');

    try {
      const response = await api.post('/api/food', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedFood = response.data?.food;
      if (uploadedFood) {
        setDashboard((prev) => {
          if (!prev) return prev;
          const nextReels = [uploadedFood, ...(prev.reels || [])];
          return {
            ...prev,
            reels: nextReels,
            stats: {
              ...prev.stats,
              totalReels: nextReels.length,
            },
          };
        });
      }

      setUploadMessage('Reel uploaded successfully.');
      setTitle('');
      setDescription('');
      setVideoFile(null);
      event.target.reset();
      setShowUploader(false);
    } catch (uploadError) {
      setUploadMessage(uploadError.response?.data?.message || 'Failed to upload reel.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteReel = async (reelId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this reel?');
    if (!shouldDelete) return;

    setDeletingId(reelId);
    setUploadMessage('');

    try {
      await api.delete(`/api/food/${reelId}`);

      setDashboard((prev) => {
        if (!prev) return prev;
        const nextReels = (prev.reels || []).filter((item) => item._id !== reelId);
        return {
          ...prev,
          reels: nextReels,
          stats: {
            ...prev.stats,
            totalReels: nextReels.length,
          },
        };
      });

      setUploadMessage('Reel deleted successfully.');
    } catch (deleteError) {
      setUploadMessage(deleteError.response?.data?.message || 'Failed to delete reel.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <main className="partner-profile-page">
      <section className="partner-profile-shell" aria-label="Food partner profile">
        <div className="partner-cover" aria-hidden="true" />

        <header className="partner-profile-header">
          <div className="partner-identity-row">
            <div className="partner-identity-main">
              <div className="partner-avatar" aria-hidden="true">
                {initials}
              </div>

              <div className="partner-meta">
                <p className="partner-chip">Food Partner Dashboard</p>
                <h1 className="partner-name">{profile?.name || 'Business Name'}</h1>
                <p className="partner-address">{profile?.RestaurantName || 'Restaurant Name'}</p>
                {isLoading && <p className="partner-loading">Loading profile...</p>}
                {error && <p className="partner-loading">{error}</p>}
              </div>
            </div>

            <div className="partner-header-actions">
              <button
                type="button"
                className="partner-upload-btn"
                onClick={() => setShowUploader((prev) => !prev)}
              >
                {showUploader ? 'Close Uploader' : 'Upload Food Reel'}
              </button>

              <Link to="/home" className="partner-feed-link">
                Public Feed
              </Link>
            </div>
          </div>

          <div className="partner-stats-row" role="list" aria-label="Business stats">
            <article className="partner-stat" role="listitem">
              <p className="partner-stat-value">{totalReels}</p>
              <p className="partner-stat-label">Total Reels</p>
            </article>

            <article className="partner-stat" role="listitem">
              <p className="partner-stat-value">{profile?.ContactNumber || '-'}</p>
              <p className="partner-stat-label">Contact</p>
            </article>

            <article className="partner-stat" role="listitem">
              <p className="partner-stat-value">{profile?.email || '-'}</p>
              <p className="partner-stat-label">Email</p>
            </article>
          </div>
        </header>

        {showUploader && (
          <section className="partner-uploader" aria-label="Upload a new food reel">
            <h2 className="partner-uploader-title">Upload New Reel</h2>
            <p className="partner-uploader-copy">Share your best dish clip and attract more customers.</p>

            <form className="partner-uploader-form" onSubmit={handleUploadReel}>
              <label htmlFor="dashboard-reel-title">Reel title</label>
              <input
                id="dashboard-reel-title"
                type="text"
                placeholder="Smoky Paneer Wrap"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />

              <label htmlFor="dashboard-reel-description">Description</label>
              <textarea
                id="dashboard-reel-description"
                rows="3"
                placeholder="Hot, cheesy, and ready in 10 minutes"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <label htmlFor="dashboard-reel-video">Reel video</label>
              <input
                id="dashboard-reel-video"
                type="file"
                accept="video/*"
                onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
              />

              <button type="submit" className="partner-submit-btn" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload Reel'}
              </button>
            </form>

            {uploadMessage && <p className="partner-upload-message">{uploadMessage}</p>}
          </section>
        )}

        <section className="partner-content-header" aria-label="Uploads heading">
          <h2 className="partner-content-title">Uploaded Reels</h2>
          <p className="partner-content-count">{reels.length} videos</p>
        </section>

        {!reels.length && !isLoading && (
          <section className="partner-empty-state">
            <p>No reels uploaded yet.</p>
            <div className="partner-empty-actions">
              <Link to="/create-food">Upload your first reel</Link>
              <Link to="/home">See public feed</Link>
            </div>
          </section>
        )}

        <section className="partner-video-grid" aria-label="Uploaded videos">
          {reels.map((video, index) => (
            <article key={video._id} className="partner-video-tile">
              <button
                type="button"
                className="partner-delete-btn"
                onClick={() => handleDeleteReel(video._id)}
                disabled={deletingId === video._id}
              >
                {deletingId === video._id ? 'Deleting...' : 'Delete'}
              </button>
              <video className="partner-video-player" src={video.video} controls playsInline preload="metadata" />
              <span className="partner-video-index">#{index + 1}</span>
              <span className="partner-video-title">{video.name || `Video ${index + 1}`}</span>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Profile;

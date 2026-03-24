import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import api from '../../services/api';

const Profile = () => {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <main className="partner-profile-page">
      <section className="partner-profile-shell" aria-label="Food partner profile">
        <div className="partner-cover" aria-hidden="true" />

        <header className="partner-profile-header">
          <div className="partner-identity-row">
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

        <section className="partner-content-header" aria-label="Uploads heading">
          <h2 className="partner-content-title">Uploaded Reels</h2>
          <p className="partner-content-count">{reels.length} videos</p>
        </section>

        {!reels.length && !isLoading && (
          <section className="partner-empty-state">
            <p>No reels uploaded yet.</p>
            <Link to="/create-food">Upload your first reel</Link>
          </section>
        )}

        <section className="partner-video-grid" aria-label="Uploaded videos">
          {reels.map((video, index) => (
            <article key={video._id} className="partner-video-tile">
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

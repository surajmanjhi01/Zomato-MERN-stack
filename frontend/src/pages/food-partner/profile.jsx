import React, { useState, useEffect } from "react";
import "./profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:4000/api/food-partner/${id}`)
            .then((response) => {
                setProfile(response.data.foodPartner);
            })
            .catch((error) => {
                console.error("Error fetching food  partner  profile:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const sampleVideos = Array.from({ length: 9 }, (_, index) => ({
        id: `video-${index + 1}`,
        title: `Video ${index + 1}`,
    }));

    const displayVideos = Array.isArray(profile?.videos) && profile.videos.length > 0
        ? profile.videos
        : sampleVideos;

    const initials = profile?.name
        ? profile.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")
        : "FP";

    return (
        <main className="partner-profile-page">
            <section className="partner-profile-shell" aria-label="Food partner profile">
                <div className="partner-cover" aria-hidden="true" />

                <header className="partner-profile-header">
                    <div className="partner-identity-row">
                        <div className="partner-avatar" aria-hidden="true">{initials}</div>

                        <div className="partner-meta">
                            <p className="partner-chip">Food Partner</p>
                            <h1 className="partner-name">{profile?.name || "Business Name"}</h1>
                            <p className="partner-address">{profile?.address || "Address"}</p>
                            {isLoading && <p className="partner-loading">Loading profile...</p>}
                        </div>
                    </div>

                    <div className="partner-stats-row" role="list" aria-label="Business stats">
                        <article className="partner-stat" role="listitem">
                            <p className="partner-stat-value">{profile?.totalMeals || 0}</p>
                            <p className="partner-stat-label">Total Meals</p>
                        </article>

                        <article className="partner-stat" role="listitem">
                            <p className="partner-stat-value">{profile?.customersServed || 0}</p>
                            <p className="partner-stat-label">Customers Served</p>
                        </article>

                        <article className="partner-stat" role="listitem">
                            <p className="partner-stat-value">{profile?.rating || "4.8"}</p>
                            <p className="partner-stat-label">Rating</p>
                        </article>
                    </div>
                </header>

                <section className="partner-content-header" aria-label="Uploads heading">
                    <h2 className="partner-content-title">Uploads</h2>
                    <p className="partner-content-count">{displayVideos.length} videos</p>
                </section>

                <section className="partner-video-grid" aria-label="Uploaded videos">
                    {displayVideos.map((video, index) => (
                        <article key={video.id} className="partner-video-tile">
                            <span className="partner-video-index">#{index + 1}</span>
                            <span className="partner-video-title">{video.title || `Video ${index + 1}`}</span>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
};

export default Profile;
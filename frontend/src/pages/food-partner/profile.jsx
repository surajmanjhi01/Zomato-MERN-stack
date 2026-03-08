import React, { useState, useEffect } from "react";
import "./profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/food-partner/${id}`)
            .then((response) => {
                setProfile(response.data.foodPartner);
            })
            .catch((error) => {
                console.error("Error fetching food partner profile:", error);
            });
    }, [id]);

    const sampleVideos = Array.from({ length: 9 }, (_, index) => ({
        id: `video-${index + 1}`,
        title: `Video ${index + 1}`,
    }));

    return (
        <main className="partner-profile-page">
            <section className="partner-profile-shell" aria-label="Food partner profile">
                <header className="partner-profile-header">
                    <div className="partner-identity-row">
                        <div className="partner-avatar" aria-hidden="true" />

                        <div className="partner-meta">
                            <h1 className="partner-name">{profile?.name || 'Business Name'}</h1>
                            <p className="partner-address">{profile?.address || 'Address'}</p>
                        </div>
                    </div>

                    <div className="partner-stats-row" role="list" aria-label="Business stats">
                        <article className="partner-stat" role="listitem">
                            <p className="partner-stat-value">{profile?.totalMeals || 0}</p>
                            <p className="partner-stat-label">Total Meals</p>
                        </article>

                        <article className="partner-stat" role="listitem">
                            <p className="partner-stat-value">{profile?.customersServed || 0}</p>
                            <p className="partner-stat-label">Customer Served</p>
                        </article>
                    </div>
                </header>

                <section className="partner-video-grid" aria-label="Uploaded videos">
                    {sampleVideos.map((video) => (
                        <article key={video.id} className="partner-video-tile">
                            <span>{video.title}</span>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
};

export default Profile;
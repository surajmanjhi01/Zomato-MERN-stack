import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import api from '../../services/api';
import toast from 'react-hot-toast';

const DUMMY_VIDEO_ITEMS = [
    {
        id: 'dummy-1',
        name: 'Spice Route Kitchen',
        description: 'Crispy street-style snacks, fresh from the pan.',
        video: '/vdeos/1583289-hd_712_1366_20fps.mp4',
        likeCount: 24,
        savesCount: 8,
    },
    {
        id: 'dummy-2',
        name: 'Urban Biryani Hub',
        description: 'Slow-cooked biryani layered with fragrant rice.',
        video: '/vdeos/3198245-hd_720_1280_50fps.mp4',
        likeCount: 31,
        savesCount: 12,
    },
    {
        id: 'dummy-3',
        name: 'Tandoor Tales',
        description: 'Smoky grills and buttery naan coming out hot.',
        video: '/vdeos/3298011-hd_1080_2048_25fps.mp4',
        likeCount: 19,
        savesCount: 7,
    },
    {
        id: 'dummy-4',
        name: 'South Bowl Express',
        description: 'Filter coffee, dosas, and chutneys made fresh.',
        video: '/vdeos/4058071-hd_1080_2048_25fps.mp4',
        likeCount: 27,
        savesCount: 9,
    },
    {
        id: 'dummy-5',
        name: 'The Burger Garage',
        description: 'Loaded burgers with house sauce and crunchy fries.',
        video: '/vdeos/5900834-hd_1080_2048_25fps.mp4',
        likeCount: 35,
        savesCount: 16,
    },
    {
        id: 'dummy-6',
        name: 'Dessert Cart',
        description: 'Sweet treats, shakes, and evening special platters.',
        video: '/vdeos/6202680-hd_1080_1920_25fps.mp4',
        likeCount: 22,
        savesCount: 10,
    },
];

const ReelFeed = ({ items, onLike, emptyMessage }) => {
    const videoRefs = useRef([]);

    const getVideoSrc = (item) => {
        const raw = item?.video || item?.src || '';
        if (!raw) return '';
        if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('/')) {
            return raw;
        }
        return `/${raw}`;
    };

    useEffect(() => {
        videoRefs.current = videoRefs.current.slice(0, items.length);
        if (!videoRefs.current.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (!(video instanceof HTMLVideoElement)) return;

                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        const playPromise = video.play();
                        if (playPromise && typeof playPromise.catch === 'function') {
                            playPromise.catch(() => {
                                // Browser can still block autoplay in some cases.
                            });
                        }
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: [0.6] }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            observer.disconnect();
        };
    }, [items]);

    if (!items.length) {
        return (
            <main className="reels-feed" aria-label="Food reels feed">
                <section className="reel-slide">
                    <div className="reel-overlay">
                        <p className="reel-store">Food Feed</p>
                        <p className="reel-description">{emptyMessage}</p>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="reels-feed" aria-label="Food reels feed">
            {items.map((item, index) => (
                <section key={item._id || item.id} className="reel-slide">
                    <video
                        ref={(el) => {
                            videoRefs.current[index] = el;
                        }}
                        className="reel-video"
                        src={getVideoSrc(item)}
                        autoPlay
                        loop
                        playsInline
                        controls
                        preload="metadata"
                    />

                    <div className="reel-overlay">
                        <p className="reel-store">{item.foodpartner?.name || item.name || 'Food Store'}</p>
                        <p className="reel-description">{item.description || 'Fresh food video from our partners.'}</p>
                        <button type="button" className="reel-visit-btn" onClick={() => onLike(item)}>
                            Like ({item.likeCount || 0})
                        </button>
                    </div>
                </section>
            ))}
        </main>
    );
};

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const syncAuthState = () => {
            setIsAuthenticated(Boolean(localStorage.getItem('authRole')));
        };

        syncAuthState();
        window.addEventListener('storage', syncAuthState);

        api
            .get('/api/food/all')
            .then((response) => {
                console.log(response.data);
                setVideos(response.data.foodItems || []);
            })
            .catch(() => {
                setVideos([]);
            });

        return () => {
            window.removeEventListener('storage', syncAuthState);
        };
    }, []);

    const feedItems = videos.length ? videos : DUMMY_VIDEO_ITEMS;

    async function likeVideo(item) {
        try {
            const response = await api.post('/api/food/like', { foodId: item._id });

            if (response.data.like) {
                setVideos((prev) =>
                    prev.map((v) =>
                        v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v
                    )
                );
            } else {
                setVideos((prev) =>
                    prev.map((v) =>
                        v._id === item._id ? { ...v, likeCount: Math.max((v.likeCount || 0) - 1, 0) } : v
                    )
                );
            }
        } catch {
            // noop: endpoint is optional in current backend
        }
    }

    async function handleLogout() {
        const authRole = localStorage.getItem('authRole');
        const logoutPath = authRole === 'food-partner' ? '/api/auth/foodpartner/logout' : '/api/auth/user/logout';
        const loadingToast = toast.loading('Signing out...');

        try {
            await api.get(logoutPath);
        } catch {
            // Even if the backend call fails, clear the client session.
        } finally {
            localStorage.removeItem('authRole');
            localStorage.removeItem('authUserId');
            localStorage.removeItem('authFoodPartnerId');
            localStorage.removeItem('foodPartnerId');
            setIsAuthenticated(false);
            toast.success('Signed out successfully.', { id: loadingToast });
            navigate('/');
        }
    }

    return (
        <div className="home-page">
            {!isAuthenticated ? (
                <header className="home-top-nav" aria-label="Main navigation">
                    <Link to="/" className="home-brand">
                        Food Reel
                    </Link>

                    <nav className="home-auth-nav" aria-label="Authentication links">
                        <Link to="/user/login" className="home-nav-link">
                            User Login
                        </Link>
                        <Link to="/food-partner/login" className="home-nav-link">
                            Partner Login
                        </Link>
                    </nav>
                </header>
            ) : (
                <header className="home-session-bar" aria-label="Session actions">
                    <Link to="/" className="home-brand">
                        Food Reel
                    </Link>

                    <div className="home-session-actions">
                        {localStorage.getItem('authRole') === 'food-partner' && (
                            <Link to="/create-food" className="home-upload-btn">
                                Upload Food Reel
                            </Link>
                        )}

                        <button type="button" className="home-logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </header>
            )}

            <ReelFeed
                items={feedItems}
                onLike={likeVideo}
                emptyMessage="No videos available. Showing sample reels for now."
            />
        </div>
    );
};

export default Home;
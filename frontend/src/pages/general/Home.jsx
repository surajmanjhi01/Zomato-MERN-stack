import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import axios from 'axios';

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

const ReelFeed = ({ items, onLike, onSave, emptyMessage }) => {
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
                        muted
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
                        <button
                            type="button"
                            className="reel-visit-btn"
                            onClick={() => onSave(item)}
                            style={{ marginLeft: '0.5rem' }}
                        >
                            Save ({item.savesCount || 0})
                        </button>
                    </div>
                </section>
            ))}
        </main>
    );
};

const Home = () => {
    const [videos, setVideos] = useState([]);
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/food/all', { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setVideos(response.data.foodItems || []);
            })
            .catch(() => {
                setVideos([]);
            });
    }, []);

    const feedItems = videos.length ? videos : DUMMY_VIDEO_ITEMS;

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed
    async function likeVideo(item) {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/food/like',
                { foodId: item._id },
                { withCredentials: true }
            );

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

    async function saveVideo(item) {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/food/save',
                { foodId: item._id },
                { withCredentials: true }
            );

            if (response.data.save) {
                setVideos((prev) =>
                    prev.map((v) =>
                        v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v
                    )
                );
            } else {
                setVideos((prev) =>
                    prev.map((v) =>
                        v._id === item._id ? { ...v, savesCount: Math.max((v.savesCount || 0) - 1, 0) } : v
                    )
                );
            }
        } catch {
            // noop: endpoint is optional in current backend
        }
    }

    return (
        <ReelFeed
            items={feedItems}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available. Showing sample reels for now."
        />
    );
};

export default Home;
import React, { useRef, useEffect, useState } from 'react';

const BackgroundVideo = ({ category = 'default' }) => {
    // Store the current active video category
    const [activeCategory, setActiveCategory] = useState(category);

    // YouTube player references
    const playersRef = useRef({});

    // Video configuration
    const videoIds = {
        default: 'nit5V_K8uV4',
        playstation: 'giGyazPIbn8',
        hyukoh: 'Js67kofnQw0',
        reelpick: 'oanT_nueNEM',
        oheshio: 'pSUydWEqKwE', // 'renewal'을 'oheshio'로 변경 (Portfolio.js에 맞춤)
    };

    const videoTimes = {
        default: { start: 148, end: 250 },
        playstation: { start: 0, end: 180 },
        hyukoh: { start: 113, end: 180 },
        reelpick: { start: 0, end: 180 },
        oheshio: { start: 97, end: 180 }, // 'renewal'을 'oheshio'로 변경 (Portfolio.js에 맞춤)
    };

    // Load YouTube API
    useEffect(() => {
        // Create container divs for each player
        Object.keys(videoIds).forEach((key) => {
            const containerId = `video-container-${key}`;
            const playerId = `player-${key}`;

            // Check if container already exists
            if (!document.getElementById(containerId)) {
                console.log(`Creating container for ${key} video`);

                // Create container
                const container = document.createElement('div');
                container.id = containerId;
                container.style.position = 'absolute';
                container.style.inset = '0';
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.transition = 'opacity 500ms';
                container.style.opacity = key === activeCategory ? '1' : '0';
                container.style.zIndex = key === activeCategory ? '5' : '0';
                container.style.overflow = 'hidden';

                // Create player placeholder
                const player = document.createElement('div');
                player.id = playerId;
                player.style.position = 'absolute';
                player.style.width = '150%';
                player.style.height = '150%';
                player.style.top = '-25%';
                player.style.left = '-25%';
                player.style.transform = 'scale(1.34)'; // Scale up to fill 100% of screen

                container.appendChild(player);
                document.querySelector('#background-container').appendChild(container);
            }
        });

        // Load YouTube API if not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // Store original callback if it exists
            const originalCallback = window.onYouTubeIframeAPIReady;

            // Set up callback
            window.onYouTubeIframeAPIReady = () => {
                console.log('YouTube API Ready');
                if (originalCallback) originalCallback();
                initializePlayers();
            };

            // Add script to document
            document.head.appendChild(tag);
        } else if (window.YT.Player) {
            // API already loaded
            console.log('YouTube API already loaded');
            initializePlayers();
        }

        return () => {
            // Cleanup players on unmount
            Object.values(playersRef.current).forEach((player) => {
                if (player && typeof player.destroy === 'function') {
                    player.destroy();
                }
            });
        };
    }, []);

    // Initialize YouTube players
    const initializePlayers = () => {
        if (!window.YT || !window.YT.Player) {
            console.error('YouTube API not available');
            return;
        }

        Object.keys(videoIds).forEach((key) => {
            const playerId = `player-${key}`;
            const playerElement = document.getElementById(playerId);

            if (!playerElement) {
                console.error(`Player element ${playerId} not found`);
                return;
            }

            if (playersRef.current[key]) {
                console.log(`Player for ${key} already initialized`);
                return;
            }

            try {
                console.log(`Initializing player for ${key}`);
                const player = new window.YT.Player(playerId, {
                    videoId: videoIds[key],
                    playerVars: {
                        autoplay: key === activeCategory ? 1 : 0,
                        mute: 1,
                        controls: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        loop: 1,
                        playlist: videoIds[key],
                        disablekb: 1,
                        fs: 0,
                        rel: 0,
                        iv_load_policy: 3,
                        autohide: 1,
                        playsinline: 1,
                        enablejsapi: 1,
                        origin: window.location.origin,
                        start: videoTimes[key].start,
                        end: videoTimes[key].end,
                    },
                    events: {
                        onReady: (event) => {
                            console.log(`Player ${key} ready`);
                            if (key === activeCategory) {
                                event.target.mute();
                                event.target.playVideo();
                            } else {
                                event.target.pauseVideo();
                            }
                        },
                        onStateChange: (event) => {
                            if (event.data === window.YT.PlayerState.ENDED) {
                                event.target.seekTo(videoTimes[key].start);
                                if (key === activeCategory) {
                                    event.target.playVideo();
                                }
                            }
                        },
                        onError: (error) => {
                            console.error(`Player ${key} error:`, error);
                        },
                    },
                });

                playersRef.current[key] = player;
            } catch (error) {
                console.error(`Error initializing player ${key}:`, error);
            }
        });
    };

    // Handle category changes
    useEffect(() => {
        console.log(`Category changed to: ${category}`);
        setActiveCategory(category);

        // Update visibility of containers
        Object.keys(videoIds).forEach((key) => {
            const containerId = `video-container-${key}`;
            const container = document.getElementById(containerId);

            if (container) {
                container.style.opacity = key === category ? '1' : '0';
                container.style.zIndex = key === category ? '5' : '0';

                // Play or pause videos
                const player = playersRef.current[key];
                if (player && typeof player.getPlayerState === 'function') {
                    try {
                        if (key === category) {
                            player.seekTo(videoTimes[key].start);
                            player.playVideo();
                        } else {
                            player.pauseVideo();
                        }
                    } catch (e) {
                        console.error(`Error controlling player ${key}:`, e);
                    }
                }
            }
        });
    }, [category]);

    return (
        <div
            id='background-container'
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* YouTube players will be inserted into this container */}

            {/* Video overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 10,
                    pointerEvents: 'none',
                }}
            ></div>
        </div>
    );
};

export default BackgroundVideo;

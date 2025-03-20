import React, { useRef, useEffect, useState, useCallback } from 'react';

const BackgroundVideo = ({ category = 'default' }) => {
    // Store the current active video category
    const [activeCategory, setActiveCategory] = useState(category);
    // Reference for interval timer - 더 이상 필요하지 않지만 안전을 위해 유지
    const intervalRef = useRef(null);
    // Track if the YouTube API is ready
    const [ytApiReady, setYtApiReady] = useState(false);

    // YouTube player references
    const playersRef = useRef({});
    // Track which players are ready
    const playersReadyRef = useRef({});

    // Video configuration
    const videoIds = {
        default: 'kSZddHca0ME',
        playstation: 'giGyazPIbn8',
        hyukoh: 'Js67kofnQw0',
        reelpick: 'oanT_nueNEM',
        oheshio: 'ft70sAYrFyY',
    };

    const videoTimes = {
        default: { start: 0, end: 6000 },
        playstation: { start: 0, end: 180 },
        hyukoh: { start: 113, end: 180 },
        reelpick: { start: 0, end: 180 },
        oheshio: { start: 147, end: 180 },
    };

    // category prop이 변경될 때 activeCategory 업데이트
    useEffect(() => {
        console.log(`Prop category changed to: ${category}`);
        // hover 상태일 때 activeCategory를 업데이트
        if (category !== 'default') {
            setActiveCategory(category);
        } else {
            // category가 'default'로 돌아오면 activeCategory도 'default'로 설정
            setActiveCategory('default');
        }
    }, [category]);

    // Check if a player is fully ready
    const isPlayerReady = useCallback((key) => {
        return playersRef.current[key] && playersReadyRef.current[key] === true;
    }, []);

    // This function safely controls the player
    const safeControlPlayer = useCallback(
        (key, action) => {
            if (!isPlayerReady(key)) {
                console.log(`Player ${key} not ready for ${action}`);
                return;
            }

            try {
                const player = playersRef.current[key];
                if (action === 'play') {
                    player.seekTo(videoTimes[key].start);
                    player.playVideo();
                } else if (action === 'pause') {
                    player.pauseVideo();
                }
            } catch (e) {
                console.warn(`Error during ${action} for player ${key}:`, e);
            }
        },
        [isPlayerReady]
    );

    // Load YouTube API
    useEffect(() => {
        // Create background container if it doesn't exist
        const backgroundContainer = document.getElementById('background-container');
        if (!backgroundContainer) {
            console.log('Creating background container');
            const container = document.createElement('div');
            container.id = 'background-container';
            container.style.position = 'absolute';
            container.style.inset = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.overflow = 'hidden';
            container.style.pointerEvents = 'none';
            document.body.appendChild(container);
        }

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
                player.style.pointerEvents = 'none'; // 모든 클릭 이벤트 무시

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
                setYtApiReady(true);
            };

            // Add script to document
            document.head.appendChild(tag);
        } else if (window.YT.Player) {
            console.log('YouTube API already loaded');
            setYtApiReady(true);
        }

        return () => {
            // Cleanup interval on unmount
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            // Cleanup players on unmount
            Object.values(playersRef.current).forEach((player) => {
                if (player && typeof player.destroy === 'function') {
                    try {
                        player.destroy();
                    } catch (e) {
                        console.warn('Error destroying player:', e);
                    }
                }
            });
        };
    }, []);

    // Initialize YouTube players when API is ready
    useEffect(() => {
        if (!ytApiReady) return;

        // Reset player ready state
        playersReadyRef.current = {};

        const initializePlayers = () => {
            if (!window.YT || !window.YT.Player) {
                console.warn('YouTube API not available yet');
                // Try again in a moment
                setTimeout(initializePlayers, 500);
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
                    // Clean up existing player to avoid duplicates
                    try {
                        playersRef.current[key].destroy();
                    } catch (e) {
                        console.warn(`Error destroying existing player ${key}:`, e);
                    }
                }

                try {
                    console.log(`Initializing player for ${key}`);

                    // Mark player as not ready
                    playersReadyRef.current[key] = false;

                    const player = new window.YT.Player(playerId, {
                        videoId: videoIds[key],
                        playerVars: {
                            autoplay: 0, // Start paused, we'll play the active one after ready
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
                                // Always mute for user experience
                                event.target.mute();

                                // Mark this player as ready
                                playersReadyRef.current[key] = true;

                                // Only play if this is the active category
                                if (key === activeCategory) {
                                    console.log(`Playing active video ${key}`);
                                    safeControlPlayer(key, 'play');
                                }
                            },
                            onStateChange: (event) => {
                                if (event.data === window.YT.PlayerState.ENDED) {
                                    if (key === activeCategory) {
                                        safeControlPlayer(key, 'play');
                                    }
                                }
                            },
                            onError: (error) => {
                                console.error(`Player ${key} error:`, error);
                                // Mark as not ready on error
                                playersReadyRef.current[key] = false;
                            },
                        },
                    });

                    playersRef.current[key] = player;
                } catch (error) {
                    console.error(`Error initializing player ${key}:`, error);
                    playersReadyRef.current[key] = false;
                }
            });
        };

        initializePlayers();
    }, [ytApiReady, activeCategory, safeControlPlayer]);

    // Handle activeCategory changes (whether from hover or auto-cycle)
    useEffect(() => {
        console.log(`Active category changed to: ${activeCategory}`);

        // Update visibility of containers
        Object.keys(videoIds).forEach((key) => {
            const containerId = `video-container-${key}`;
            const container = document.getElementById(containerId);

            if (container) {
                container.style.opacity = key === activeCategory ? '1' : '0';
                container.style.zIndex = key === activeCategory ? '5' : '0';

                // Play or pause videos safely
                if (key === activeCategory) {
                    safeControlPlayer(key, 'play');
                } else {
                    safeControlPlayer(key, 'pause');
                }
            }
        });
    }, [activeCategory, videoIds, safeControlPlayer]);

    return (
        <div
            id='background-container'
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none', // 클릭 이벤트 무시
            }}
        >
            {/* YouTube players will be inserted into this container */}

            {/* Video overlay - added pointer-events: none to prevent clicking */}
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

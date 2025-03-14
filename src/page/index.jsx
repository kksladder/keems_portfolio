import React, { useEffect, useRef, useState, useCallback } from 'react';
import BackgroundVideo from './background';

const Portfolio = () => {
    // Fixed image paths - removed inconsistent /public/ prefix
    const portfolioItems = [
        {
            id: 1,
            title: 'PlayStation Project',
            imageUrl: '/image/ps5.jpg', // Ensure this file exists in the correct location
            url: 'https://kksladder.github.io/Playstation_Project/index2.html',
            videoCategory: 'playstation',
        },
        {
            id: 2,
            title: 'Hyukoh Project',
            imageUrl: '/image/aaa.jpg', // Ensure this file exists in the correct location
            url: 'https://hyukoharchive-g20jushpg-kims-projects-0be7b655.vercel.app/',
            videoCategory: 'hyukoh',
        },
        {
            id: 3,
            title: 'ReelPick OTT project',
            imageUrl: '/image/reelpick.png', // Ensure this file exists in the correct location
            url: 'https://reelpic-kott3-icpz.vercel.app/',
            videoCategory: 'reelpick',
        },
        {
            id: 4,
            title: 'Renewal',
            imageUrl: '/image/profile-1.jpeg', // Fixed inconsistent path - removed /public/
            url: 'https://oheshiorenewal.vercel.app/',
            videoCategory: 'oheshio',
        },
    ];

    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hovered, setHovered] = useState(null);
    const [activeVideoCategory, setActiveVideoCategory] = useState('default');

    // Handle mouse movement for 3D effect
    const handleMouseMove = useCallback(
        (e) => {
            if (!containerRef.current) return;

            const wh = window.innerHeight / 2;
            const ww = window.innerWidth / 2;
            const xPos = e.clientX - ww;
            const yPos = e.clientY - wh;

            containerRef.current.style.setProperty('--mouseX', `${xPos / 15}deg`);
            containerRef.current.style.setProperty('--mouseY', `${yPos / 15}deg`);

            // Use requestAnimationFrame for better performance
            window.requestAnimationFrame(() => {
                itemRefs.current.forEach((item, index) => {
                    if (item) {
                        const direction = index % 2 === 0 ? 1 : -1;
                        const depth = index * 5 + 10;
                        const baseTransform = `translate(${direction * (xPos / 50)}px, ${direction * (yPos / 50)}px)`;

                        if (hovered === index) {
                            item.style.transform = `
                        perspective(1000px) 
                        rotateY(var(--mouseX)) 
                        rotateX(var(--mouseY)) 
                        translateZ(${depth}px)
                        ${baseTransform}
                        `;
                        } else {
                            item.style.transform = baseTransform;
                        }

                        const shadowIntensity = hovered === index ? 0.7 : 0.5;
                        const shadowX = (xPos / ww) * 10;
                        const shadowY = (yPos / wh) * 10;
                        item.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, ${shadowIntensity}))`;
                    }
                });
            });
        },
        [hovered]
    );

    // Handle hovering over portfolio items
    const handleItemHover = useCallback((index) => {
        console.log(
            `Hovering item: ${index}, category: ${index !== null ? portfolioItems[index].videoCategory : 'default'}`
        );
        setHovered(index);

        if (index !== null) {
            setActiveVideoCategory(portfolioItems[index].videoCategory);
        } else {
            setActiveVideoCategory('default');
        }
    }, []);

    // Set up event listeners and styles
    useEffect(() => {
        // Add mouse move event listener
        document.addEventListener('mousemove', handleMouseMove);

        // Set global styles
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.backgroundColor = 'black';

        // Add CSS variables for the 3D effect
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --mouseX: 0deg;
                --mouseY: 0deg;
            }
            
            html, body {
                perspective: 1000px;
                margin: 0;
                padding: 0;
                overflow: hidden;
                width: 100%;
                height: 100%;
                background-color: black;
            }
        `;
        document.head.appendChild(style);

        // Clean up on component unmount
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.head.removeChild(style);
        };
    }, [handleMouseMove]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Background Video Component */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <BackgroundVideo category={activeVideoCategory} />
            </div>

            {/* Portfolio Items */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '50px',
                    position: 'relative',
                    zIndex: 20,
                }}
            >
                {portfolioItems.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => (itemRefs.current[index] = el)}
                        style={{
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.2s ease-out',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: item.url ? 'pointer' : 'default',
                        }}
                        onMouseEnter={() => handleItemHover(index)}
                        onMouseLeave={() => handleItemHover(null)}
                        onClick={() => {
                            if (item.url) {
                                window.open(item.url, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <div
                            style={{
                                width: '250px',
                                height: '250px',
                                transformStyle: 'preserve-3d',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                position: 'relative',
                                backgroundColor: 'transparent', // 배경을 투명하게 설정
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                onError={(e) => {
                                    console.error(`Failed to load image: ${item.imageUrl}`);
                                    e.target.src =
                                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250"><rect width="100%" height="100%" fill="gray"/><text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="white">Image Not Found</text></svg>';
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 0.5s',
                                    transform: hovered === index ? 'scale(1.05)' : 'scale(1)',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    opacity: hovered === index ? 1 : 0,
                                    transition: 'opacity 0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.5rem',
                                        marginBottom: '8px',
                                    }}
                                >
                                    {item.title}
                                </span>
                                {item.url && (
                                    <span style={{ color: '#4fc3f7', fontSize: '0.9rem' }}>Click to visit project</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;

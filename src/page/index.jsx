import React, { useEffect, useRef, useState, useCallback } from 'react';
import BackgroundVideo from './background';
import CollageLayout from './CollageLayout';

const Portfolio = () => {
    // Fixed image paths
    const portfolioItems = [
        {
            id: 1,
            title: 'PlayStation Project',
            imageUrl: '/image/ps5.jpg',
            url: 'https://kksladder.github.io/Playstation_Project/index2.html',
            videoCategory: 'playstation',
        },
        {
            id: 2,
            title: 'Hyukoh Project',
            imageUrl: '/image/aaa.jpg',
            url: 'https://hyukoharchive-g20jushpg-kims-projects-0be7b655.vercel.app/',
            videoCategory: 'hyukoh',
        },
        {
            id: 3,
            title: 'ReelPick OTT project',
            imageUrl: '/image/reelpick.png',
            url: 'https://reelpic-kott3-icpz.vercel.app/',
            videoCategory: 'reelpick',
        },
        {
            id: 4,
            title: 'Renewal',
            imageUrl: '/image/profile-1.jpeg',
            url: 'https://oheshiorenewal.vercel.app/',
            videoCategory: 'oheshio',
        },
    ];

    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hovered, setHovered] = useState(null);
    const [activeVideoCategory, setActiveVideoCategory] = useState('default');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

    // 화면 크기 업데이트
    const updateWindowWidth = useCallback(() => {
        const width = window.innerWidth;
        setWindowWidth(width);
    }, []);

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

    // 화면 크기 변화를 감지하고 반응형 처리
    useEffect(() => {
        // 초기 로드 시 화면 크기 설정
        updateWindowWidth();

        // 창 크기 변경 시 화면 크기 업데이트
        window.addEventListener('resize', updateWindowWidth);

        // Add mouse move event listener
        document.addEventListener('mousemove', handleMouseMove);

        // Set global styles
        document.body.style.margin = '0';
        document.body.style.padding = '0';
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
                width: 100%;
                height: 100%;
                background-color: black;
            }
            
            /* 스크롤바 스타일링 */
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            ::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.2);
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #4fc3f7;
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #29b6f6;
            }
        `;
        document.head.appendChild(style);

        // Clean up on component unmount
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
            document.removeEventListener('mousemove', handleMouseMove);
            document.head.removeChild(style);
        };
    }, [handleMouseMove, updateWindowWidth]);

    // 화면 크기에 따라 컨테이너 방향과 아이템 레이아웃을 결정하는 함수
    const getContainerStyles = () => {
        // 기본 스타일 (데스크탑)
        if (windowWidth >= 1024) {
            return {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
                flexWrap: 'nowrap',
                width: '100%',
                maxWidth: '100%',
                padding: '20px',
            };
        }
        // 태블릿
        else if (windowWidth >= 390) {
            return {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '30px',
                width: '100%',
                maxWidth: '100%',
                padding: '20px',
                overflowY: 'auto',
                maxHeight: '90vh',
            };
        }
        // 모바일
        else {
            return {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                maxWidth: '100%',
                padding: '20px',
                overflowY: 'auto',
                maxHeight: '90vh',
            };
        }
    };

    // 화면 크기에 따라 아이템 크기를 결정하는 함수
    const getItemSize = () => {
        if (windowWidth >= 1024) {
            return {
                width: '250px',
                height: '250px',
            };
        } else if (windowWidth >= 390) {
            return {
                width: '250px',
                height: '250px',
            };
        } else {
            return {
                width: '250px',
                height: '250px',
            };
        }
    };

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                margin: '0 auto',
                position: 'relative',
                overflowY: 'auto',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Background Video Component */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                }}
            >
                <BackgroundVideo category={activeVideoCategory} />
            </div>

            {/* CollageLayout 컴포넌트 추가 */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 15 }}>
                <CollageLayout />
            </div>

            {/* Portfolio Items */}
            <div
                style={{
                    ...getContainerStyles(),
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
                            margin: '10px 0',
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
                                ...getItemSize(),
                                transformStyle: 'preserve-3d',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                position: 'relative',
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
                                        fontSize: windowWidth < 1024 ? '1.2rem' : '1.5rem',
                                        marginBottom: '8px',
                                        textAlign: 'center',
                                        padding: '0 10px',
                                    }}
                                >
                                    {item.title}
                                </span>
                                {item.url && (
                                    <span
                                        style={{
                                            color: '#4fc3f7',
                                            fontSize: windowWidth < 1024 ? '0.9rem' : '1rem',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Click to visit project
                                    </span>
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

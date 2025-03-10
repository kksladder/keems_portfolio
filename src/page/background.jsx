import React, { useEffect, useRef, useState, useCallback } from 'react';
import BackgroundVideo from './background';

console.log('Portfolio component loaded');

const Portfolio = () => {
    // Portfolio items with images, links and video categories connected
    const portfolioItems = [
        {
            id: 1,
            title: 'PlayStation Project',
            imageUrl: '/image/ps5.jpg',
            url: 'https://kksladder.github.io/Playstation_Project/index2.html',
            videoCategory: 'playstation', // 각 프로젝트에 맞는 비디오 카테고리 설정
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
            title: 'Reel Pick OTT project',
            imageUrl: '/image/reelpick.png',
            url: 'https://reelpic-kott3-icpz.vercel.app/',
            videoCategory: 'reelpick',
        },
        {
            id: 4,
            title: 'Minimalist Project',
            imageUrl: '/public/image/22.jpg',
            url: '',
            videoCategory: 'default',
        },
    ];

    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hovered, setHovered] = useState(null);
    const [activeVideoCategory, setActiveVideoCategory] = useState('default');

    const handleMouseMove = useCallback(
        (e) => {
            if (!containerRef.current) return;

            const wh = window.innerHeight / 2;
            const ww = window.innerWidth / 2;
            const xPos = e.clientX - ww;
            const yPos = e.clientY - wh;

            containerRef.current.style.setProperty('--mouseX', `${xPos / 25}deg`);
            containerRef.current.style.setProperty('--mouseY', `${yPos / 25}deg`);

            requestAnimationFrame(() => {
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

    // 이미지에 호버했을 때 비디오 카테고리 변경
    const handleItemHover = (index) => {
        // 더 명확한 로깅
        const newCategory = index !== null ? portfolioItems[index].videoCategory : 'default';
        console.log(`===== HOVER EVENT =====`);
        console.log(`Index: ${index}, New Category: ${newCategory}`);
        console.log(`Previous Category: ${activeVideoCategory}`);

        setHovered(index);

        // 카테고리가 변경될 때만 상태 업데이트
        if (activeVideoCategory !== newCategory) {
            console.log(`Changing active video from ${activeVideoCategory} to ${newCategory}`);
            setActiveVideoCategory(newCategory);
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);

        // 전체 화면 적용
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.backgroundColor = 'black';

        if (containerRef.current) {
            containerRef.current.style.width = '100vw';
            containerRef.current.style.height = '100vh';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <div
            ref={containerRef}
            style={{
                '--mouseX': '0deg',
                '--mouseY': '0deg',
                width: '100vw',
                height: '100vh',
                margin: '0',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '100%',
            }}
        >
            {/* 배경 비디오 컴포넌트 */}
            <div
                className='absolute inset-0 w-full h-full'
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
                <BackgroundVideo category={activeVideoCategory} />
            </div>

            {/* 포트폴리오 아이템 */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '32px',
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
                            }}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
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

// CSS 변수를 정의하기 위한 스타일 컴포넌트
const PortfolioWithStyle = () => {
    console.log('PortfolioWithStyle component mounted');

    useEffect(() => {
        // 3D 효과를 위한 전역 스타일 추가
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
            
            #root {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            
            /* YouTube 비디오 관련 스타일 */
            .youtube-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            
            /* 비디오 전환 애니메이션 */
            .fade-transition {
                transition: opacity 0.3s ease-in-out;
            }
            
            /* iframe에 대한 스타일 직접 적용 */
            iframe {
                width: 100vw !important;
                height: 100vh !important;
                min-width: 100vw !important;
                min-height: 100vh !important;
                object-fit: cover !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
            }
            
            /* 비디오 크기 확대 */
            .player-container {
                position: absolute;
                width: 100%;
                height: 100%;
                transform: scale(1.5);
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return <Portfolio />;
};

export default PortfolioWithStyle;

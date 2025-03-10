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
            title: 'Reel Pick OTT project',
            imageUrl: '/image/reelpick.png',
            url: 'https://reelpic-kott3-icpz.vercel.app/',
            videoCategory: 'reelpick',
        },
        {
            id: 4,
            title: 'Minimalist Project',
            imageUrl: '/image/22.jpg',
            url: '',
            videoCategory: 'default',
        },
    ];

    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hovered, setHovered] = useState(null);
    const [activeVideoCategory, setActiveVideoCategory] = useState('default');
    const [isSmallScreen, setIsSmallScreen] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 1200 : false
    );
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);
    const lastScrollTime = useRef(0);

    // 기본 이미지 데이터 URL (이미지 로드 실패 시 사용)
    const fallbackImageUrl =
        'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22250%22%20height%3D%22250%22%20viewBox%3D%220%200%20250%20250%22%3E%3Crect%20fill%3D%22%23333%22%20width%3D%22250%22%20height%3D%22250%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22Arial%22%20font-size%3D%2220%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3EImage%20not%20found%3C%2Ftext%3E%3C%2Fsvg%3E';

    // 화면 크기 변경 감지 핸들러
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1200);
        };

        // 초기 설정 및 이벤트 리스너 등록
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 마우스 이동 핸들러 - 성능 최적화
    const handleMouseMove = useCallback((e) => {
        // 현재 시간을 가져옴
        const now = Date.now();

        // 마지막 업데이트 이후 16ms(약 60fps)가 지나지 않았다면 무시
        if (now - lastScrollTime.current < 16) {
            return;
        }

        lastScrollTime.current = now;

        // 마우스 위치 업데이트
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
    }, []);

    // 애니메이션 효과 적용
    useEffect(() => {
        if (!containerRef.current) return;

        const wh = window.innerHeight / 2;
        const ww = window.innerWidth / 2;
        const xPos = mousePosition.x - ww;
        const yPos = mousePosition.y - wh;

        // CSS 변수 설정
        containerRef.current.style.setProperty('--mouseX', `${xPos / 25}deg`);
        containerRef.current.style.setProperty('--mouseY', `${yPos / 25}deg`);

        // 이전 애니메이션 프레임 취소
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        // 새 애니메이션 프레임 요청
        animationFrameRef.current = requestAnimationFrame(() => {
            itemRefs.current.forEach((item, index) => {
                if (!item) return;

                const direction = index % 2 === 0 ? 1 : -1;
                const depth = index * 5 + 10;
                const baseTransform = `translate(${direction * (xPos / 70)}px, ${direction * (yPos / 70)}px)`;

                // 호버된 아이템에 3D 효과 적용
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

                // 그림자 효과
                const shadowIntensity = hovered === index ? 0.6 : 0.4;
                const shadowX = (xPos / ww) * 8;
                const shadowY = (yPos / wh) * 8;
                item.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 15px rgba(0, 0, 0, ${shadowIntensity}))`;
            });
        });

        // 클린업 함수
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [mousePosition, hovered]);

    // 아이템 호버 핸들러
    const handleItemHover = useCallback(
        (index) => {
            const newCategory = index !== null ? portfolioItems[index].videoCategory : 'default';

            setHovered(index);

            if (activeVideoCategory !== newCategory) {
                console.log(`Changing active video from ${activeVideoCategory} to ${newCategory}`);
                setActiveVideoCategory(newCategory);
            }
        },
        [activeVideoCategory, portfolioItems]
    );

    // 전체 문서 이벤트 및 스타일 설정
    useEffect(() => {
        // 마우스 이벤트 리스너 등록
        window.addEventListener('mousemove', handleMouseMove);

        // 전체 화면 스타일 적용
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.backgroundColor = 'black';

        if (containerRef.current) {
            containerRef.current.style.width = '100vw';
            containerRef.current.style.height = '100vh';
        }

        // 클린업 함수
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    // 포트폴리오 렌더링
    return (
        <div
            ref={containerRef}
            style={{
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

            {/* 포트폴리오 아이템 컨테이너 */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: isSmallScreen ? '20px' : '32px',
                    position: 'relative',
                    zIndex: 20,
                    flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
                    maxWidth: '90%',
                    padding: '20px',
                }}
                className='portfolio-container'
            >
                {portfolioItems.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => (itemRefs.current[index] = el)}
                        style={{
                            transformStyle: 'preserve-3d',
                            transition: 'all 0.25s ease-out',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: item.url ? 'pointer' : 'default',
                            margin: '10px',
                        }}
                        className='portfolio-item'
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
                                width: isSmallScreen ? '200px' : '250px',
                                height: isSmallScreen ? '200px' : '250px',
                                transformStyle: 'preserve-3d',
                                overflow: 'hidden',
                                borderRadius: '12px',
                                position: 'relative',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
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
                                onError={(e) => {
                                    console.error(`Failed to load image: ${item.imageUrl}`);
                                    e.target.src = fallbackImageUrl;
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    opacity: hovered === index ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in-out',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: isSmallScreen ? '1.2rem' : '1.5rem',
                                        marginBottom: '10px',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    {item.title}
                                </span>
                                {item.url && (
                                    <span
                                        style={{
                                            color: '#4fc3f7',
                                            fontSize: '0.9rem',
                                            fontWeight: '500',
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
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

// CSS 변수를 정의하기 위한 스타일 컴포넌트
const PortfolioWithStyle = () => {
    const [styleAppended, setStyleAppended] = useState(false);

    useEffect(() => {
        // style 요소가 이미 추가되었는지 확인
        if (styleAppended) return;

        // 3D 효과를 위한 전역 스타일 추가
        const styleId = 'portfolio-global-styles';

        // 이미 존재하는지 확인
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
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
                    font-family: 'Segoe UI', Arial, sans-serif;
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
                    transition: opacity 0.5s ease-in-out;
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
                    z-index: 10;
                }
                
                /* 비디오 크기 확대 */
                .player-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform: scale(1.5);
                    z-index: 10;
                }
                
                /* 포트폴리오 컨테이너 스타일 */
                .portfolio-container {
                    z-index: 20;
                }
                
                /* 포트폴리오 아이템 스타일 */
                .portfolio-item {
                    transform: translateZ(0);
                    will-change: transform;
                }
                
                /* 미디어 쿼리 추가 (모바일 대응) */
                @media (max-width: 768px) {
                    .portfolio-container {
                        flex-wrap: wrap;
                        gap: 20px;
                    }
                    
                    .portfolio-item {
                        width: calc(50% - 20px);
                        margin: 10px;
                    }
                }
                
                @media (max-width: 480px) {
                    .portfolio-container {
                        flex-direction: column;
                    }
                    
                    .portfolio-item {
                        width: calc(100% - 20px);
                    }
                }
            `;
            document.head.appendChild(style);
            setStyleAppended(true);
        }

        // 컴포넌트 언마운트 시 실행될 클린업 함수는 필요하지 않음
        // 스타일이 전역적으로 한 번만 추가되도록 함
    }, [styleAppended]);

    return <Portfolio />;
};

export default PortfolioWithStyle;

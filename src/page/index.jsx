import React, { useEffect, useRef, useState, useCallback } from 'react';
import BackgroundVideo from './background';
import CollageLayout from './CollageLayout';
import ProfileDetails from './ProjectDetails';

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
            imageUrl: '/image/oheshio.png',
            url: 'https://oheshiorenewal.vercel.app/',
            videoCategory: 'oheshio',
        },
    ];

    // 섹션 관련 상태
    const sections = [
        { id: 'portfolio', title: '포트폴리오' },
        { id: 'about', title: '소개' },
        { id: 'skills', title: '기술' },
        { id: 'contact', title: '연락처' },
    ];
    const [activeSection, setActiveSection] = useState('portfolio');

    // Refs
    const containerRef = useRef(null);
    const mainContainerRef = useRef(null);
    const itemRefs = useRef([]);
    const sectionRefs = useRef({});

    // States
    const [hovered, setHovered] = useState(null);
    const [activeVideoCategory, setActiveVideoCategory] = useState('default');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Update window width
    const updateWindowWidth = useCallback(() => {
        const width = window.innerWidth;
        setWindowWidth(width);
    }, []);

    // 섹션 변경 함수
    const handleSectionChange = useCallback(
        (sectionId) => {
            // 현재 섹션 인덱스 찾기
            const currentIndex = sections.findIndex((section) => section.id === activeSection);
            const targetIndex = sections.findIndex((section) => section.id === sectionId);

            // 스크롤 진행도를 업데이트 (애니메이션용)
            const progress = targetIndex / (sections.length - 1);
            setScrollProgress(progress);

            // 섹션 변경
            setActiveSection(sectionId);
        },
        [activeSection, sections]
    );

    // 다음 섹션으로 이동
    const goToNextSection = useCallback(() => {
        const currentIndex = sections.findIndex((section) => section.id === activeSection);
        if (currentIndex < sections.length - 1) {
            setActiveSection(sections[currentIndex + 1].id);

            // 스크롤 진행도를 업데이트 (애니메이션용)
            const progress = (currentIndex + 1) / (sections.length - 1);
            setScrollProgress(progress);
        }
    }, [activeSection, sections]);

    // 이전 섹션으로 이동
    const goToPrevSection = useCallback(() => {
        const currentIndex = sections.findIndex((section) => section.id === activeSection);
        if (currentIndex > 0) {
            setActiveSection(sections[currentIndex - 1].id);

            // 스크롤 진행도를 업데이트 (애니메이션용)
            const progress = (currentIndex - 1) / (sections.length - 1);
            setScrollProgress(progress);
        }
    }, [activeSection, sections]);

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
    const handleItemHover = useCallback(
        (index) => {
            console.log(
                `Hovering item: ${index}, category: ${index !== null ? portfolioItems[index].videoCategory : 'default'}`
            );
            setHovered(index);

            if (index !== null) {
                setActiveVideoCategory(portfolioItems[index].videoCategory);
            } else {
                setActiveVideoCategory('default');
            }
        },
        [portfolioItems]
    );

    // Set up event listeners and global styles
    useEffect(() => {
        // Initial window width
        updateWindowWidth();

        // Event listeners for resize
        window.addEventListener('resize', updateWindowWidth);

        // Add mouse move event listener
        document.addEventListener('mousemove', handleMouseMove);

        // Add keyboard navigation
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                goToNextSection();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                goToPrevSection();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        // Set global styles
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.backgroundColor = 'black';
        document.body.style.overflowY = 'hidden';
        document.body.style.height = '100vh';
        document.documentElement.style.height = '100vh';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.userSelect = 'none';
        document.documentElement.style.userSelect = 'none';

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
                height: 100vh;
                background-color: black;
                overflow: hidden;
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
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }
            
            .section-transition-enter {
                animation: fadeIn 0.6s forwards;
            }
            
            .section-transition-exit {
                animation: fadeOut 0.6s forwards;
            }
            
            .nav-button {
                 background-color: rgba(79, 195, 247, 0.2);
    color: white;
    border: 2px solid #eee;
    width: 60px;
    height: 220px;
    display: flex;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 2rem;
    margin-top: 45px;
    margin-left: 250px;
    margin-right: 215px;
    font-weight: 600; 
    text-align: center;
    padding: 0;
    line-height: 1;  
}
            .nav-button:hover {
                background-color: rgba(79, 195, 247, 0.3);
                transform: scale(1.1);
            }
       
        `;
        document.head.appendChild(style);

        // Clean up on component unmount
        return () => {
            window.removeEventListener('resize', updateWindowWidth);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            document.head.removeChild(style);
        };
    }, [handleMouseMove, updateWindowWidth, goToNextSection, goToPrevSection]);

    // Get container styles based on screen size
    const getContainerStyles = () => {
        // Default styles (desktop)
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
        // Tablet
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
            };
        }
        // Mobile
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
            };
        }
    };

    // Get item size based on screen size
    const getItemSize = () => {
        if (windowWidth >= 1024) {
            return {
                width: '250px',
                height: '250px',
            };
        } else if (windowWidth >= 390) {
            return {
                width: '200px',
                height: '200px',
            };
        } else {
            return {
                width: '160px',
                height: '160px',
            };
        }
    };

    // 네비게이션 점 렌더링
    const renderNavDots = () => {
        return (
            <div
                style={{
                    position: 'fixed',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'none',
                    flexDirection: 'column',
                    gap: '8px',
                    zIndex: 50,
                }}
            >
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => handleSectionChange(section.id)}
                        title={section.title}
                    />
                ))}
            </div>
        );
    };

    // 네비게이션 버튼 렌더링
    const renderNavButtons = () => {
        const currentIndex = sections.findIndex((section) => section.id === activeSection);

        return (
            <>
                {/* 이전 버튼 */}
                <div
                    style={{
                        position: 'fixed',
                        left: '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 50,
                        opacity: currentIndex > 0 ? 1 : 0.3,
                        pointerEvents: currentIndex > 0 ? 'auto' : 'none',
                    }}
                >
                    <div className='nav-button' onClick={goToPrevSection}>
                        &lt;
                    </div>
                </div>

                {/* 다음 버튼 */}
                <div
                    style={{
                        position: 'fixed',

                        right: '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 50,
                        opacity: currentIndex < sections.length - 1 ? 1 : 0.3,
                        pointerEvents: currentIndex < sections.length - 1 ? 'auto' : 'none',
                    }}
                >
                    <div className='nav-button' onClick={goToNextSection}>
                        &gt;
                    </div>
                </div>
            </>
        );
    };

    // 포트폴리오 섹션 렌더링
    // Replace the renderPortfolioSection function with this updated version

    // 포트폴리오 섹션 렌더링
    const renderPortfolioSection = () => {
        // State to track which item should show the GitHub link
        const [visibleLink, setVisibleLink] = useState(null);
        // Ref to store timeout IDs for cleanup
        const timeoutRef = useRef(null);

        // GitHub URLs in order from left to right
        const githubUrls = [
            'https://github.com/kksladder/Playstation_Project-main',
            'https://github.com/kksladder/Hyukoh_Archive',
            'https://github.com/kksladder/REELPICKott3',
            'https://github.com/kksladder/OHESHIO',
        ];

        // Enhanced hover handler with timeout
        const handleItemHover = (index) => {
            console.log(`Hover state changed to: ${index}`); // Add this to debug
            // Set the hovered state for image effects immediately
            setHovered(index);

            // Update the video category when hovering
            if (index !== null) {
                setActiveVideoCategory(portfolioItems[index].videoCategory);
            } else {
                // Small delay before reverting to default video to avoid flickering
                setTimeout(() => {
                    if (hovered === null) {
                        setActiveVideoCategory('default');
                    }
                }, 300);
            }

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (index !== null) {
                // When hovering, show the link right away
                setVisibleLink(index);
            } else {
                // When leaving, set a timeout before hiding the link
                timeoutRef.current = setTimeout(() => {
                    setVisibleLink(null);
                }, 2000); // 2 seconds delay
            }
        };

        // Clean up timeout on unmount
        useEffect(() => {
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
        }, []);

        return (
            <div
                style={{
                    opacity: activeSection === 'portfolio' ? 1 : 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: activeSection === 'portfolio' ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease',
                    padding: '20px',
                }}
                className={activeSection === 'portfolio' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['portfolio'] = el)}
            >
                <div
                    ref={containerRef}
                    style={{
                        ...getContainerStyles(),
                        position: 'relative',
                    }}
                >
                    {portfolioItems.map((item, index) => {
                        // Get the item size dynamically
                        const itemSize = getItemSize();

                        return (
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
                                    position: 'relative', // For positioning of the GitHub link
                                    // Add padding to increase the hover area, especially for Oheshio
                                    padding: index === 3 ? '10px' : '5px',
                                    // Background to make padding area visible for debugging (can be removed later)
                                    // background: 'rgba(255,255,255,0.05)',
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
                                        width: itemSize.width,
                                        height: itemSize.height,
                                        transformStyle: 'preserve-3d',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        position: 'relative',
                                        border: hovered === index ? '1px solid #808080' : '2px solid transparent',
                                        transition: 'border 0.3s ease',
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
                                    {/* Overlay div that appears on hover */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundColor: 'rgba(0,0,0,0.7)', // Made darker for better visibility
                                            opacity: hovered === index ? 1 : 0,
                                            transition: 'opacity 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 5, // Ensure it's above the image
                                            pointerEvents: hovered === index ? 'auto' : 'none', // Only clickable when visible
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

                                {/* GitHub link button that appears on hover with delayed disappearance */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '-40px',
                                        width: itemSize.width,
                                        opacity: visibleLink === index ? 1 : 0,
                                        transform: visibleLink === index ? 'translateY(0)' : 'translateY(-10px)',
                                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                                        textAlign: 'center',
                                        pointerEvents: visibleLink === index ? 'auto' : 'none',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering parent onClick
                                        // Use the ordered GitHub URLs
                                        window.open(githubUrls[index], '_blank', 'noopener,noreferrer');
                                    }}
                                >
                                    <button
                                        style={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '8px 16px',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                            fontWeight: 'bold',
                                            width: '100%',
                                        }}
                                    >
                                        Github View Code
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // 소개 섹션 렌더링
    const renderAboutSection = () => {
        return (
            <div
                style={{
                    opacity: activeSection === 'about' ? 1 : 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: activeSection === 'about' ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease',
                    backgroundColor: 'transparent',
                    color: 'white',
                    padding: '50px',
                }}
                className={activeSection === 'about' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['about'] = el)}
            >
                <div style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#eee' }}>안녕하세요</h1>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>하이요</p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                        }}
                    >
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#eee',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            연락하기
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#eee',
                                color: 'black',
                                border: '2px solid #eee',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            이력서 보기
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // 기술 섹션 렌더링
    const renderSkillsSection = () => {
        const skills = [
            { name: 'React', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'HTML/CSS', level: 95 },
            { name: 'Node.js', level: 80 },
            { name: 'UI/UX Design', level: 75 },
        ];

        return (
            <div
                style={{
                    opacity: activeSection === 'skills' ? 1 : 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: activeSection === 'skills' ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease',
                    color: 'white',
                    padding: '50px',
                }}
                className={activeSection === 'skills' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['skills'] = el)}
            >
                <div style={{ maxWidth: '800px', width: '100%' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#4fc3f7', textAlign: 'center' }}>
                        기술 스택
                    </h1>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        {skills.map((skill, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '8px',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${skill.level}%`,
                                            height: '100%',
                                            backgroundColor: '#4fc3f7',
                                            borderRadius: '4px',
                                            transition: 'width 1s ease-in-out',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // 연락처 섹션 렌더링
    const renderContactSection = () => {
        return (
            <div
                style={{
                    opacity: activeSection === 'contact' ? 1 : 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: activeSection === 'contact' ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease',
                    color: 'white',
                    padding: '50px',
                }}
                className={activeSection === 'contact' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['contact'] = el)}
            >
                <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#eee' }}>연락처</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        아래 정보로 연락해주세요. 언제든지 메시지를 보내주시면 빠르게 답변 드리겠습니다.
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                            marginTop: '2rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>kksladder@gmail.com</span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>010-8901-9670</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 하단 탐색 버튼 렌더링
    const renderBottomNavigation = () => {
        return (
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '10px',
                    zIndex: 50,
                }}
            >
                {sections.map((section) => (
                    <button
                        key={section.id}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: activeSection === section.id ? '#4fc3f7' : 'transparent',
                            color: activeSection === section.id ? 'black' : 'white',
                            border: '1px solid #4fc3f7',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontSize: windowWidth < 768 ? '0.8rem' : '1rem',
                        }}
                        onClick={() => handleSectionChange(section.id)}
                    >
                        {section.title}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div
            ref={mainContainerRef}
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                backgroundColor: 'black',
                overflow: 'hidden',
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

            {/* CollageLayout component */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 15 }}>
                <CollageLayout />
            </div>

            {/* Navigation Dots */}
            {windowWidth >= 768 && renderNavDots()}

            {/* Navigation Buttons (only on larger screens) */}
            {windowWidth >= 768 && renderNavButtons()}

            {/* Bottom Navigation (only on smaller screens) */}
            {windowWidth < 768 && renderBottomNavigation()}

            {/* All Sections */}
            <div style={{ position: 'relative', zIndex: 20, width: '100%', height: '100%' }}>
                {renderPortfolioSection()}
                {renderAboutSection()}
                {renderSkillsSection()}
                {renderContactSection()}
            </div>
        </div>
    );
};

export default Portfolio;

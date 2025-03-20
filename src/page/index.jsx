import React, { useEffect, useRef, useState, useCallback } from 'react';
import BackgroundVideo from './background';
import CollageLayout from './CollageLayout';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGithub } from 'react-icons/fa';
import {
    SiJavascript,
    SiNextdotjs,
    SiTailwindcss,
    SiRedux,
    SiStyledcomponents,
    SiVite,
    SiChakraui,
    SiClaude,
} from 'react-icons/si';

const Portfolio = () => {
    // Fixed image paths
    const portfolioItems = [
        {
            id: 4,
            title: 'Renewal',
            imageUrl: '/image/oheshio.png',
            url: 'https://oheshiorenewal.vercel.app/',
            videoCategory: 'oheshio',
        },
        {
            id: 3,
            title: 'ReelPick OTT project',
            imageUrl: '/image/reelpick.png',
            url: 'https://reelpic-kott3-icpz.vercel.app/',
            videoCategory: 'reelpick',
        },
        {
            id: 2,
            title: 'Hyukoh Project',
            imageUrl: '/image/aaa.jpg',
            url: 'https://hyukoharchive-g20jushpg-kims-projects-0be7b655.vercel.app/',
            videoCategory: 'hyukoh',
        },
        {
            id: 1,
            title: 'PlayStation Project',
            imageUrl: '/image/ps5.jpg',
            url: 'https://kksladder.github.io/Playstation_Project/index2.html',
            videoCategory: 'playstation',
        },
    ];
    // 섹션 관련 상태
    const sections = [
        { id: 'portfolio', title: 'Portfolio' },
        { id: 'about', title: 'About' },
        { id: 'skills', title: 'Skills' },
        { id: 'contact', title: 'Contact' },
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
            /* Google Fonts에서 JetBrains Mono 폰트 임포트 */
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
            
            :root {
                --mouseX: 0deg;
                --mouseY: 0deg;
                --font-jetbrains: 'JetBrains Mono', monospace;
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
            
            /* 영어 텍스트에 JetBrains Mono 적용 */
            .eng-text {
                font-family: var(--font-jetbrains);
            }
            
            /* 영어와 한글을 구분해서 폰트 적용 */
            :lang(en) {
                font-family: var(--font-jetbrains);
            }
            
            /* 특정 요소에 대한 JetBrains Mono 폰트 적용 */
            h1, h2, h3, h4, h5, h6 {
                font-family: var(--font-jetbrains);
            }
            
            .skill-name, .project-name, .tech-label {
                font-family: var(--font-jetbrains);
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
                overflowX: 'auto',
                overflowY: 'hidden',
                minHeight: '300px',
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
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '90vh',
                minHeight: '300px',
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
                padding: '15px',
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: '85vh',
                minHeight: '250px',
            };
        }
    };

    // Get item size based on screen size
    const getItemSize = () => {
        if (windowWidth >= 1024) {
            return {
                width: '250px',
                height: '250px',
                minWidth: '250px',
            };
        } else if (windowWidth >= 390) {
            return {
                width: '200px',
                height: '200px',
                minWidth: '200px',
            };
        } else {
            return {
                width: '160px',
                height: '160px',
                minWidth: '160px',
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

    const renderNavButtons = () => {
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
                            backgroundColor: activeSection === section.id ? '#f0f0f0' : 'transparent',
                            color: activeSection === section.id ? 'black' : 'white',
                            borderRadius: '3px',
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

    // 포트폴리오 섹션 렌더링
    const renderPortfolioSection = () => {
        // State to track which item should show the GitHub link
        const [visibleLink, setVisibleLink] = useState(null);
        // Ref to store timeout IDs for cleanup
        const timeoutRef = useRef(null);

        // GitHub URLs in order from left to right
        const githubUrls = [
            'https://github.com/kksladder/OHESHIO',
            'https://github.com/kksladder/REELPICKott3',
            'https://github.com/kksladder/Hyukoh_Archive',
            'https://github.com/kksladder/Playstation_Project-main',
        ];

        // Enhanced hover handler with timeout
        const handleItemHover = (index) => {
            console.log(`Hover state changed to: ${index}`);

            // Set the hovered state for image effects
            setHovered(index);

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            if (index !== null) {
                // When hovering, update video immediately
                setActiveVideoCategory(portfolioItems[index].videoCategory);
                // Show link right away
                setVisibleLink(index);
            } else {
                // When leaving, set a timeout for reverting back
                timeoutRef.current = setTimeout(() => {
                    // Default video should play when nothing is hovered
                    console.log('타임아웃 실행: 기본 영상으로 변경');
                    setActiveVideoCategory('default');
                    setVisibleLink(null);
                }, 300); // short delay to avoid flickering
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
                                            fontFamily: "'JetBrains Mono', monospace",
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
                    padding: '0', // Removed the 50px padding that might be causing issues
                }}
                className={activeSection === 'about' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['about'] = el)}
            >
                <div
                    style={{
                        maxWidth: '800px',
                        textAlign: 'center',
                        width: '100%',
                        margin: '0 auto',
                        padding: '20px', // Consistent padding on all sides
                        boxSizing: 'border-box',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 3rem)', // Using clamp for better font scaling
                            marginBottom: '2rem',
                            color: '#eee',
                            wordBreak: 'keep-all',
                            overflowWrap: 'break-word',
                            textAlign: 'center', // Explicitly set text alignment
                        }}
                    >
                        안녕하세요
                    </h1>
                    <p
                        style={{
                            fontSize: 'clamp(1rem, 4vw, 1.2rem)', // Using clamp for better font scaling
                            lineHeight: '1.8',
                            marginBottom: '2rem',
                            wordBreak: 'keep-all',
                            overflowWrap: 'break-word',
                            textAlign: 'center', // Explicitly set text alignment
                        }}
                    >
                        나가라
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 'clamp(10px, 2vw, 20px)',
                            width: '100%',
                            flexWrap: 'wrap',
                        }}
                    />
                </div>
            </div>
        );
    };

    const renderSkillsSection = () => {
        // Playstation이 맨 앞에 보이도록 프로젝트 순서 조정
        // 각 프로젝트별 기술 스택 정의
        const projects = [
            {
                name: 'Playstation Project',
                skills: [
                    { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
                    { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
                    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
                    { name: 'GitHub', Icon: FaGithub, color: '#eeeeee' },
                ],
            },
            {
                name: 'Hyukoh Archive',
                skills: [
                    { name: 'Next.js', Icon: SiNextdotjs, color: '#eeeeee' },
                    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
                    { name: 'Chakra UI', Icon: SiChakraui, color: '#319795' },
                    { name: 'GitHub', Icon: FaGithub, color: '#eeeeee' },
                ],
            },
            {
                name: 'Reelpick OTT',
                skills: [
                    { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
                    { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
                    { name: 'React', Icon: FaReact, color: '#61DAFB' },
                    { name: 'Vite', Icon: SiVite, color: '#646CFF' },
                    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
                    { name: 'Styled-Components', Icon: SiStyledcomponents, color: '#DB7093' },
                    { name: 'GitHub', Icon: FaGithub, color: '#eeeeee' },
                ],
            },
            {
                name: 'Oheshio Renewal',
                skills: [
                    { name: 'React', Icon: FaReact, color: '#61DAFB' },
                    { name: 'Vite', Icon: SiVite, color: '#646CFF' },
                    { name: 'Redux Toolkit', Icon: SiRedux, color: '#764ABC' },
                    { name: 'Styled-Components', Icon: SiStyledcomponents, color: '#DB7093' },
                    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
                    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
                    { name: 'GitHub', Icon: FaGithub, color: '#eeeeee' },
                ],
            },
        ];

        // 종합적인 기술 스택 레벨
        const skills = [
            { name: 'React', level: 75, Icon: FaReact, color: '#61DAFB' },
            { name: 'JavaScript', level: 65, Icon: SiJavascript, color: '#F7DF1E' },
            { name: 'HTML5', level: 90, Icon: FaHtml5, color: '#E34F26' },
            { name: 'CSS3', level: 77, Icon: FaCss3Alt, color: '#1572B6' },
            { name: 'Next.js', level: 70, Icon: SiNextdotjs, color: '#eeeeee' },
            { name: 'Tailwind CSS', level: 90, Icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'Redux', level: 77, Icon: SiRedux, color: '#764ABC' },
            { name: 'Styled Components', level: 80, Icon: SiStyledcomponents, color: '#DB7093' },
            { name: 'Node.js', level: 80, Icon: FaNodeJs, color: '#339933' },
            { name: 'Claude', level: 100, Icon: SiClaude, color: ' #FFA500' },
        ];

        return (
            <div
                style={{
                    opacity: activeSection === 'skills' ? 1 : 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    marginTop: '50px',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    pointerEvents: activeSection === 'skills' ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease',
                    color: 'white',
                    padding: '0',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                }}
                className={activeSection === 'skills' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['skills'] = el)}
            >
                <div
                    style={{
                        maxWidth: '900px',
                        width: '100%',
                        padding: '30px 20px 80px',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(1.8rem, 5vw, 2.2rem)',
                            marginTop: '2.5rem',
                            marginBottom: '1.2rem',
                            color: 'white',
                            textAlign: 'center',
                            position: 'sticky',
                            top: '0',
                            padding: '10px 0',
                            zIndex: 10,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        Tech Stack
                    </h1>

                    {/* 프로젝트별 기술 스택 */}
                    <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {projects.map((project, projectIndex) => (
                            <div key={projectIndex} style={{ marginBottom: '0' }}>
                                <h2
                                    style={{
                                        fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
                                        marginBottom: '2rem',
                                        color: 'white',
                                        textAlign: 'center',
                                    }}
                                >
                                    {project.name}
                                </h2>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap', // 반응형을 위해 줄바꿈 허용
                                        gap: '12px',
                                        justifyContent: 'center',
                                        marginTop: '10px',
                                    }}
                                    className='project-skills-container'
                                >
                                    {project.skills.map((skill, skillIndex) => (
                                        <div
                                            key={skillIndex}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px',
                                                padding: '10px',
                                                width: '85px',
                                                flexShrink: 0,
                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                textAlign: 'center',
                                            }}
                                            className='skill-item'
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                                e.currentTarget.style.boxShadow = `0 5px 15px rgba(${parseInt(
                                                    skill.color.slice(1, 3),
                                                    16
                                                )}, ${parseInt(skill.color.slice(3, 5), 16)}, ${parseInt(
                                                    skill.color.slice(5, 7),
                                                    16
                                                )}, 0.3)`;
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <skill.Icon size={30} color={skill.color} style={{ marginBottom: '8px' }} />
                                            <span style={{ fontWeight: 'bold', textAlign: 'center', width: '100%' }}>
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 기술 숙련도 섹션 */}
                    <h2
                        style={{
                            fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
                            marginBottom: '0.8rem',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        Technical Proficiency
                    </h2>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            marginTop: '10px',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '10px auto 0',
                        }}
                    >
                        {skills.map((skill, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <skill.Icon size={24} color={skill.color} />
                                        <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                                    </div>
                                    <span>{skill.level}%</span>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '8px',
                                        borderRadius: '4px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${skill.level}%`,
                                            height: '100%',
                                            backgroundColor: skill.color,
                                            borderRadius: '4px',
                                            transition: 'width 1s ease-in-out',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 반응형 스타일 */}
                <style>{`
                    /* 스크롤바 숨기기 */
                    div::-webkit-scrollbar {
                        display: none;
                    }
                    
                    /* 기본 레이아웃 - 한 줄에 모든 아이콘 표시 */
                    .project-skills-container {
                        display: flex;
                        flex-wrap: nowrap;
                        overflow-x: auto;
                        padding-bottom: 10px;
                    }
                    
                    /* 850px 이하일 때 두 줄로 표시 */
                    @media (max-width: 850px) {
                        .project-skills-container {
                            flex-wrap: wrap;
                            overflow-x: visible;
                        }
                        
                        /* Reelpick OTT와 Oheshio Renewal 프로젝트의 스킬은 7개이므로 두줄로 표시 */
                        .project-skills-container .skill-item {
                            width: calc(50% - 12px);
                            max-width: 100px;
                            margin-bottom: 10px;
                        }
                    }
                    
                    /* 390px 이하일 때 더 많은 스킬은 세 줄로 표시 */
                    @media (max-width: 390px) {
                        /* 6개 이상의 스킬이 있는 프로젝트에 대해 세 줄로 표시 */
                        .project-skills-container .skill-item {
                            width: calc(33.333% - 12px);
                            max-width: 85px;
                        }
                    }
                `}</style>
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
                    right: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: activeSection === 'contact' ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease',
                    color: 'white',
                    padding: '0px',
                    margin: '0 auto',
                    boxSizing: 'border-box',
                }}
                className={activeSection === 'contact' ? 'section-transition-enter' : 'section-transition-exit'}
                ref={(el) => (sectionRefs.current['contact'] = el)}
            >
                <div
                    style={{
                        maxWidth: '800px',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 20px',
                        margin: '0 auto',
                        boxSizing: 'border-box',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '3rem',
                            marginBottom: '2rem',
                            color: '#eee',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        contact
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', width: '100%', textAlign: 'center' }}>
                        언제든지 메시지를 보내주시면 빠르게 답변 드리겠습니다.
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '2rem',
                                    maxWidth: '100%',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-all',
                                }}
                            >
                                kksladder@gmail.com
                            </span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '2rem',
                                    maxWidth: '100%',
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-all',
                                }}
                            >
                                010-8901-9670
                            </span>
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
                            backgroundColor: activeSection === section.id ? '#f0f0f0' : 'transparent',
                            color: activeSection === section.id ? 'black' : 'white',
                            // border: '1px solid #808080',
                            borderRadius: '3px',
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

            {/* Navigation Dots (only on larger screens) */}
            {windowWidth >= 1440 && renderNavDots()}

            {/* Navigation Buttons (only on larger screens) */}
            {windowWidth >= 1440 && renderNavButtons()}

            {/* Bottom Navigation (on screens smaller than 1440px) */}
            {windowWidth < 1440 && renderBottomNavigation()}

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

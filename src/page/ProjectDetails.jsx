import React, { useState, useEffect } from 'react';

// 기술 스택 아이콘들을 import (필요에 따라 추가)
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa';
import {
    SiJavascript,
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiStyledcomponents,
    SiRedux,
    SiMongodb,
    SiFirebase,
} from 'react-icons/si';

const ProfileDetails = () => {
    const [isVisible, setIsVisible] = useState(false);

    // 스크롤 이벤트 핸들러
    useEffect(() => {
        const handleScroll = () => {
            // 스크롤 위치에 따라 컴포넌트 표시/숨김 처리
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // 예를 들어, 페이지의 50% 이상 스크롤 했을 때 표시
            if (scrollPosition > windowHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // 스크롤 이벤트 리스너 추가
        window.addEventListener('scroll', handleScroll);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 기술 스택 데이터
    const techStacks = [
        { Icon: FaReact, name: 'React', color: '#61DAFB' },
        { Icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
        { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
        { Icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
        { Icon: FaNodeJs, name: 'Node.js', color: '#339933' },
        { Icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
        { Icon: SiStyledcomponents, name: 'Styled Components', color: '#DB7093' },
        { Icon: SiRedux, name: 'Redux', color: '#764ABC' },
        { Icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
        { Icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
        { Icon: FaHtml5, name: 'HTML5', color: '#E34F26' },
        { Icon: FaCss3Alt, name: 'CSS3', color: '#1572B6' },
        { Icon: FaGitAlt, name: 'Git', color: '#F05032' },
    ];

    return (
        <div
            className={`
                fixed bottom-0 left-0 w-full 
                bg-black text-white 
                transition-transform duration-500 ease-in-out
                ${isVisible ? 'translate-y-0' : 'translate-y-full'}
                p-8 z-50
            `}
        >
            <div className='max-w-6xl mx-auto'>
                {/* 개인 소개 섹션 */}
                <div className='grid md:grid-cols-2 gap-8'>
                    <div>
                        <h2 className='text-3xl font-bold mb-4'>About Me</h2>
                        <p className='text-gray-300 mb-4'>
                            저는 혁신적인 웹 솔루션을 만드는 열정적인 프론트엔드 개발자입니다. 사용자 경험을 최우선으로
                            생각하며, 최신 기술을 활용해 창의적인 프로젝트를 개발합니다.
                        </p>
                        <div className='flex items-center space-x-4'>
                            <a
                                href='mailto:your-email@example.com'
                                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
                            >
                                Contact Me
                            </a>
                            <a
                                href='/resume.pdf'
                                target='_blank'
                                className='border border-white hover:bg-white hover:text-black px-4 py-2 rounded'
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* 기술 스택 섹션 */}
                    <div>
                        <h3 className='text-2xl font-bold mb-4'>Tech Stack</h3>
                        <div className='grid grid-cols-4 gap-4'>
                            {techStacks.map(({ Icon, name, color }, index) => (
                                <div key={index} className='flex flex-col items-center justify-center' title={name}>
                                    <Icon
                                        size={40}
                                        color={color}
                                        className='mb-2 hover:scale-110 transition-transform'
                                    />
                                    <span className='text-xs text-gray-400'>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;

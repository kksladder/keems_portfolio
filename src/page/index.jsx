import React, { useState } from 'react';

const Main = () => {
    // 프로젝트 데이터
    const projects = [
        {
            id: 1,
            title: '웹 애플리케이션 프로젝트',
            description: 'React와 Node.js를 사용한 풀스택 웹 애플리케이션입니다.',
            image: 'https://via.placeholder.com/300x200',
            category: '개인 프로젝트',
            tags: ['React', 'Node.js', 'MongoDB'],
            link: 'https://example.com/project1',
        },
        {
            id: 2,
            title: '모바일 앱 디자인',
            description: '사용자 친화적인 UI/UX를 갖춘 모바일 앱 디자인 프로젝트입니다.',
            image: 'https://via.placeholder.com/300x200',
            category: '팀 프로젝트',
            tags: ['UI/UX', 'Figma', 'Prototyping'],
            link: 'https://example.com/project2',
        },
        {
            id: 3,
            title: '인터랙티브 웹사이트',
            description: '인터랙티브 요소가 많은 웹사이트 제작 프로젝트입니다.',
            image: 'https://via.placeholder.com/300x200',
            category: '개인 프로젝트',
            tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
            link: 'https://example.com/project3',
        },
        {
            id: 4,
            title: '브랜드 아이덴티티 디자인',
            description: '새로운 브랜드를 위한 로고 및 아이덴티티 디자인 작업입니다.',
            image: 'https://via.placeholder.com/300x200',
            category: '팀 프로젝트',
            tags: ['Branding', 'Illustrator', 'Logo Design'],
            link: 'https://example.com/project4',
        },
    ];

    // 상태 관리
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeProject, setActiveProject] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // 카테고리별 필터링
    const filteredProjects =
        selectedCategory === 'all' ? projects : projects.filter((project) => project.category === selectedCategory);

    // 프로젝트 클릭 핸들러
    const handleProjectClick = (project) => {
        setIsAnimating(true);
        setTimeout(() => {
            setActiveProject(project);
            setIsAnimating(false);
        }, 300);
    };

    // 카테고리 변경 핸들러
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setActiveProject(null);
    };

    return (
        <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-6xl mx-auto'>
                {/* 소개 섹션 */}
                <div className='text-center mb-16'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>나의 포트폴리오</h1>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                        React와 Tailwind CSS를 활용한 창의적인 작업물들을 모아놓은 공간입니다. 개인 프로젝트와 팀
                        작업물을 확인해보세요.
                    </p>
                </div>

                {/* 카테고리 필터 */}
                <div className='flex justify-center mb-12'>
                    <div className='inline-flex rounded-md shadow-sm'>
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                                selectedCategory === 'all'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            전체 보기
                        </button>
                        <button
                            onClick={() => handleCategoryChange('개인 프로젝트')}
                            className={`px-4 py-2 text-sm font-medium ${
                                selectedCategory === '개인 프로젝트'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            개인 프로젝트
                        </button>
                        <button
                            onClick={() => handleCategoryChange('팀 프로젝트')}
                            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                                selectedCategory === '팀 프로젝트'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            팀 프로젝트
                        </button>
                    </div>
                </div>

                {/* 프로젝트 그리드 */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                            className={`bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                                isAnimating ? 'opacity-50' : 'opacity-100'
                            }`}
                        >
                            <img src={project.image} alt={project.title} className='w-full h-48 object-cover' />
                            <div className='p-6'>
                                <div className='inline-block px-2 py-1 mb-4 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800'>
                                    {project.category}
                                </div>
                                <h3 className='text-xl font-semibold text-gray-900 mb-2'>{project.title}</h3>
                                <p className='text-gray-600 mb-4 line-clamp-2'>{project.description}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800'
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 선택된 프로젝트 상세 보기 */}
                {activeProject && (
                    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50'>
                        <div className='bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto'>
                            <div className='relative'>
                                <img
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    className='w-full h-64 object-cover rounded-t-lg'
                                />
                                <button
                                    onClick={() => setActiveProject(null)}
                                    className='absolute top-4 right-4 bg-white rounded-full p-2 shadow-md'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='p-6'>
                                <div className='inline-block px-2 py-1 mb-4 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800'>
                                    {activeProject.category}
                                </div>
                                <h2 className='text-3xl font-bold text-gray-900 mb-4'>{activeProject.title}</h2>
                                <p className='text-gray-600 mb-6'>{activeProject.description}</p>
                                <div className='flex flex-wrap gap-2 mb-6'>
                                    {activeProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800'
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={activeProject.link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 transition duration-300'
                                >
                                    프로젝트 보기
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* 간단한 소개 및 연락처 */}
                <div className='mt-20 text-center'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>저에 대해</h2>
                    <p className='text-lg text-gray-600 max-w-3xl mx-auto mb-6'>
                        창의적인 웹 개발자로서 사용자 경험을 중심으로 한 프로젝트를 진행하고 있습니다. 함께 작업하고
                        싶으시다면 연락 부탁드립니다.
                    </p>
                    <div className='flex justify-center gap-4'>
                        <a href='#' className='text-indigo-600 hover:text-indigo-800'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                />
                            </svg>
                        </a>
                        <a href='#' className='text-indigo-600 hover:text-indigo-800'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101'
                                />
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1'
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;

// components/SkillsSection.js
import React from 'react';

// 기술 스택 아이콘들 import
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

// 기술 스택 데이터
const mainSkills = [
    { name: 'React', level: 90, Icon: FaReact, color: '#61DAFB' },
    { name: 'JavaScript', level: 85, Icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', level: 80, Icon: SiTypescript, color: '#3178C6' },
    { name: 'HTML5', level: 95, Icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', level: 90, Icon: FaCss3Alt, color: '#1572B6' },
    { name: 'Node.js', level: 80, Icon: FaNodeJs, color: '#339933' },
    { name: 'Next.js', level: 85, Icon: SiNextdotjs, color: '#000000' },
    { name: 'Tailwind CSS', level: 85, Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'MongoDB', level: 75, Icon: SiMongodb, color: '#47A248' },
    { name: 'Redux', level: 78, Icon: SiRedux, color: '#764ABC' },
    { name: 'Styled Components', level: 82, Icon: SiStyledcomponents, color: '#DB7093' },
];

// 추가 기술 스택 데이터
const additionalSkills = [
    { Icon: FaGitAlt, name: 'GitHub', color: '#F05032' },
    { Icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
];

// 메인 스킬 아이템 컴포넌트
const SkillItem = ({ skill }) => {
    return (
        <div
            className='w-full p-4 rounded-lg bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] 
                       transition-all duration-300 hover:scale-[1.02]'
        >
            <div className='flex justify-between items-center mb-2.5'>
                <div className='flex items-center gap-3'>
                    <SkillsSection />
                    <skill.Icon size={28} color={skill.color} className='filter drop-shadow-glow animate-pulse' />
                    <span className='font-bold text-xl' style={{ color: skill.color }}>
                        {skill.name}
                    </span>
                </div>
                <span className='text-[#4fc3f7] font-bold text-lg bg-black/30 px-2 py-1 rounded-full'>
                    {skill.level}%
                </span>
            </div>
            <div className='w-full h-3 rounded-full overflow-hidden bg-white/10 shadow-inner'>
                <div
                    className='h-full rounded-full transition-all duration-1500 animate-glow'
                    style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 12px ${skill.color}80`,
                    }}
                />
            </div>
        </div>
    );
};

// 추가 기술 아이템 컴포넌트
const AdditionalSkillItem = ({ skill }) => {
    return (
        <div
            className='flex flex-col items-center p-5 rounded-xl bg-white/7 backdrop-blur-md
                       transition-all duration-300 hover:scale-110 hover:shadow-lg'
        >
            <skill.Icon size={45} color={skill.color} className='mb-3 filter drop-shadow-lg' />
            <span className='font-bold text-lg' style={{ color: skill.color }}>
                {skill.name}
            </span>
        </div>
    );
};

// 스킬 섹션 메인 컴포넌트
const SkillsSection = ({ activeSection, sectionRefs }) => {
    return (
        <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-600
                        ${
                            activeSection === 'skills'
                                ? 'opacity-100 pointer-events-auto'
                                : 'opacity-0 pointer-events-none'
                        }
                        overflow-y-auto text-white p-12 bg-gradient-to-b from-gray-900 to-gray-800`}
            ref={(el) => (sectionRefs.current['skills'] = el)}
        >
            <div className='max-w-5xl w-full'>
                <h1 className='text-5xl mb-16 text-[#4fc3f7] text-center font-bold drop-shadow-glow'>기술 스택</h1>

                {/* 메인 기술 스택 */}
                <div className='mb-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {mainSkills.map((skill, index) => (
                            <SkillItem key={index} skill={skill} />
                        ))}
                    </div>
                </div>

                {/* 추가 기술 스택 */}
                <div className='p-6 bg-black/30 rounded-2xl'>
                    <h3 className='text-3xl mb-8 text-[#4fc3f7] text-center font-bold drop-shadow-md'>추가 기술</h3>
                    <div className='flex flex-wrap justify-center gap-8'>
                        {additionalSkills.map((skill, index) => (
                            <AdditionalSkillItem key={index} skill={skill} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 커스텀 스타일 */}
            <style jsx>{`
                @keyframes glow {
                    0%,
                    100% {
                        opacity: 0.9;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                .animate-pulse {
                    animation: glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .animate-glow {
                    animation: glow 3s infinite;
                }

                .drop-shadow-glow {
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
                }

                .filter.drop-shadow-lg {
                    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
                }
            `}</style>
        </div>
    );
};

export default SkillsSection;

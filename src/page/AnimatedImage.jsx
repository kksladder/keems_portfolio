import React from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 키프레임 정의
const slideTop = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideBottom = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const zoom = keyframes`
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 애니메이션 매핑
const animations = {
    slideTop,
    slideRight,
    slideLeft,
    slideBottom,
    zoom,
    spin,
};

// 스타일이 적용된 이미지 컴포넌트
const AnimatedImg = styled.img`
    width: 100%;
    height: auto;
    opacity: ${(props) => (props.animationType === 'spin' ? 1 : 0)};
    animation: ${(props) => animations[props.animationType]} ${(props) => props.duration}s
        ${(props) => (props.animationType === 'spin' ? 'linear infinite' : `${props.delay}s forwards`)};
`;

const AnimatedImage = ({ src, alt, animationType, duration = 1, delay = 0 }) => {
    return <AnimatedImg src={src} alt={alt} animationType={animationType} duration={duration} delay={delay} />;
};

export default AnimatedImage;

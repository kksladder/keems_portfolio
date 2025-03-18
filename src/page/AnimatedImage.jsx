import React from 'react';
import styled, { keyframes, css } from 'styled-components';

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

// 새로운 연속 슬라이드 애니메이션 추가
const continuousSlide = keyframes`
  from { transform: translateX(100vw); }
  to { transform: translateX(-100%); }
`;

const zoom = keyframes`
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 추가된 애니메이션 키프레임
const bounce = keyframes`
  0% { transform: translateY(0); opacity: 0; }
  50% { transform: translateY(-20px); opacity: 0.5; }
  70% { transform: translateY(-10px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

const rotate = keyframes`
  from { transform: rotate(-90deg); opacity: 0; }
  to { transform: rotate(0); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// 회전이 추가된 slideLeft 애니메이션
const slideLeftRotate = keyframes`
  from { 
    transform: translateX(-50px) rotate(-15deg); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0) rotate(0deg); 
    opacity: 1; 
  }
`;

// 회전이 추가된 slideRight 애니메이션
const slideRightRotate = keyframes`
  from { 
    transform: translateX(50px) rotate(15deg); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0) rotate(0deg); 
    opacity: 1; 
  }
`;

// 회전이 추가된 slideTop 애니메이션
const slideTopRotate = keyframes`
  from { 
    transform: translateY(-50px) rotate(-15deg); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0) rotate(0deg); 
    opacity: 1; 
  }
`;

// 회전이 추가된 slideBottom 애니메이션
const slideBottomRotate = keyframes`
  from { 
    transform: translateY(50px) rotate(15deg); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0) rotate(0deg); 
    opacity: 1; 
  }
`;

// 페이드인 애니메이션 (기본값)
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 애니메이션 매핑
const animations = {
    slideTop,
    slideRight,
    slideLeft,
    slideBottom,
    continuousSlide,
    zoom,
    spin,
    bounce,
    rotate,
    float,
    shake,
    pulse,
    fadeIn,
    slideLeftRotate, // 새로 추가된 애니메이션
    slideRightRotate, // 새로 추가된 애니메이션
    slideTopRotate, // 새로 추가된 애니메이션
    slideBottomRotate, // 새로 추가된 애니메이션
};

// 애니메이션의 CSS 속성별 타입 분류
const animationTypes = {
    // 위치 변환 애니메이션 (translate)
    translateAnimations: [
        'slideTop',
        'slideRight',
        'slideLeft',
        'slideBottom',
        'float',
        'bounce',
        'shake',
        'continuousSlide',
        'slideLeftRotate',
        'slideRightRotate',
        'slideTopRotate',
        'slideBottomRotate',
    ],
    // 크기 변환 애니메이션 (scale)
    scaleAnimations: ['zoom', 'pulse'],
    // 회전 애니메이션 (rotate)
    rotateAnimations: ['spin', 'rotate', 'slideLeftRotate', 'slideRightRotate', 'slideTopRotate', 'slideBottomRotate'],
    // 불투명도 애니메이션 (opacity)
    opacityAnimations: [
        'fadeIn',
        'slideTop',
        'slideRight',
        'slideLeft',
        'slideBottom',
        'zoom',
        'bounce',
        'rotate',
        'slideLeftRotate',
        'slideRightRotate',
        'slideTopRotate',
        'slideBottomRotate',
    ],
    // 무한 반복 애니메이션
    infiniteAnimations: ['spin', 'float', 'shake', 'pulse', 'continuousSlide'],
};

// 각 애니메이션 유형에 대한 CSS 속성 및 값 매핑
const getAnimationCSS = (type, duration, delay) => {
    // 기본 애니메이션이 없거나 유효하지 않은 경우 fadeIn 사용
    const animationType = animations[type] ? type : 'fadeIn';

    // 무한 애니메이션인지 확인
    const isInfinite = animationTypes.infiniteAnimations.includes(animationType);

    // 애니메이션 타이밍 설정
    const timing = isInfinite ? 'linear infinite' : `${delay}s forwards`;

    return css`
        animation: ${animations[animationType]} ${duration}s ${timing};
    `;
};

// 회전 각도가 추가된 커스텀 키프레임 생성 함수
const createRotatedKeyframe = (baseType, rotationDeg) => {
    if (baseType === 'slideLeft') {
        return keyframes`
            from { 
                transform: translateX(-50px) rotate(${rotationDeg}deg); 
                opacity: 0; 
            }
            to { 
                transform: translateX(0) rotate(0deg); 
                opacity: 1; 
            }
        `;
    } else if (baseType === 'slideRight') {
        return keyframes`
            from { 
                transform: translateX(50px) rotate(${rotationDeg}deg); 
                opacity: 0; 
            }
            to { 
                transform: translateX(0) rotate(0deg); 
                opacity: 1; 
            }
        `;
    } else if (baseType === 'slideTop') {
        return keyframes`
            from { 
                transform: translateY(-50px) rotate(${rotationDeg}deg); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0) rotate(0deg); 
                opacity: 1; 
            }
        `;
    } else if (baseType === 'slideBottom') {
        return keyframes`
            from { 
                transform: translateY(50px) rotate(${rotationDeg}deg); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0) rotate(0deg); 
                opacity: 1; 
            }
        `;
    }

    // 기본값 반환
    return animations[baseType];
};

// 스타일이 적용된 이미지 컴포넌트
const AnimatedImg = styled.img`
    width: 100%;
    height: auto;
    opacity: ${(props) => {
        const types = Array.isArray(props.animationType) ? props.animationType : [props.animationType];

        // 무한 애니메이션이 하나라도 있으면 초기 opacity 1로 설정
        if (types.some((type) => animationTypes.infiniteAnimations.includes(type))) {
            return 1;
        }
        return 0;
    }};

    // 애니메이션 적용
    ${(props) => {
        const types = Array.isArray(props.animationType) ? props.animationType : [props.animationType];

        // 커스텀 회전 애니메이션 처리
        if (props.rotationDeg !== undefined && types[0] && types[0].startsWith('slide')) {
            const customKeyframe = createRotatedKeyframe(types[0], props.rotationDeg);
            return css`
                animation: ${customKeyframe} ${props.duration}s ${props.delay}s forwards;
            `;
        }

        // 첫 번째 애니메이션만 기본 animation 속성에 적용
        const primaryType = types[0] || 'fadeIn';
        const primaryIsInfinite = animationTypes.infiniteAnimations.includes(primaryType);
        const primaryTiming = primaryIsInfinite ? 'linear infinite' : `${props.delay}s forwards`;

        return css`
            animation: ${animations[primaryType]} ${props.duration}s ${primaryTiming};

            // 두 번째 이상의 애니메이션이 있을 경우 추가 속성으로 적용
            ${types.length > 1 &&
            types.slice(1).map((type, index) => {
                const isInfinite = animationTypes.infiniteAnimations.includes(type);
                const delay = Array.isArray(props.delay) ? props.delay[index + 1] || props.delay[0] : props.delay;
                const duration = Array.isArray(props.duration)
                    ? props.duration[index + 1] || props.duration[0]
                    : props.duration;
                const timing = isInfinite ? 'linear infinite' : `${delay}s forwards`;

                if (type === 'spin' || type === 'rotate') {
                    return css`
                        animation-name: ${animations[type]};
                    `;
                }

                if (type === 'zoom' || type === 'pulse') {
                    return css`
                        animation-name: ${animations[type]};
                    `;
                }

                return null;
            })}
        `;
    }}

    // 애니메이션 조합 지원을 위한 스타일 속성
    ${(props) => {
        const types = Array.isArray(props.animationType)
            ? props.animationType
            : typeof props.animationType === 'string' && props.animationType.includes(',')
            ? props.animationType.split(',').map((t) => t.trim())
            : [props.animationType];

        // 애니메이션 유형에 따른 추가 스타일 적용
        if (types.includes('spin') && types.includes('zoom')) {
            return css`
                animation: none; // 기본 animation 속성 무효화
                transform-origin: center;

                @keyframes spinAndZoom {
                    from {
                        transform: rotate(0deg) scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: rotate(360deg) scale(1);
                        opacity: 1;
                    }
                }

                animation: spinAndZoom ${props.duration}s linear infinite;
            `;
        }

        if (types.includes('float') && types.includes('pulse')) {
            return css`
                animation: none; // 기본 animation 속성 무효화

                @keyframes floatAndPulse {
                    0% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.1);
                    }
                    100% {
                        transform: translateY(0) scale(1);
                    }
                }

                animation: floatAndPulse ${props.duration}s linear infinite;
            `;
        }

        // continuousSlide와 spin 조합 추가
        if (types.includes('continuousSlide') && types.includes('spin')) {
            return css`
                animation: none; // 기본 animation 속성 무효화
                transform-origin: center;

                @keyframes slideAndSpin {
                    from {
                        transform: translateX(100vw) rotate(0deg);
                    }
                    to {
                        transform: translateX(-100%) rotate(360deg);
                    }
                }

                animation: slideAndSpin ${props.duration}s linear infinite;
            `;
        }

        return null;
    }}
    
    transform-origin: center;
`;

const AnimatedImage = ({
    src,
    alt,
    animationType = 'fadeIn',
    duration = 1,
    delay = 0,
    rotationDeg, // 새로 추가된, 회전 각도를 지정하는 props
}) => {
    return (
        <AnimatedImg
            src={src}
            alt={alt}
            animationType={animationType}
            duration={duration}
            delay={delay}
            rotationDeg={rotationDeg}
        />
    );
};

export default AnimatedImage;

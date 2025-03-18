import React from 'react';
import styled from 'styled-components';
import AnimatedImage from './AnimatedImage';
import SpinningRamen from './SpinningRamen';

const CollageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: transparent;
    overflow: hidden;
    pointer-events: none; /* 마우스 이벤트를 통과시킴 */
`;

// 각 이미지 위치 스타일 정의
const ImageWrapper = styled.div`
    position: absolute;
    ${(props) => props.styles}
    z-index: ${(props) => props.zIndex || 1};
    pointer-events: none; /* 마우스 이벤트를 통과시킴 */
`;

// 각 이미지의 애니메이션 키프레임 정의
const pizza = `
  from { transform: rotate(-10deg) scale(0.8); opacity: 0; }
  to { transform: rotate(0deg) scale(1); opacity: 1; }
`;

const ramen = `
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const hamburger = `
  from { transform: translateX(80px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const indiarapture = `
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const vader = `
  from { transform: translateY(50px) scale(0.8); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`;

const ramge = `
  0% { opacity: 0; transform: translateY(20px); }
  60% { opacity: 1; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const CollageLayout = () => {
    return (
        <CollageContainer>
            {/* 상단 음식 이미지들 - 수정된 SpinningRamen 컴포넌트 사용 */}
            <ImageWrapper styles={{ top: -150, left: -10, width: '200px' }} zIndex={5}>
                <SpinningRamen />
            </ImageWrapper>

            <ImageWrapper styles='top: -7%; left:75%; width: 200px;' zIndex={5}>
                <AnimatedImage
                    src='/public/image/slicepizza.png'
                    alt='조각피자'
                    animationType='float'
                    duration={1}
                    delay={1}
                />
            </ImageWrapper>
            <ImageWrapper styles='top: -20%; left:60%; width: 300px;' zIndex={5}>
                <AnimatedImage src='/image/hamburger.png' alt='햄버거' animationType='shake' duration={5} delay={0.6} />
            </ImageWrapper>

            <ImageWrapper styles='top: -15%; right: -1%; width: 250px;' zIndex={5}>
                <AnimatedImage src='/image/pizza.png' alt='피자' animationType='spin' duration={10} delay={0.5} />
            </ImageWrapper>

            {/* 상단에 Palace, Supreme 로고 */}
            <ImageWrapper
                styles='top: -20%; left: 50%; transform: translateX(-45%) rotate(0deg); width: 400px;'
                zIndex={5}
            >
                <AnimatedImage
                    src='/image/palace.png'
                    alt='Palace 로고'
                    animationType={['spin', 'zoom']} // 애니메이션 배열로 전달
                    duration={[1, 0.5]} // 각 애니메이션별 지속 시간
                    delay={[5, 1.0]} // 각 애니메이션별 지연 시간
                />
            </ImageWrapper>

            <ImageWrapper styles='top:-10%; left: 8%; transform: translateX(-50%); width: 300px;' zIndex={5}>
                <AnimatedImage
                    src='/image/supreme.png'
                    alt='Supreme 로고'
                    animationType='continuousSlide'
                    duration={7}
                    delay={0}
                />
            </ImageWrapper>

            {/* 공룡 이미지들 - 좌측 하단 */}
            <ImageWrapper styles='top:40%; right:86%; width: 500px;' zIndex={5}>
                <AnimatedImage
                    src='/public/image/indiarapture2.png'
                    alt='공룡1'
                    animationType='shake'
                    duration={15}
                    delay={1.4}
                />
            </ImageWrapper>

            <ImageWrapper styles='bottom: 15%; right: 85%; width: 400px; transform: rotate(15deg);' zIndex={4}>
                <AnimatedImage src='/image/blue.png' alt='공룡1' animationType='float' duration={1.5} delay={1.4} />
            </ImageWrapper>

            <ImageWrapper styles='bottom: 0%; left: -5%; width: 450px;' zIndex={2}>
                <AnimatedImage
                    src='/image/solo.png'
                    alt='카일로렌'
                    animationType='slideLeft'
                    duration={1.5}
                    delay={1.6}
                />
            </ImageWrapper>
            <ImageWrapper styles='bottom: -14%; left: 62%; width: 450px;' zIndex={1}>
                <AnimatedImage
                    src='/image/nike.png'
                    alt='나이키'
                    animationType='slideLeft'
                    duration={1.5}
                    delay={1.6}
                />
            </ImageWrapper>
            <ImageWrapper styles='bottom: -14%; right: 63%; width: 300px;' zIndex={2}>
                <AnimatedImage
                    src='/public/image/fragment.png'
                    alt='프라그먼트'
                    animationType='slideLeft'
                    duration={1.5}
                    delay={1.6}
                />
            </ImageWrapper>
            <ImageWrapper styles='bottom: -28%; left: 10%; width: 350px;' zIndex={1}>
                <AnimatedImage
                    src='/public/image/ramge.png'
                    alt='다람쥐'
                    animationType='slideLeft'
                    duration={1.5}
                    delay={1.8}
                />
            </ImageWrapper>

            {/* 다람쥐 이미지 - 중앙 하단 */}
            <ImageWrapper
                styles='bottom: 10%; left: 50%; transform: translateX(-50%); width: 80px;'
                zIndex={4}
            ></ImageWrapper>

            {/* 스타워즈 캐릭터 - 우측 하단 */}
            <ImageWrapper styles='bottom: -10%; left: 85%; width: 450px;' zIndex={4}>
                <AnimatedImage
                    src='/image/vader1.png'
                    alt='다스베이더1'
                    animationType='pulse'
                    duration={1.3}
                    delay={0.5}
                />
            </ImageWrapper>
            <ImageWrapper styles='bottom: -3%; right: 5%; width: 550px;' zIndex={3}>
                <AnimatedImage
                    src='/public/image/indiarapture.png'
                    alt='랩터'
                    animationType='shake'
                    duration={2}
                    delay={2.2}
                />
            </ImageWrapper>

            <ImageWrapper styles='bottom: 10%; right: 0; width: 500px;' zIndex={3}>
                <AnimatedImage
                    src='/image/vader2.png'
                    alt='다스베이더2'
                    animationType='zoom'
                    duration={1.3}
                    delay={1}
                />
            </ImageWrapper>

            <ImageWrapper styles='bottom: 30%; right: -3%; width: 300px;' zIndex={5}>
                <AnimatedImage src='/image/head.png' alt='머리' animationType='float' duration={1.3} delay={2.6} />
            </ImageWrapper>
        </CollageContainer>
    );
};

export default CollageLayout;

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
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

// 반응형 스타일 믹스인 추가
const responsiveStyle = css`
    transition: all 0.3s ease-in-out;

    @media (max-width: 1440px) {
        transform: scale(0.9);
    }

    @media (max-width: 1200px) {
        transform: scale(0.8);
    }

    @media (max-width: 1024px) {
        transform: scale(0.7);
    }

    @media (max-width: 768px) {
        transform: scale(0.55);
    }

    @media (max-width: 480px) {
        transform: scale(0.45);
    }

    @media (max-width: 390px) {
        transform: scale(0.35);
    }
`;

// 각 이미지 위치 스타일 정의
const ImageWrapper = styled.div`
    position: absolute;
    ${(props) => props.styles}
    z-index: ${(props) => props.zIndex || 1};
    pointer-events: none; /* 마우스 이벤트를 통과시킴 */
    ${responsiveStyle}

    /* 추가적인 미디어 쿼리 세분화 */
    @media (max-width: 1440px) {
        ${(props) => props.customStyles1440}
    }

    @media (max-width: 1024px) {
        ${(props) => props.customStyles1024}
    }

    @media (max-width: 768px) {
        ${(props) => props.customStyles768}
    }

    @media (max-width: 480px) {
        ${(props) => props.customStyles480}
    }

    @media (max-width: 390px) {
        ${(props) => props.customStyles390}
    }
`;

const CollageLayout = () => {
    // 화면 크기 상태 관리
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // 화면 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // 컴포넌트 마운트 시 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);
        handleResize(); // 초기 로드 시에도 크기 체크

        // 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <CollageContainer>
            {/* 상단 음식 이미지들 - 수정된 SpinningRamen 컴포넌트 사용 */}
            <ImageWrapper
                styles={{ top: -150, left: -10, width: '200px' }}
                zIndex={5}
                customStyles1440='top: -120px; left: -5px;'
                customStyles1024='top: -140px; left: 0px;'
                customStyles768='top: -140px; left: -30px;'
                customStyles480='top: -135px; left: -95px;'
                customStyles390='top: -135px; left: -75px;'
            >
                <SpinningRamen />
            </ImageWrapper>

            {/* 상단 피자 조각 */}
            <ImageWrapper
                styles='top: 4%; left:75%; width: 200px;'
                zIndex={5}
                customStyles1440='top: 4%; left: 72%;'
                customStyles1024='top: 20%; left: 66%;'
                customStyles768='top: 20%; left: 60%;'
                customStyles480='left: 65%; top: -3%;'
                customStyles390='left: 62%; top: 2%;'
            >
                <AnimatedImage
                    src='/image/slicepizza.png'
                    alt='조각피자'
                    animationType='float'
                    duration={1}
                    delay={1}
                />
            </ImageWrapper>

            {/* 햄버거 이미지 */}
            <ImageWrapper
                styles='top: -20%; left:60%; width: 300px;'
                zIndex={5}
                customStyles1440='top: -22%; left: 55%;'
                customStyles1024='top: -8%; left: 64%;'
                customStyles768='top: -5%; left: 77%;'
                customStyles480='top: 10%; left: 55%;'
                customStyles390='top: 2%; left: 50%;'
            >
                <AnimatedImage src='/image/hamburger.png' alt='햄버거' animationType='shake' duration={5} delay={0.6} />
            </ImageWrapper>

            {/* 우측 상단 피자 */}
            <ImageWrapper
                styles='top: -15%; right: -1%; width: 250px;'
                zIndex={5}
                customStyles1440='top: -15%; right: -2%;'
                customStyles1024='right: -3%;'
                customStyles768='right: -4%; top: -15%;'
                customStyles480='right: -25%; top: -13%;'
                customStyles390='right: -25%; top: -13%;'
            >
                <AnimatedImage src='/image/pizza.png' alt='피자' animationType='spin' duration={10} delay={0.5} />
            </ImageWrapper>

            {/* 상단에 Palace, Supreme 로고 */}
            <ImageWrapper
                styles='top: -20%; left: 50%; transform: translateX(-45%) rotate(0deg); width: 400px;'
                zIndex={5}
                customStyles1440='left: 35%; width: 350px;'
                customStyles1024='left: 46%; width: 300px;'
                customStyles768='left: 44%; width: 250px; top: 55%;'
                customStyles480='left: 42%; width: 300px; top: -12%;'
                customStyles390='left: 40%; width: 180px; top: -10%;'
            >
                <AnimatedImage
                    src='/image/palace.png'
                    alt='Palace 로고'
                    animationType={['spin', 'zoom']}
                    duration={[1, 0.5]}
                    delay={[5, 1.0]}
                />
            </ImageWrapper>

            <ImageWrapper
                styles='top:-10%; left: 8%; transform: translateX(-50%); width: 300px;'
                zIndex={5}
                customStyles1440='left: 10%; width: 250px;'
                customStyles1024='top:-8%; left: 12%; width: 200px;'
                customStyles768='left: 14%; width: 250px; top: -11%;'
                customStyles480='left: 16%; width: 150px; top: -6%;'
                customStyles390='left: 15%; width: 300px; top: -13%;'
            >
                <AnimatedImage
                    src='/image/supreme.png'
                    alt='Supreme 로고'
                    animationType='continuousSlide'
                    duration={7}
                    delay={0}
                />
            </ImageWrapper>

            {/* 공룡 이미지들 - 좌측 하단 */}
            <ImageWrapper
                styles='top:40%; right:86%; width: 500px;'
                zIndex={5}
                customStyles1440='right: 84%; width: 450px;'
                customStyles1024='bottom: -75%; right: 70%; width: 400px;'
                customStyles768='right: 47%; width: 700px; top: 15%;'
                customStyles480='right: 10%; width: 750px; top: 9%;'
                customStyles390='right: -35%; width: 1000px; top: -3%;'
            >
                <AnimatedImage
                    src='/image/indiarapture2.png'
                    alt='공룡1'
                    animationType='shake'
                    duration={15}
                    delay={1.4}
                />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: 15%; right: 85%; width: 400px; transform: rotate(15deg);'
                zIndex={4}
                customStyles1440='right: 80%; width: 350px;'
                customStyles1024='right: 77%; width: 300px;'
                customStyles768='right: 55%; width: 500px; bottom: 12%;'
                customStyles480='right: 40%; width: 400px; bottom: 10%;'
                customStyles390='right: -28%; width: 800px; bottom: -10%;'
            >
                <AnimatedImage src='/image/blue.png' alt='공룡1' animationType='float' duration={1.5} delay={1.4} />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: 0%; left: -5%; width: 450px;'
                zIndex={1}
                customStyles1440='width: 400px;'
                customStyles1024='top: 1%; left: -3%; width: 350px;'
                customStyles768='left: -39%; width: 750px; bottom: 75%;'
                customStyles480='left: -30%; top: -20%; width: 500px; bottom: 0%;'
                customStyles390='left: -85%; width: 800px; bottom: 43%;'
            >
                <AnimatedImage
                    src='/image/solo.png'
                    alt='카일로렌'
                    animationType='slideLeft'
                    duration={1.5}
                    delay={1.6}
                />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -10%; left: 62%; width: 450px;'
                zIndex={1}
                customStyles1440='left: 60%; width: 400px;'
                customStyles1024='left: 58%; width: 350px;'
                customStyles768='left: 56%; width: 300px; bottom: -8%;'
                customStyles480='top: 55%; left: 54%; width: 300px; bottom: -6%;'
                customStyles390='left: -25%; width: 750px; bottom: 19%;'
            >
                <AnimatedImage src='/image/nike.png' alt='나이키' animationType='float' duration={1.5} delay={1.6} />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -14%; right: 63%; width: 300px;'
                zIndex={2}
                customStyles1440='right: 61%; width: 250px;'
                customStyles1024='top: 86%; left: 10%; right: 59%; width: 220px;'
                customStyles768='left: -15%; width: 450px; bottom: 19%;'
                customStyles480='left: -16%; width: 250px; bottom: -10%;'
                customStyles390='left: -55%; width: 500px; bottom: 8%;'
            >
                <AnimatedImage src='/image/fragment.png' alt='프라그먼트' animationType='spin' duration={8} delay={1} />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -14%; left: 35%; width: 300px;'
                zIndex={2}
                customStyles1440='left: 33%; width: 250px;'
                customStyles1024='top: 86%; left: 25%; width: 220px;'
                customStyles768='left: 7%; width: 450px; bottom: 19%;'
                customStyles480='left: -1%; width: 250px; bottom: -10%;'
                customStyles390='left: -35%; width: 500px; bottom: 8%;'
            >
                <AnimatedImage src='/image/cavempt2.png' alt='카브엠트' animationType='spin' duration={8} delay={1} />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -20%; left: 51%; width: 300px;'
                zIndex={5}
                customStyles1440='left: 49%; width: 250px;'
                customStyles1024='top: 63%; left: 47%; width: 220px;'
                customStyles768='left: 45%; width: 200px; bottom: -18%;'
                customStyles480='left: 43%; width: 180px; bottom: -15%;'
                customStyles390='left: 41%; width: 350px; bottom: -17%;'
            >
                <AnimatedImage src='/image/goondi.png' alt='궁디' animationType='zoom' duration={1} delay={1} />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -28%; left: 10%; width: 350px;'
                zIndex={1}
                customStyles1440='left: 8%; width: 300px;'
                customStyles1024='top: 65%; left: -5%; width: 250px;'
                customStyles768='left: 0%; width: 220px; bottom: -25%;'
                customStyles480='left: 5%; width: 300px; bottom: 30%;'
                customStyles390='left: 4%; width: 350px; bottom: -20%;'
            >
                <AnimatedImage src='/image/ramge.png' alt='다람쥐' animationType='shake' duration={5} delay={1.8} />
            </ImageWrapper>

            {/* 스타워즈 캐릭터 - 우측 하단 */}
            <ImageWrapper
                styles='bottom: -10%; left: 85%; width: 450px;'
                zIndex={4}
                customStyles1440='top: 70%; width: 400px;'
                customStyles1024='left: 81%; width: 350px;'
                customStyles768='left: 55%; width: 700px; bottom: -8%;'
                customStyles480='left: 45%; width: 450px; bottom: 17%;'
                customStyles390='left: 7%; width: 700px; bottom: 64%;'
            >
                <AnimatedImage
                    src='/image/vader1.png'
                    alt='다스베이더1'
                    animationType='pulse'
                    duration={1.3}
                    delay={0.5}
                />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -3%; right: 5%; width: 550px;'
                zIndex={3}
                customStyles1440='bottom: -5%; width: 500px;'
                customStyles1024='right: 1%; width: 450px;'
                customStyles768='right: -45%; width: 750px; bottom: 7%;'
                customStyles480='right: 0%; width: 350px; bottom: -1%;'
                customStyles390='right: 0%; width: 320px; bottom: 0%;'
            >
                <AnimatedImage
                    src='/image/indiarapture.png'
                    alt='랩터'
                    animationType='shake'
                    duration={2}
                    delay={2.2}
                />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: -1%; right: 0; width: 500px;'
                zIndex={1}
                customStyles1440='right: -2%; width: 450px;'
                customStyles1024='top: 16%; right: -4%; width: 400px;'
                customStyles768='right: -22%; width: 600px; top: 6%;'
                customStyles480='right: -44%; width: 550px; bottom: 80%;'
                customStyles390='right: -85%; width: 800px; bottom: 45%;'
            >
                <AnimatedImage
                    src='/image/vader2.png'
                    alt='다스베이더2'
                    animationType='zoom'
                    duration={1.3}
                    delay={1}
                />
            </ImageWrapper>

            <ImageWrapper
                styles='bottom: 30%; right: -3%; width: 300px;'
                zIndex={5}
                customStyles1440='right: -5%; width: 250px;'
                customStyles1024='right: -5%; width: 220px;'
                customStyles768='right: -16%; width: 400px; bottom: 20%;'
                customStyles480='right: -40%; width: 500px; bottom: 4%;'
                customStyles390='left: -15%; width: 750px; bottom: -16%;'
            >
                <AnimatedImage src='/image/head.png' alt='머리' animationType='float' duration={1.3} delay={2.6} />
            </ImageWrapper>
        </CollageContainer>
    );
};

export default CollageLayout;

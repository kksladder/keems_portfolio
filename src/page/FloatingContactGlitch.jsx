import React, { useState, useEffect, useRef } from 'react';

const FloatingContactGlitch = () => {
    // 애니메이션 프레임 관리
    const animationFrameId = useRef(null);
    const startTime = useRef(Date.now());
    const waveStartTime = useRef(Date.now());

    // 위치 및 상태 관리
    const [position, setPosition] = useState({ x: 55, y: 20 });
    const [waveOffset, setWaveOffset] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);
    const [direction, setDirection] = useState(1); // 1: 오른쪽으로, -1: 왼쪽으로

    // 물결 효과와 함께 부드러운 애니메이션
    useEffect(() => {
        // 이동 속도 (낮을수록 부드럽게)
        const moveSpeed = 0.09; // 라면과 햄버거 사이를 이동하기 위해 속도 조정

        // 물결 파라미터
        const waveSpeed = 0.008; // 물결 속도
        const waveAmplitude = 0.8; // 물결 크기

        // 이동 경계 (라면과 햄버거 사이)
        const leftBound = 25; // 왼쪽 경계 (라면 위치)
        const rightBound = 75; // 오른쪽 경계 (햄버거 위치)

        // 애니메이션 함수
        const animate = () => {
            const now = Date.now();
            const waveTime = now - waveStartTime.current;

            // x 위치 업데이트 (방향에 따라 좌우로 이동)
            setPosition((prev) => {
                // 새 위치 계산
                const newX = prev.x + direction * moveSpeed;

                // 경계에 닿으면 방향 전환
                if (newX >= rightBound) {
                    setDirection(-1); // 오른쪽 경계에 닿으면 왼쪽으로 방향 전환
                    return { ...prev, x: rightBound };
                } else if (newX <= leftBound) {
                    setDirection(1); // 왼쪽 경계에 닿으면 오른쪽으로 방향 전환
                    return { ...prev, x: leftBound };
                }

                return { ...prev, x: newX };
            });

            // 물결 웨이브 효과 계산
            const newWaveOffset = Math.sin(waveTime * waveSpeed) * waveAmplitude;
            setWaveOffset(newWaveOffset);

            // 다음 프레임 요청
            animationFrameId.current = requestAnimationFrame(animate);
        };

        // 애니메이션 시작
        animationFrameId.current = requestAnimationFrame(animate);

        // 글리치 효과 간헐적 발생
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 5000);

        // 컴포넌트 언마운트 시 정리
        return () => {
            cancelAnimationFrame(animationFrameId.current);
            clearInterval(glitchInterval);
        };
    }, [direction]);

    // 각 텍스트 항목의 웨이브 오프셋 계산을 위한 함수
    const getWaveTransform = (index) => {
        // 각 텍스트 라인마다 약간 다른 위상을 가진 웨이브를 적용
        const phaseShift = index * 0.5; // 각 텍스트 항목마다 위상 차이
        const individualWave = Math.sin(Date.now() * 0.002 + phaseShift) * 1.2;
        return `translateY(${individualWave}px)`;
    };

    return (
        <div
            style={{
                position: 'fixed',
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) translateY(${waveOffset}px)`,
                zIndex: 999999,
                pointerEvents: 'none',
                transition: 'top 0.5s cubic-bezier(0.1, 0.7, 0.1, 1)',
            }}
        >
            <div
                style={{
                    color: 'white',
                    textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    minWidth: '200px',
                    background: 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        filter: glitchActive ? 'blur(0.5px)' : 'none',
                        textShadow: glitchActive ? '2px 0 #ff00ff, -2px 0 #00ffff' : '1px 1px 2px rgba(0, 0, 0, 0.8)',
                        transition: 'all 0.2s ease',
                        transform: glitchActive ? 'skew(-3deg)' : 'skew(0)',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            transform: getWaveTransform(0),
                            marginBottom: '5px',
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontSize: '20px',
                                letterSpacing: '1px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                textShadow: glitchActive
                                    ? '2px 0 #ff00ff, -2px 0 #00ffff'
                                    : '1px 1px 3px rgba(0, 0, 0, 0.8)',
                                display: 'block',
                            }}
                        >
                            김기섭 (金起燮)
                        </h2>
                    </div>

                    <div
                        style={{
                            transform: getWaveTransform(1),
                            marginBottom: '5px',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '20px',
                                display: 'block',
                            }}
                        >
                            +82 10 8901 9670
                        </p>
                    </div>

                    <div
                        style={{
                            transform: getWaveTransform(2),
                            marginBottom: '5px',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '20px',
                                display: 'block',
                            }}
                        >
                            @keemkeysup
                        </p>
                    </div>

                    <div
                        style={{
                            transform: getWaveTransform(3),
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '20px',
                                display: 'block',
                            }}
                        >
                            kksladder@gmail.com
                        </p>
                    </div>
                </div>

                {/* 글리치 효과 - 텍스트에만 적용 */}
                {glitchActive && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: -1,
                            pointerEvents: 'none',
                        }}
                    >
                        {/* 글리치 요소 - 복제된 텍스트를 약간 이동시켜 글리치 효과 생성 */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                color: 'rgba(255,0,255,0.3)',
                                transform: 'translate(3px, 2px)',
                                transition: 'transform 0.1s ease-out',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ transform: getWaveTransform(0), marginBottom: '5px' }}>
                                <h2
                                    style={{
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        display: 'block',
                                    }}
                                >
                                    김기섭 (金起燮)
                                </h2>
                            </div>

                            <div style={{ transform: getWaveTransform(1), marginBottom: '5px' }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        display: 'block',
                                    }}
                                >
                                    +82 10 8901 9670
                                </p>
                            </div>

                            <div style={{ transform: getWaveTransform(2), marginBottom: '5px' }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        display: 'block',
                                    }}
                                >
                                    @keemkeysup
                                </p>
                            </div>

                            <div style={{ transform: getWaveTransform(3) }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        display: 'block',
                                    }}
                                >
                                    kksladder@gmail.com
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                color: 'rgba(0,255,255,0.3)',
                                transform: 'translate(-3px, -2px)',
                                transition: 'transform 0.1s ease-out',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <div style={{ transform: getWaveTransform(0), marginBottom: '5px' }}>
                                <h2
                                    style={{
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        display: 'block',
                                    }}
                                >
                                    김기섭 (金起燮)
                                </h2>
                            </div>

                            <div style={{ transform: getWaveTransform(1), marginBottom: '5px' }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        display: 'block',
                                    }}
                                >
                                    +82 10 8901 9670
                                </p>
                            </div>

                            <div style={{ transform: getWaveTransform(2), marginBottom: '5px' }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        display: 'block',
                                    }}
                                >
                                    @keemkeysup
                                </p>
                            </div>

                            <div style={{ transform: getWaveTransform(3) }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '14px',
                                        display: 'block',
                                    }}
                                >
                                    kksladder@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatingContactGlitch;

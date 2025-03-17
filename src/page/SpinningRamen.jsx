import React from 'react';
import styled from 'styled-components';

// 회전 애니메이션을 위한 스타일 컴포넌트
const SpinAnimation = styled.div`
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
// 회전하는 이미지를 위한 스타일
const SpinningImage = styled.img`
    animation: spin 3s linear infinite;
    width: 250px;
    height: 250px;
    object-fit: contain;
`;

// 두 라면 이미지를 나란히 배치하는 컨테이너
const RamenContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

// 각 이미지 컨테이너
const ImageContainer = styled.div`
    margin: 8px;
    text-align: center;
`;

const SpinningRamen = () => {
    return (
        <>
            <SpinAnimation />
            <RamenContainer>
                <ImageContainer>
                    <SpinningImage src='/image/ramen1.png' alt='라면1' className='mb-2' />
                </ImageContainer>
                <ImageContainer>
                    <SpinningImage src='/image/ramen2.png' alt='라면2' className='mb-2' />
                </ImageContainer>
            </RamenContainer>
        </>
    );
};

export default SpinningRamen;

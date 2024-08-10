import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import SplashBackground from '../components/SplashBackground';
import Arrow from '../assets/images/rightArrow.png';

const OutlineText = styled.div`
  color: transparent;
  -webkit-text-stroke: 0.025vw white;
  font-family: 'Bohemian Soul';
  font-size: 5.2rem;
  font-weight: 500;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.05;
  letter-spacing: -0.1rem;
  word-spacing: -0.5rem;
`;

const FullColorText = styled.span`
  color: white;
  letter-spacing: -0.1rem;
  word-spacing: -0.2rem;
`;

const PointEmojiText = styled.div`
  color: transparent;
  -webkit-text-stroke: 0.025vw white;
  font-family: 'Bohemian Soul';
  font-size: 5rem;
  font-weight: 500;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.03;
  letter-spacing: -0.1rem;
  word-spacing: -0.5rem;
  margin-top: 2.5vh;
`;

const PointText = styled.span`
  color: white;
  letter-spacing: -0.1rem;
  word-spacing: -0.2rem;
`;

const GuideContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5vh;
`;

const GuideText = styled.div`
  color: white;
  font-family: 'Pretendard';
  font-size: 1.5rem;
  font-weight: 100;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.03;
  letter-spacing: -0.05rem;
  word-spacing: 0.5rem;
  margin-right: 1rem;
`;

const ArrowImage = styled.img`
  width: 3.5vw;
  height: 2vh;
  margin: 1vw;
`;

function Splash() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/select');
  };

  return (
    <SplashBackground onClick={handleClick}>
      <OutlineText>I almost miss the</OutlineText>
      <OutlineText>
        <FullColorText>sound</FullColorText> of your voice
      </OutlineText>
      <PointEmojiText>···</PointEmojiText>
      <OutlineText>Find your own melody</OutlineText>
      <OutlineText>
        and draw <FullColorText>notes</FullColorText>
      </OutlineText>
      <OutlineText>on the blank music paper</OutlineText>
      <OutlineText>
        with <PointText>melodify</PointText>
      </OutlineText>
      <GuideContainer>
        <GuideText>Click anywhere to explore your notes</GuideText>
        <ArrowImage src={Arrow} alt="Arrow" />
      </GuideContainer>
    </SplashBackground>
  );
}

export default Splash;

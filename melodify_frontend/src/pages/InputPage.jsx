import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TurnTable from '../assets/images/turntable.png';
import HoverSound from '../assets/sounds/angelical.mp3';
import InputHeader from '../components/InputHeader';
import DefaultBackground from '../components/DefaultBackground';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
`;

const GuideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5vh;
`;

const GuideText = styled.div`
  color: #333;
  font-family: 'Bohemian Soul';
  font-size: 2.25rem;
  font-weight: 100;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.03;
  letter-spacing: -0.05rem;
  word-spacing: 0.5rem;
  margin-top: 3rem;
  text-align: center;
`;

const MainImage = styled.img`
  width: 35vw;
  cursor: pointer;
  display: block;
  margin: 0 auto;
`;

const HiddenInput = styled.input`
  display: none;
`;

function InputPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }

    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          'http://localhost:8000/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const fileId = response.data.file_id;
        navigate(`/output/${fileId}`);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <DefaultBackground>
      <PageContainer>
        <InputHeader />
        <MainImage
          src={TurnTable}
          onClick={handleImageClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <HiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <audio ref={audioRef} src={HoverSound} />
        <GuideContainer>
          <GuideText>Select your LP</GuideText>
        </GuideContainer>
      </PageContainer>
    </DefaultBackground>
  );
}

export default InputPage;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import OutputHeader from '../components/OutputHeader';
import DefaultBackground from '../components/DefaultBackground';

const ImageContainer = styled.div`
  margin-top: 1.5rem;
`;

function OutputPage() {
  const { fileId } = useParams();
  const [pngUrl, setPngUrl] = useState('');

  useEffect(() => {
    const fetchPngFile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/output/${fileId}/png`,
          {
            responseType: 'blob',
          },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        setPngUrl(url);

        // URL 해제 예약
        return () => window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error fetching PNG file:', error);
      }
    };

    fetchPngFile(); // PNG 파일을 가져와 화면에 표시
  }, [fileId]);

  return (
    <DefaultBackground>
      <OutputHeader />
      <h2>Generated Music Sheet</h2>
      {pngUrl && (
        <ImageContainer>
          <img src={pngUrl} alt="Music Sheet" />
        </ImageContainer>
      )}
    </DefaultBackground>
  );
}

export default OutputPage;

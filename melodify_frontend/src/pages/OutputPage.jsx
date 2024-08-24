import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import LP from '../assets/images/lp.png';
import OutputHeader from '../components/OutputHeader';
import DefaultBackground from '../components/DefaultBackground';

const MainImage = styled.img`
  width: 35vw; /* Adjust the size of the image as needed */
  display: block;
  margin: 0 auto;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
`;

function OutputPage() {
  const { fileId } = useParams();
  const [midiUrl, setMidiUrl] = useState('');

  useEffect(() => {
    const fetchMidiFile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/output/${fileId}/midi`,
          {
            responseType: 'blob',
          },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        setMidiUrl(url);

        // Automatically trigger download when the URL is set
        const link = document.createElement('a');
        link.href = url;
        link.download = 'output.mid'; // Filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup the URL object
        return () => window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error fetching MIDI file:', error);
      }
    };

    fetchMidiFile();
  }, [fileId]);

  return (
    <DefaultBackground>
      <OutputHeader />
      <CenteredContainer>
        <MainImage src={LP} alt="LP" />
      </CenteredContainer>
    </DefaultBackground>
  );
}

export default OutputPage;

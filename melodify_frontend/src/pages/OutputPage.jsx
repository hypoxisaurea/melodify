import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import OutputHeader from '../components/OutputHeader';
import DefaultBackground from '../components/DefaultBackground';

const AudioContainer = styled.div`
  margin-top: 1.5rem;
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

        // Clean up URL object
        return () => window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error fetching MIDI file:', error);
      }
    };

    fetchMidiFile(); // Fetch MIDI file
  }, [fileId]);

  return (
    <DefaultBackground>
      <OutputHeader />
      <h2>Generated Music MIDI</h2>
      {midiUrl && (
        <AudioContainer>
          <audio controls>
            <source src={midiUrl} type="audio/midi" />
            Your browser does not support the audio element.
          </audio>
        </AudioContainer>
      )}
    </DefaultBackground>
  );
}

export default OutputPage;

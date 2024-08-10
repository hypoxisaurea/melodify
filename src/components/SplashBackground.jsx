import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0a0a0a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function SplashBackground({ children, onClick }) {
  return <Background onClick={onClick}>{children}</Background>;
}

export default SplashBackground;

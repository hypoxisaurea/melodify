import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e5e3dc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function DefaultBackground({ children, onClick }) {
  return <Background onClick={onClick}>{children}</Background>;
}

export default DefaultBackground;

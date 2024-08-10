import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Back from '../assets/images/leftArrow.png';
import Menu from '../assets/images/menu.png';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  top: 0;
  margin-top: 4vh;
  margin-right: 10vw;
  padding: 1rem 0;
  background-color: #e5e3dc;
  z-index: 1000;
`;

const BackImage = styled.img`
  width: 2.25vw;
  cursor: pointer;
  margin-left: 10vw;
`;

const MenuImage = styled.img`
  width: 2vw;
  cursor: pointer;
`;

function OutputHeader() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <BackImage src={Back} onClick={handleBackClick} />
      <MenuImage src={Menu} onClick={handleMenuClick} />
    </HeaderContainer>
  );
}

export default OutputHeader;

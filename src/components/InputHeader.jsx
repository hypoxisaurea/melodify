import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Menu from '../assets/images/menu.png';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  margin-top: 4vh;
  margin-right: 10vw;
  padding: 1rem 0;
  background-color: #e5e3dc;
  z-index: 1000;
`;

const MenuImage = styled.img`
  width: 2vw;
  cursor: pointer;
`;

function InputHeader() {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <MenuImage src={Menu} onClick={handleMenuClick} />
    </HeaderContainer>
  );
}

export default InputHeader;

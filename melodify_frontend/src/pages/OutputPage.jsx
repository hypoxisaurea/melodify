import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import OutputHeader from '../components/OutputHeader';
import DefaultBackground from '../components/DefaultBackground';

function OutputPage() {
  return (
    <DefaultBackground>
      <OutputHeader />
      OutputPage
    </DefaultBackground>
  );
}

export default OutputPage;

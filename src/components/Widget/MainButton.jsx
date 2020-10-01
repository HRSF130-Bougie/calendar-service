import React from 'react';
import styled from 'styled-components';

const MainButtonStyled = styled.button`
display: block;
width: 100%;
height: 100%;
min-width: 200px;
background-size: 200%;
opacity: 0;
transition: opacity 1.25s ease 0s;
`;

const MainButton = () => (
  <MainButtonStyled>Check Availability</MainButtonStyled>
);

export default MainButton;

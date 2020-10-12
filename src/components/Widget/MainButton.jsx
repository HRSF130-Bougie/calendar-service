import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainButtonStyled = styled.button`
  font-family: 'Airbnb Cereal App Book';
  cursor: pointer;
  display: inline-block;
  margin-top: 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  line-height: 20px;
  border-radius: 8px;
  outline: currentcolor none medium;
  padding: 14px 24px;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, transform 0.1s ease 0s, transform 0.1s ease 0s;
  border: medium none;
  color: rgb(255, 255, 255);
  width: 100%;
  transition: none 0s ease 0s;
  background: linear-gradient(90deg, rgba(185,29,88,1) 0%, rgba(136,21,81,1) 31%);
  &:hover {
    background: radial-gradient(circle at center center, rgba(185,29,88,1) 0%, rgba(136,21,81,1) 31%);
    background-position: var(--x) var(--y);
  }
`;

const MainButton = ({ checkOut }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const handleXY = (event) => {
    const width = event.target.clientWidth;
    const height = event.target.clientHeight;
    const eventOffsetX = event.nativeEvent.offsetX + (width / 2);
    const eventOffsetY = event.nativeEvent.offsetY + (height / 2)
    setXY([eventOffsetX, eventOffsetY]);
  };

  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
  }

  return (<MainButtonStyled onMouseMove={(event) => handleXY(event)} style={style}>{checkOut ? 'Reserve' : 'Check availability'}</MainButtonStyled>);
};

export default MainButton;
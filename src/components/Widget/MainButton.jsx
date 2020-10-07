import React from 'react';
import styled from 'styled-components';

const MainButtonStyled = styled.button`
  font-family: 'Airbnb Cereal App Book';
  cursor: pointer;
  display: inline-block;
  margin-top: 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  font-size: 16px;
  line-height: 20px;
  border-radius: 8px;
  outline: currentcolor none medium;
  padding: 14px 24px;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, transform 0.1s ease 0s, transform 0.1s ease 0s;
  border: medium none;
  background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%) repeat scroll 0% 0%;
  color: rgb(255, 255, 255);
  width: 100%;
  transition: none 0s ease 0s;
  background: var(--dls19-brand-gradient, linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%));
  background-position: calc((100 - var(--mouse-x, 0)) * 1%) calc((100 - var(--mouse-y, 0)) * 1%);
`;

const MainButton = ({ checkOut }) => (
  <MainButtonStyled>{checkOut ? 'Reserve' : 'Check availability'}</MainButtonStyled>
);

export default MainButton;

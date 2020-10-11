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
  color: rgb(255, 255, 255);
  width: 100%;
  transition: none 0s ease 0s;
  background: rgb(185,29,88);
  background: linear-gradient(90deg, rgba(185,29,88,1) 0%, rgba(136,21,81,1) 31%);
`;

const MainButton = ({ checkOut }) => (
  <MainButtonStyled>{checkOut ? 'Reserve' : 'Check availability'}</MainButtonStyled>
);

export default MainButton;

MainButton.propTypes = {
  checkOut: PropTypes.instanceOf(Date),
}
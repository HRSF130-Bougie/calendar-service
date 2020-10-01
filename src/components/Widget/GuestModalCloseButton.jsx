import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GuestModalCloseButtonStyle = styled.button`
  display:flex;
  font-family: 'Airbnb Cereal App Medium';
  cursor: pointer;
  display: inline-block;
  margin: 0px-10px;
  position: relative;
  text-align: center;
  width: auto;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  border-radius: 8px;
  padding: 10px;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, transform 0.1s ease 0s, transform 0.1s ease 0s;
  border: none;
  background: transparent;
  color: rgb(34, 34, 34);
  text-decoration: underline;
  &:hover {
    background: rgb(247, 247, 247) none repeat scroll 0% 0%;
    color: rgb(0, 0, 0);
  }
`;

const GuestModalCloseButton = ({ hideModal }) => (
  <GuestModalCloseButtonStyle type="button" onClick={hideModal}>Close</GuestModalCloseButtonStyle>
);

export default GuestModalCloseButton;

GuestModalCloseButton.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

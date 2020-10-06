import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ModalCloseButtonStyle = styled.button`
  display:flex;
  font-family: ${(props) => (props.calendar ? 'Airbnb Cereal App Book' : 'Airbnb Cereal App Medium')};
  cursor: pointer;
  display: inline-block;
  margin:${(props) => (props.clear ? '0' : '0 -10px')};
  margin:${(props) => (props.calendar && '5px 0')};
  position: relative;
  text-align: center;
  width: auto;
  font-size: ${(props) => (props.calendar || props.clear ? '14px' : '16px')};
  line-height: ${(props) => (props.calendar || props.clear ? '18px' : '20px')};
  font-weight: 600;
  border-radius: 8px;
  padding: ${(props) => (props.calendar ? '8px 16px' : '10px')};
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, transform 0.1s ease 0s, transform 0.1s ease 0s;
  border: none;
  background: ${(props) => (props.calendar ? 'black' : 'transparent')};
  color: ${(props) => (props.calendar ? 'white' : 'rgb(34, 34, 34)')};
  text-decoration: ${(props) => (props.calendar ? 'none' : 'underline')};
  ${(props) => (!props.calendar && css`
    &: hover {
      background: rgb(247, 247, 247);
      color: rgb(0, 0, 0);
    }`)}
  `;

const ModalCloseButton = ({
  funct, name, calendar, text, clear,
}) => (
  <ModalCloseButtonStyle type="button" onClick={funct} name={name} calendar={calendar} clear={clear}>{text}</ModalCloseButtonStyle>
);

export default ModalCloseButton;

ModalCloseButton.propTypes = {
  funct: PropTypes.func,
  name: PropTypes.string.isRequired,
  calendar: PropTypes.bool,
  text: PropTypes.string,
  clear: PropTypes.bool,
};

ModalCloseButton.defaultProps = {
  calendar: false,
  clear: false,
  text: 'Close',
  funct: function log() { console.log('Button Pressed!'); },
};

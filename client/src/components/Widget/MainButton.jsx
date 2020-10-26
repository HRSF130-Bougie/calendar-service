import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
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
  border: medium none;
  color: rgb(255, 255, 255);
  width: 100%;
  background: linear-gradient(90deg, rgba(185,29,88,1) 0%, rgba(136,21,81,1) 31%);
  &:hover {
    background: radial-gradient(circle at center, #BD1E59 0%, #92174D 35%, #861453 50%, #6C0D63 100% );
    background-position: var(--x) var(--y);
  }
  &:active {
    background: radial-gradient(circle at center, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100%);
    transform: scale(.95);
    transition: all 100ms ease-out 0s;
  }
`;

const MainButton = ({ checkOut, showCalendarModal, addReservation }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const handleXY = (event) => {
    const width = event.target.clientWidth;
    const height = event.target.clientHeight;
    const eventOffsetX = event.nativeEvent.offsetX + (width / 2);
    const eventOffsetY = event.nativeEvent.offsetY + (height / 2);
    setXY([eventOffsetX, eventOffsetY]);
  };

  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
  };

  return (
    <MainButtonStyled
      // eslint-disable-next-line no-console
      onClick={!checkOut ? () => showCalendarModal('calendarModalVisible') : addReservation}
      onMouseMove={(event) => handleXY(event)}
      style={style}
    >
      {checkOut ? 'Reserve' : 'Check availability'}
    </MainButtonStyled>
  );
};

export default memo(MainButton);

MainButton.propTypes = {
  checkOut: PropTypes.instanceOf(Date),
  showCalendarModal: PropTypes.func,
  addReservation: PropTypes.func.isRequired,
};

MainButton.defaultProps = {
  checkOut: null,
  showCalendarModal: null,
};

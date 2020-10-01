/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GuestCategory = styled.div`

`;

const GuestSubtext = styled.div`

`;

const PlusMinusButton = styled.button`

`;

const GuestSelector = ({ target, currentValue, increaseGuestCount, decreaseGuestCount }) => (

  <>
    <h1>{target[0]}</h1>
    <h2>{target[1]}</h2>
    <h3>{currentValue}</h3>
    <input type="button" name={target[0]} onClick={increaseGuestCount} value="Add some adults" />
    <input type="button" name={target[0]} onClick={decreaseGuestCount} value="Add some adults" />

  </>
);

export default GuestSelector;

GuestSelector.propTypes = {
  target: PropTypes.arrayOf(PropTypes.string, PropTypes.string).isRequired,
  currentValue: PropTypes.number.isRequired,
  increaseGuestCount: PropTypes.func.isRequired,
  decreaseGuestCount: PropTypes.func.isRequired,
};

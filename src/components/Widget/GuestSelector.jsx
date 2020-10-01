/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  height: 38px;
  color: rgb(34, 34, 34);
`;

const GuestCategoryWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-self: center;
`;

const GuestCategory = styled.div`
  font-family: 'Airbnb Cereal App Medium';
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
`;

const GuestSubtext = styled.div`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  font-size: 14px;
  line-height: 18px;
  vertical-align: top;
  color: rgb(34, 34, 34);
`;

const CountWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const PlusMinusButton = styled.button`
    font-family: 'Airbnb Cereal App Light', sans-serif;
    -moz-box-pack: center;
    -moz-box-align: center;
    -moz-box-flex: 0;
    width: 32px;
    height: 32px;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: pointer;
    display: inline-flex;
    margin: 0px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(176, 176, 176);
    color: rgb(113, 113, 113);
    font-family: inherit;
    font-size: 25px;
    outline: currentcolor none medium;
    touch-action: manipulation;
    align-items: flex-end;
    justify-content: center;
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    border-radius: 50%;
}
`;

const PlusMinusButtonDisabled = styled.div`
    font-family: 'Airbnb Cereal App Light', sans-serif;
    -moz-box-pack: center;
    -moz-box-align: center;
    -moz-box-flex: 0;
    width: 32px;
    height: 32px;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: pointer;
    display: inline-flex;
    margin: 0px;
    border-width: 1px;
    border-style: solid;
    border-color:  rgb(235, 235, 235);
    color:  rgb(235, 235, 235);
    font-family: inherit;
    font-size: 25px;
    outline: currentcolor none medium;
    align-items: center;
    justify-content: center;
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    border-radius: 50%;
}
`;

const Count = styled.div`
  display: flex-inline;
  margin: 0 8px;
  margin-top: -5px;
  width: 22px;
  text-align: center;
  align-self: center;
`;

const GuestSelector = ({ target, currentValue, increaseGuestCount, decreaseGuestCount, currentTotal }) => {
  let minusDisabled = false;
  if (target.target === 'adults' && currentValue < 2) {
    minusDisabled = true;
  } else if (currentValue < 1) {
    minusDisabled = true;
  }

  let plusDisabled = false;
  if (currentTotal === 6 && target.target !== 'infants') {
    plusDisabled = true;
  }

  return (
    <SelectorWrapper>
      <GuestCategoryWrapper>
        <GuestCategory>{target.target}</GuestCategory>
        {target.subtext ? <GuestSubtext>{target.subtext}</GuestSubtext> : null}
      </GuestCategoryWrapper>

      <CountWrapper>
        {minusDisabled === true
          ? (
            <PlusMinusButtonDisabled>-</PlusMinusButtonDisabled>
          )
          : (
            <PlusMinusButton name={target.target} onClick={decreaseGuestCount}>-</PlusMinusButton>
          )}
        <Count>{currentValue}</Count>
        {plusDisabled === true
          ? (
            <PlusMinusButtonDisabled>+</PlusMinusButtonDisabled>
          )
          : (
            <PlusMinusButton name={target.target} onClick={increaseGuestCount}>+</PlusMinusButton>
          )}
      </CountWrapper>

    </SelectorWrapper>
  );
};

export default GuestSelector;

GuestSelector.propTypes = {
  target: PropTypes.objectOf(PropTypes.string, PropTypes.string).isRequired,
  currentValue: PropTypes.number.isRequired,
  increaseGuestCount: PropTypes.func.isRequired,
  decreaseGuestCount: PropTypes.func.isRequired,
  currentTotal: PropTypes.number.isRequired,
};

/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
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
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(176, 176, 176);
    color: rgb(113, 113, 113);
    background: rgb(255, 255, 255);
    font-size: 25px;
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
}
`;

const PlusMinusButtonDisabled = styled(PlusMinusButton)`
    border-color:  rgb(235, 235, 235);
    color:  rgb(235, 235, 235);
    cursor: not-allowed;
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

const GuestSelector = ({ target, currentValue, guestCountFunctions, currentTotal }) => {
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
          ? (<PlusMinusButtonDisabled>-</PlusMinusButtonDisabled>)
          : (<PlusMinusButton name={target.target} onClick={guestCountFunctions.decrease}>-</PlusMinusButton>)}

        <Count>{currentValue}</Count>

        {plusDisabled === true
          ? (<PlusMinusButtonDisabled>+</PlusMinusButtonDisabled>)
          : (<PlusMinusButton name={target.target} onClick={guestCountFunctions.increase}>+</PlusMinusButton>)}
      </CountWrapper>

    </SelectorWrapper>
  );
};

export default memo(GuestSelector);

GuestSelector.propTypes = {
  target: PropTypes.objectOf(PropTypes.string, PropTypes.string).isRequired,
  currentValue: PropTypes.number.isRequired,
  guestCountFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
  currentTotal: PropTypes.number.isRequired,
};

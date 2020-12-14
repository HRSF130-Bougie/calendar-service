/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  SelectorWrapper, GuestCategoryWrapper, GuestCategory, GuestSubtext, CountWrapper, PlusMinusButton, PlusMinusButtonDisabled, Count,
} from './GuestSelectorStyles';

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

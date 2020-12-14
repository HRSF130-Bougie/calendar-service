import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  WidgetHeaderWrapper, Price, PerNight, Star, Score, Count,
} from './WidgetHeaderStyles';

const WidgetHeader = ({ headerInfo }) => (
  <WidgetHeaderWrapper>
    <div>
      <Price id="priceForHarris">{`$${headerInfo.lowestPrice}`}</Price>
      <PerNight> / night</PerNight>
    </div>
    <div>
      <Star><FontAwesomeIcon icon={faStar} /></Star>
      <Score>{headerInfo.rating}</Score>
      <Count>{`(${headerInfo.reviews})`}</Count>
    </div>
  </WidgetHeaderWrapper>
);

export default memo(WidgetHeader);

WidgetHeader.propTypes = {
  headerInfo: PropTypes.objectOf(PropTypes.number),
};

WidgetHeader.defaultProps = {
  headerInfo: {
    lowestPrice: 236,
    rating: 4.89,
    reviews: 36,
  },
};

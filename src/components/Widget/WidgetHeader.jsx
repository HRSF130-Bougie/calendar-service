import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const WidgetHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
`;

const Price = styled.span`
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
`;

const PerNight = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Star = styled.span`
  color: #92174D;
`;

const Score = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-left: 4px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Count = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  padding-left: 4px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const WidgetHeader = () => (
  <WidgetHeaderWrapper>
    <div>
      <Price>$236</Price>
      <PerNight> / night</PerNight>
    </div>
    <div>
      <Star><FontAwesomeIcon icon={faStar} size="xs" /></Star>
      <Score>4.89</Score>
      <Count>(36)</Count>
    </div>
  </WidgetHeaderWrapper>
);

export default WidgetHeader;

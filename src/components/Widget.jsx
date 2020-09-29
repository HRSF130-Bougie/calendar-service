import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const WidgetWrapper = styled.div`
  box-sizing: border-box;
  min-width: 220px;
  max-width: 372px;
  height: auto;
  margin: 50px;
  border: 1px solid gray;
  border-radius: 12px;
  padding: 24px;
`;

const WidgetHeader = styled.div`
  width: 100%;
`;

const Price = styled.span`
  color: #484848;
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
`;

const PerNight = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #484848;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Score = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  color: #484848;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Count = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: #484848;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Star = styled.span`
  color: #FF385C;
`;

class Widget extends React.Component {
  constructor() {
    super();
    this.state = {
      startDateSelected: false,
    };
  }

  render() {
    return (
      <WidgetWrapper>
        <WidgetHeader>
          <Price>$236</Price>
          <PerNight> / night</PerNight>
          <Star><FontAwesomeIcon icon={faStar} size="xs" /></Star>
          <Score>4.89</Score>
          <Count>(36)</Count>
        </WidgetHeader>
      </WidgetWrapper>
    );
  }
}

export default Widget;

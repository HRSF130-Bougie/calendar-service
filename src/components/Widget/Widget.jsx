import React from 'react';
import styled from 'styled-components';
import WidgetHeader from './WidgetHeader';

const WidgetWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  min-width: 220px;
  max-width: 372px;
  height: auto;
  margin: 50px;
  border: 1px solid gray;
  border-radius: 12px;
  padding: 24px;
  color: #484848;
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
        <WidgetHeader />
      </WidgetWrapper>
    );
  }
}

export default Widget;

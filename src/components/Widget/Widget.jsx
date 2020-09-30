import React from 'react';
import styled from 'styled-components';
import WidgetHeader from './WidgetHeader';
import WidgetDateGuest from './WidgetDateGuest';

const WidgetWrapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  min-width: 220px;
  max-width: 372px;
  height: auto;
  margin: 50px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
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
        <WidgetDateGuest />
      </WidgetWrapper>
    );
  }
}

export default Widget;

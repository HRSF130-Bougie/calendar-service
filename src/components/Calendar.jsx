import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CalendarPopUp = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: inline-block;
  padding: 24px 32px 16px;
  position: absolute;
  top: -24px;
  right: -32px;
  width: 661px;
  z-index: 1;
  min-height: 460px;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  border-radius: 16px;
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, 42px);
  grid-template-rows: repeat(6, 42px);
  `;

const WeekWrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, 42px);
  margin-bottom: 10px;
  `;

const DayCell = styled.div`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  color: green;
  background-color: cyan;
  text-align: center;
  padding: 3px;
`;

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <>
        <WeekWrapper>
          {weekdays.map((day) => <DayCell>{day}</DayCell>)}
        </WeekWrapper>
        <CalendarWrapper>
          {[...Array(42)].map((x, i) => <DayCell>{i + 1}</DayCell>)}
        </CalendarWrapper>
      </>
    );
  }
}

export default Calendar;

Calendar.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
};

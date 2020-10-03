import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CalendarItem from './CalendarItem';

const CalendarPopUp = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: flex;
  flex-flow: row;
  padding: 24px 32px 16px;
  margin: auto;
  ${'' /* position: absolute;
  top: -24px;
  right: -32px;
  width: 661px; */}
  z-index: 1;
  min-height: 460px;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  border-radius: 16px;
`;

const WeekWrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, 42px);
  margin-bottom: 10px;
  `;

class CalendarCarousel extends React.PureComponent {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const { days } = this.props;

    const renderMonthName = (date) => {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
      <CalendarPopUp>
        {days.map((month) => (
          <CalendarItem key={Math.random()} month={month} />
        ))}
      </CalendarPopUp>
    );
  }
}

export default CalendarCarousel;

CalendarCarousel.propTypes = {
  days: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

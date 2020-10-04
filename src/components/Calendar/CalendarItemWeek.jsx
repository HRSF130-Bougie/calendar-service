import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeekWrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, 42px);
  margin-left: -10px;
  margin-right: 50px;
`;

const WeekCell = styled.div`
  font-family: 'Airbnb Cereal App Book', sans-serif;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 16px;
  color: rgb(113, 113, 113);
`;

const CalendarItemWeek = ({ weekdays }) => (
  <WeekWrapper>
    { weekdays.map((day) => (
      <WeekCell key={Math.random()}>{day}</WeekCell>
    ))}
  </WeekWrapper>
);

export default CalendarItemWeek;

CalendarItemWeek.propTypes = {
  weekdays: PropTypes.arrayOf(PropTypes.string),
};

CalendarItemWeek.defaultProps = {
  weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};

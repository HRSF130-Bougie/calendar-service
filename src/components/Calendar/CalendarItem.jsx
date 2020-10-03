/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CalendarDayCell from './CalendarDayCell';

const CalendarWrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, 42px);
  grid-template-rows: repeat(6, 42px);
  margin: 10px 20px;
  `;

const CalendarItem = ({ month }) => {
  const startingDay = new Date(month[0].date);

  const startDayOfWeek = startingDay.getDay();

  const fillMonthArray = [];

  for (let i = 0; i < startDayOfWeek; i += 1) {
    fillMonthArray[i] = { _id: Math.random(), price: null };
  }

  // Fill in array with month data, placed in the correct days of the week
  for (let i = startDayOfWeek, j = 0; j < month.length; i += 1, j += 1) {
    fillMonthArray[i] = month[j];
  }

  return (
    <CalendarWrapper>
      {fillMonthArray.map((day) => (
        <CalendarDayCell key={day._id} dayInfo={day} />
      ))}
    </CalendarWrapper>
  );
};

export default CalendarItem;

CalendarItem.propTypes = {
  month: PropTypes.arrayOf(PropTypes.object).isRequired,
};

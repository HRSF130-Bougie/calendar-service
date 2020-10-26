/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CalendarItemDays from './CalendarItemDays';

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 42px);
  grid-template-rows: repeat(6, 42px);
  margin-left: -10px;
  margin-right: 40px;
  `;

const CalendarItem = ({
  month, weekendPricing, selectDate, checkIn, checkOut, monthIndex, lastPossibleCheckOut,
}) => {
  const startingDay = new Date(month[0].date);

  const startDayOfWeek = startingDay.getDay();

  let fillMonthArray = [];

  // Fill in array with month data, placed in the correct calendar of the week
  for (let i = startDayOfWeek, j = 0; j < month.length; i += 1, j += 1) {
    fillMonthArray[i] = month[j];
  }

  fillMonthArray = fillMonthArray.fill(0, 0, startDayOfWeek);

  return (
    <CalendarWrapper>
      {fillMonthArray.map((day, dayIndex) => (
        day._id !== undefined
          ? (
            <CalendarItemDays
              key={day._id}
              dayInfo={day}
              weekendPricing={weekendPricing}
              selectDate={selectDate}
              checkIn={checkIn}
              checkOut={checkOut}
              monthIndex={monthIndex}
              dayIndex={dayIndex - startDayOfWeek}
              lastPossibleCheckOut={lastPossibleCheckOut}
            />
          )
          : <div key={Math.random()} />
      ))}
    </CalendarWrapper>
  );
};

export default memo(CalendarItem);

CalendarItem.propTypes = {
  month: PropTypes.arrayOf(PropTypes.object).isRequired,
  weekendPricing: PropTypes.bool.isRequired,
  selectDate: PropTypes.func.isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  monthIndex: PropTypes.number.isRequired,
  lastPossibleCheckOut: PropTypes.instanceOf(Date),
};

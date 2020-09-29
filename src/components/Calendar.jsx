import React from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-columns: repeat(7, 42px);
  grid-template-rows: repeat(5, 42px);
  `;

const DayCell = styled.div`
  color: green;
  background-color: orange;
  text-align: center;
  padding: 3px;
  font-family: 'Airbnb Cereal App Light', sans-serif;
`;

const Calendar = () => (
  <CalendarWrapper>
    {[...Array(35)].map((x, i) => <DayCell>{i + 1}</DayCell>)}
  </CalendarWrapper>
);

export default Calendar;

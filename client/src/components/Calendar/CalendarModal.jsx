/* eslint-disable prefer-const */
/* eslint-disable react/require-default-props */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Keyboard from '../../assets/svg/keyboard-regular.svg';
import CalendarItemWeek from './CalendarItemWeek';
import CalendarItemGrid from './CalendarItemGrid';
import ModalCloseButton from '../ModalCloseButton';
import {
  CalendarPopUp, CalendarHeaderRow, CalendarHeaderRowLeft, SelectDates, MinimumStay,
  CalendarGridRow, CalendarWindow, ArrowWindow, MonthWindow, LeftArrow, RightArrow,
  MonthHeaderTitle, FooterRow, WeekdayRow, PriceWarning, KeyboardInner, KeyboardOuter,
} from './CalendarModalStyles';

const CalendarModal = ({
  calendar, weekendPricing, hideCalendarModal,
  selectDate, clearDates, checkIn, checkOut, lastPossibleCheckOut,
}) => {
  const calMax = 4;

  // Calculate which month the calendar should open to when a checkIn
  // date has already been selected

  let start = 0;
  if (checkIn) {
    const currentMonth = (new Date(Date.now()).getMonth());
    const checkInMonth = checkIn.getMonth();
    if (checkInMonth > currentMonth) {
      if (checkInMonth - currentMonth <= calMax) {
        start = checkInMonth - currentMonth;
      } else {
        start = calMax;
      }
    } else if (12 - (currentMonth - checkInMonth) <= calMax) {
      start = 12 - (currentMonth - checkInMonth);
    } else if (checkInMonth === currentMonth) {
      start = 0;
    } else {
      start = calMax;
    }
  }

  // Hooks to keep track of calendar position
  let [xTransMonth, setXMonth] = useState(start * -322);
  let [xTransGrid, setXGrid] = useState(-324 * start);
  let [calendarLocation, setCalendarLocation] = useState(start);

  const moveLeft = function moveLeft() {
    if (calendarLocation > 0) {
      setXMonth(xTransMonth += 322);
      setXGrid(xTransGrid += 324);
      setCalendarLocation(calendarLocation -= 1);
    }
  };

  const moveRight = function moveRight() {
    if (calendarLocation < calMax) {
      setXMonth(xTransMonth -= 322);
      setXGrid(xTransGrid -= 324);
      setCalendarLocation(calendarLocation += 1);
    }
  };

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const formatMonthName = (date) => dayjs(date).format('MMM D, YYYY');
  const nightCount = dayjs(checkOut).diff(dayjs(checkIn), 'day');

  let selectDates = (checkIn && checkOut) ? `${nightCount} nights` : 'Select Dates';
  if (nightCount === 1) { selectDates = '1 night'; }

  const selectDatesSubHeader = (checkIn && checkOut) ? `${formatMonthName(checkIn)} - ${formatMonthName(checkOut)}` : 'Entire house ∙ 1 bed ∙ 1 bath';

  const slideMonth = {
    transform: `translate(${xTransMonth}px)`,
    transition: 'all 125ms ease-in-out 0s',
  };

  const slideGrid = {
    transform: `translate(${xTransGrid}px)`,
    transition: 'all 125ms ease-in-out 0s',
  };

  return (
    (
      <CalendarPopUp>
        <CalendarHeaderRow>
          <CalendarHeaderRowLeft>
            <SelectDates>{selectDates}</SelectDates>
            <MinimumStay>{selectDatesSubHeader}</MinimumStay>
          </CalendarHeaderRowLeft>
        </CalendarHeaderRow>

        <ArrowWindow>
          <LeftArrow
            xTrans={xTransMonth}
            onClick={moveLeft}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </LeftArrow>
          <MonthWindow>
            <CalendarGridRow style={slideMonth}>
              {
              calendar.map((month) => (
                <MonthHeaderTitle key={Math.random()}>
                  {dayjs(new Date(month[0].date.year, month[0].date.month, month[0].date.day)).format('MMMM')}
                  {' '}
                  {month[0].date.year}
                </MonthHeaderTitle>
              ))
            }
            </CalendarGridRow>
          </MonthWindow>
          <RightArrow
            onClick={moveRight}
          >
            <FontAwesomeIcon icon={faAngleLeft} flip="horizontal" />
          </RightArrow>
        </ArrowWindow>

        <WeekdayRow>
          <CalendarItemWeek weekdays={weekdays} />
          <CalendarItemWeek weekdays={weekdays} />
        </WeekdayRow>

        <CalendarWindow>
          <CalendarGridRow style={slideGrid}>
            {
              calendar.map((month, monthIndex) => (
                <CalendarItemGrid
                  key={Math.random()}
                  month={month}
                  weekendPricing={weekendPricing}
                  selectDate={selectDate}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  monthIndex={monthIndex}
                  lastPossibleCheckOut={lastPossibleCheckOut}
                />
              ))
              }
          </CalendarGridRow>
        </CalendarWindow>

        <FooterRow>
          <KeyboardOuter><KeyboardInner><Keyboard /></KeyboardInner></KeyboardOuter>
          <PriceWarning>Prices on calendar do not include taxes and fees</PriceWarning>
          <ModalCloseButton name="clearDates" text="Clear dates" funct={clearDates} clear />
          <ModalCloseButton name="calendarModalVisible" funct={hideCalendarModal} calendar />
        </FooterRow>
      </CalendarPopUp>
    )
  );
};

export default memo(CalendarModal);

CalendarModal.propTypes = {
  calendar: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  weekendPricing: PropTypes.bool.isRequired,
  hideCalendarModal: PropTypes.func.isRequired,
  selectDate: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  lastPossibleCheckOut: PropTypes.instanceOf(Date),
};

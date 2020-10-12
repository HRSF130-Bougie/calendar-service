/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Keyboard from '../../assets/svg/keyboard-regular.svg';

import CalendarItemWeek from './CalendarItemWeek';
import CalendarItemGrid from './CalendarItemGrid';
import ModalCloseButton from '../ModalCloseButton';

const CalendarPopUp = styled.div`
  grid-area: calendar;
  box-sizing: content-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: grid;
  grid-template-rows: repeat(5, auto);
  flex-flow: row;
  padding: 24px 32px 16px;
  margin: auto;
  position: absolute;
  top: 54px;
  right: -5px;
  width: 597px;
  z-index: 1;
  min-height: 460px;
  height: auto;
  border-radius: 16px;
  background: white;
`;

const CalendarHeaderRow = styled.div`
  display: flex;
  rgb(34, 34, 34);
  width: 100%;
  padding: 2px 0;
`;

const CalendarHeaderRowLeft = styled.div`
  display: flex;
  flex-flow: column;
  width: auto;
`;

const SelectDates = styled.div`
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 8px;
`;

const MinimumStay = styled.div`
  color: rgb(113, 113, 113);
  font-size: 14px;
  line-height:18px;
`;

const CalendarGridRow = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  scroll-snap-type: x mandatory;
`;

const CalendarWindow = styled.div`
  display: flex;
  flex-flow: row;
  border: thin transparent solid;
  width: 609px;
  height: auto;
  overflow: hidden;
  margin-left: -10px;
  padding-left: 10px;
`;

const ArrowWindow = styled.div`
  display: grid;
  width: 620px;
  grid-templates-columns: "auto 1fr auto"
`;

const MonthWindow = styled(CalendarWindow)`
  grid-column:2;
  width: 510px;

`;

const LeftArrow = styled.button`
  cursor: ${(props) => (props.xTransMonth === 0 ? 'not-allowed' : 'pointer')};
  grid-column: 1;
  font-size: 18px;
  align-self: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: transparent;
  outline:none;
  &:hover {
    background: rgb(247,247,247);
  }
`;

const RightArrow = styled(LeftArrow)`
  grid-column: 3;
`;

const MonthHeaderTitle = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  font-size: 16px !important;
  line-height: 20px margin!important;
  min-width: 185px;
  align-self: center;
  text-align: center;
  padding: 26px 0px;
  margin-right: 136px;
`;

const FooterRow = styled.div`
  margin-left: -5px;
  width: 602px;
  height: 32px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
`;

const WeekdayRow = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const PriceWarning = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  color: rgb(113, 113, 113);
`;

const KeyboardInner = styled.div`
    svg {
    color: rgb(113,113,113);
    height: 20px;
    };
`;

const KeyboardOuter = styled.div`
    display: inline-flex;
    align-self: center;
    margin-right: 8px;
    border: black solid 0px;
    border-radius: 25px;
    background: transparent;
    padding: 10px;
    : hover {
      background: rgb(247, 247, 247);
    }
`;

const CalendarModal = ({
  days, weekendPricing, hideCalendarModal, nights,
  selectDate, clearDates, checkIn, checkOut, lastPossibleCheckOut,
}) => {
  const calMax = 4;

  let start = 0;
  if (checkIn) {
    const currentMonth = (new Date(Date.now()).getMonth());
    const checkInMonth = (new Date(checkIn).getMonth());
    if (checkInMonth > currentMonth) {
      if (checkInMonth - currentMonth <= calMax) {
        start = checkInMonth - currentMonth;
      } else {
        start = calMax;
      }
    } else if (12 - (currentMonth - checkInMonth) <= calMax) {
      start = 12 - (currentMonth - checkInMonth);
    } else {
      start = calMax;
    }
  }

  let [xTransMonth, setXMonth] = useState(start * -322);
  let [xTransGrid, setXGrid] = useState(-324 * start);
  let [calendarLocation, setCalendarLocation] = useState(start);

  const moveLeft = function () {
    if (calendarLocation > 0) {
      setXMonth(xTransMonth += 322);
      setXGrid(xTransGrid += 324);
      setCalendarLocation(calendarLocation -= 1);
    }
  };

  const moveRight = function () {
    if (calendarLocation < calMax) {
      setXMonth(xTransMonth -= 322);
      setXGrid(xTransGrid -= 324);
      setCalendarLocation(calendarLocation += 1);
    }
  };

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const renderMonthName = (date) => {
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatMonthName = (date) => dayjs(date).format('MMM D, YYYY');

  let selectDates = (checkIn && checkOut) ? `${nights} nights` : 'Select Dates';
  if (nights === 1) { selectDates = '1 night'; }

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
              days.map((month) => (
                <MonthHeaderTitle key={Math.random()}>
                  {renderMonthName(new Date(month[1].date))}
                  {' '}
                  {new Date(month[0].date).getFullYear()}
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
              days.map((month, monthIndex) => (
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

export default CalendarModal;

CalendarModal.propTypes = {
  days: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  weekendPricing: PropTypes.bool.isRequired,
  hideCalendarModal: PropTypes.func.isRequired,
  selectDate: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  lastPossibleCheckOut: PropTypes.instanceOf(Date),
  nights: PropTypes.number,
};

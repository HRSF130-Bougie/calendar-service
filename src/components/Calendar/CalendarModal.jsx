/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled, { css } from 'styled-components';
import Keyboard from '../../assets/svg/keyboard-regular.svg';

import CalendarItemWeek from './CalendarItemWeek';
import CalendarItemGrid from './CalendarItemGrid';
import ModalCloseButton from '../ModalCloseButton';

const CalendarPopUp = styled.div`
  grid-area: calendar;
  box-sizing: box-border;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: grid;
  grid-template-rows: repeat(5, auto);
  flex-flow: row;
  padding: 24px 32px 16px;
  margin: auto;
  position: absolute;
  top: 100px;
  right: 74px;
  width: 661px;
  z-index: 1;
  min-height: 460px;
  height: auto;
  width: 597px;
  ${'' /* background: rgb(255, 255, 255); */}
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

const MonthHeaderRow = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const MonthHeaderTitle = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  font-size: 16px !important;
  line-height: 20px margin!important;
  width: 294px;
  align-self: center;
  text-align: center;
  padding: 26px 0px;
  margin-left: -10px;
  margin-right: 40px;
`;

const CalendarGridRow = styled(MonthHeaderRow)`
  background: transparent;
`;

const FooterRow = styled.div`
  margin-left: -5px;
  width: 602px;
  height: 32px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
`;

const WeekdayRow = styled(MonthHeaderRow)`
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

class CalendarModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const {
      days, weekendPricing, hideCalendarModal, nights,
      selectDate, clearDates, checkIn, checkOut, lastPossibleCheckOut,
    } = this.props;

    const renderMonthName = (date) => {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const formatMonthName = (date) => dayjs(date).format('MMM D, YYYY');

    let selectDates = (checkIn && checkOut) ? `${nights - 1} nights` : 'Select Dates';
    if (nights === 2) { selectDates = '1 night'; }

    const selectDatesSubHeader = (checkIn && checkOut) ? `${formatMonthName(checkIn)} - ${formatMonthName(checkOut)}` : 'Entire house ∙ 1 bed ∙ 1 bath';

    return (
      (
        <CalendarPopUp>
          <CalendarHeaderRow>
            <CalendarHeaderRowLeft>
              <SelectDates>{selectDates}</SelectDates>
              <MinimumStay>{selectDatesSubHeader}</MinimumStay>
            </CalendarHeaderRowLeft>
          </CalendarHeaderRow>

          <MonthHeaderRow>
            {
              days.map((month) => (
                <MonthHeaderTitle key={Math.random()}>
                  {renderMonthName(new Date(month[0].date))}
                  {' '}
                  {new Date(month[0].date).getFullYear()}
                </MonthHeaderTitle>
              ))
            }
          </MonthHeaderRow>

          <WeekdayRow>
            <CalendarItemWeek weekdays={weekdays} />
            <CalendarItemWeek weekdays={weekdays} />
          </WeekdayRow>

          <CalendarGridRow>
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
          <FooterRow>
            <KeyboardOuter><KeyboardInner><Keyboard /></KeyboardInner></KeyboardOuter>
            <PriceWarning>Prices on calendar do not include taxes and fees</PriceWarning>
            <ModalCloseButton name="clearDates" text="Clear dates" funct={clearDates} clear />
            <ModalCloseButton name="calendarModalVisible" funct={hideCalendarModal} calendar />
          </FooterRow>
        </CalendarPopUp>
      )
    );
  }
}

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

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-solid-svg-icons'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import CalendarItemWeek from './CalendarItemWeek';
import CalendarItemGrid from './CalendarItemGrid';
import ModalCloseButton from '../ModalCloseButton';

const CalendarPopUp = styled.div`
  box-sizing: box-border;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: grid;
  grid-template-rows: repeat(5, auto);
  flex-flow: row;
  padding: 24px 32px 16px;
  margin: auto;
  ${'' /* position: absolute; */}
  top: -24px;
  right: -32px;
  width: 661px;
  z-index: 1;
  min-height: 460px;
  height: auto;
  width: 661px;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  border-radius: 16px;
`;

const CalendarHeaderRow = styled.div`
  display: flex;
  rgb(34, 34, 34);
  width: 100%;
`;

const CalendarHeaderRowLeft = styled.div`
  display: flex;
  flex-flow: column;
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
  width: 100 %
`;

const MonthHeaderTitle = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  font-size: 16px !important;
  line-height: 20px margin!important;
  width: 312px;
  align-self: center;
  text-align: center;
  margin-left: -10px;
  margin-right: 50px;
`;

const CalendarGridRow = styled(MonthHeaderRow)`
`;

const FooterRow = styled.div`
  width: 661px;
  height: 34px;
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

// const WeekWrapper = styled.div`
//   display: grid;
//   grid-gap: 3px;
//   grid-template-columns: repeat(7, 42px);
//   margin-bottom: 10px;
// `;

class CalendarModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      calendarModalVisible: true,
    };

    const { hideModal } = this.props;
    this.hideCalendarModal = hideModal.bind(this);
  }

  render() {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const { days } = this.props;
    const { calendarModalVisible } = this.state;

    const renderMonthName = (date) => {
      const options = { month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
      calendarModalVisible
      && (
        <CalendarPopUp>
          <CalendarHeaderRow>
            <CalendarHeaderRowLeft>
              <SelectDates>Select dates</SelectDates>
              <MinimumStay>Minimum stay: 2 nights</MinimumStay>
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
              days.map((month) => (
                <CalendarItemGrid key={Math.random()} month={month} />
              ))
            }
          </CalendarGridRow>
          <FooterRow>
            <button><FontAwesomeIcon icon={['far', 'keyboard']} /></button>
            <PriceWarning>Prices on calendar do not include taxes and fees</PriceWarning>
            <ModalCloseButton name="clearDates" text="Clear dates" clear />
            <ModalCloseButton name="calendarModalVisible" funct={this.hideCalendarModal} calendar />
          </FooterRow>
        </CalendarPopUp >
      )
    );
  }
}

export default CalendarModal;

CalendarModal.propTypes = {
  days: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  hideModal: PropTypes.func.isRequired,
};

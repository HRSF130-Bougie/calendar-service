/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WidgetHeader from './WidgetHeader';
import WidgetDateGuest from './WidgetDateGuest';
import GuestModal from './GuestModal';
import MainButton from './MainButton';
import CalendarModal from '../Calendar/CalendarModal';
import Pricing from './Pricing';

const WidgetWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  min-width: 220px;
  max-width: 372px;
  height: auto;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  margin: auto;
`;

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      startDateSelected: false,
      guestModalVisible: false,
    };

    const { hideModal } = props;

    this.toggleGuestModal = this.toggleGuestModal.bind(this);
    this.hideGuestModal = hideModal.bind(this);
  }

  toggleGuestModal(event, bool) {
    // eslint-disable-next-line no-unused-expressions

    if (bool !== undefined) {
      this.setState({ guestModalVisible: bool });
    } else {
      this.setState((prevState) => ({ guestModalVisible: !prevState.guestModalVisible }));
    }
  }

  render() {
    const { guestModalVisible } = this.state;
    const {
      guests, increaseGuestCount, decreaseGuestCount,
      days, weekendPricing, selectDate, clearDates,
      checkIn, checkOut, calendarModalVisible,
      // eslint-disable-next-line no-unused-vars
      hideModal, hideCalendarModal, showModal, showCalendarModal,
      lastPossibleCheckOut, fees, appendLeadingZeroes, headerInfo,
    } = this.props;

    const { nights } = fees;

    return (
      <WidgetWrapper>
        <WidgetHeader
          headerInfo={headerInfo}
        />
        <WidgetDateGuest
          toggleGuestModal={this.toggleGuestModal}
          guestModalVisible={guestModalVisible}
          calendarModalVisible={calendarModalVisible}
          guests={guests}
          showCalendarModal={showCalendarModal}
          appendLeadingZeroes={appendLeadingZeroes}
          checkIn={checkIn}
          checkOut={checkOut}

        />
        <GuestModal
          name="guestModalVisible"
          hideGuestModal={this.hideGuestModal}
          show={guestModalVisible}
          guests={guests}
          increaseGuestCount={increaseGuestCount}
          decreaseGuestCount={decreaseGuestCount}
        />
        <MainButton checkOut={checkOut} showCalendarModal={showCalendarModal} />

        { (days && calendarModalVisible)
          && (
            <CalendarModal
              days={days}
              weekendPricing={weekendPricing}
              lastPossibleCheckOut={lastPossibleCheckOut}
              hideCalendarModal={hideCalendarModal}
              selectDate={selectDate}
              clearDates={clearDates}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights ? nights.length : 0}
            />
          )}
        {fees.nights
          && <Pricing fees={fees} />}
      </WidgetWrapper>
    );
  }
}

export default Widget;

Widget.propTypes = {
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  increaseGuestCount: PropTypes.func.isRequired,
  decreaseGuestCount: PropTypes.func.isRequired,
  days: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  weekendPricing: PropTypes.bool.isRequired,
  selectDate: PropTypes.func.isRequired,
  clearDates: PropTypes.func.isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  showModal: PropTypes.func.isRequired,
  showCalendarModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  hideCalendarModal: PropTypes.func.isRequired,
  calendarModalVisible: PropTypes.bool.isRequired,
  lastPossibleCheckOut: PropTypes.instanceOf(Date),
  appendLeadingZeroes: PropTypes.func,
  fees: PropTypes.shape({
    cleaningFee: PropTypes.number,
    nights: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      booked: PropTypes.bool,
      price: PropTypes.number,
      minimumNights: PropTypes.number,
    })),
    basePrice: PropTypes.number,
    serviceFee: PropTypes.number,
    taxes: PropTypes.number,
    total: PropTypes.number,
  }),
  headerInfo: PropTypes.objectOf(PropTypes.number),
};

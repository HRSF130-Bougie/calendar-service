/* eslint-disable react/require-default-props */
import React, { memo } from 'react';
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

class Widget extends React.PureComponent {
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

  toggleGuestModal(event, boolean) {
    // eslint-disable-next-line no-unused-expressions

    if (boolean !== undefined) {
      this.setState({ guestModalVisible: boolean });
    } else {
      this.setState((prevState) => ({ guestModalVisible: !prevState.guestModalVisible }));
    }
  }

  render() {
    const { guestModalVisible } = this.state;
    const {
      guests, guestCountFunctions,
      calendar, weekendPricing, selectDate, clearDates,
      checkIn, checkOut, calendarModalVisible,
      // eslint-disable-next-line no-unused-vars
      hideModal, hideCalendarModal, showModal, showCalendarModal,
      lastPossibleCheckOut, fees, headerInfo,
      addReservation,
    } = this.props;

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
          checkIn={checkIn}
          checkOut={checkOut}

        />
        <GuestModal
          name="guestModalVisible"
          hideGuestModal={this.hideGuestModal}
          show={guestModalVisible}
          guests={guests}
          guestCountFunctions={guestCountFunctions}
        />
        <MainButton
          checkOut={checkOut}
          showCalendarModal={showCalendarModal}
          addReservation={addReservation}
        />

        { (calendar && calendarModalVisible)
          && (
            <CalendarModal
              calendar={calendar}
              weekendPricing={weekendPricing}
              lastPossibleCheckOut={lastPossibleCheckOut}
              hideCalendarModal={hideCalendarModal}
              selectDate={selectDate}
              clearDates={clearDates}
              checkIn={checkIn}
              checkOut={checkOut}

            />
          )}
        {checkOut
          && <Pricing fees={fees} />}
      </WidgetWrapper>
    );
  }
}

export default memo(Widget);

Widget.propTypes = {
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  guestCountFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
  calendar: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
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
  fees: PropTypes.shape({
    cleaningFee: PropTypes.number,
    nightCount: PropTypes.number,
    basePrice: PropTypes.number,
    serviceFee: PropTypes.number,
    taxes: PropTypes.number,
    total: PropTypes.number,
  }),
  headerInfo: PropTypes.objectOf(PropTypes.number),
  addReservation: PropTypes.func.isRequired,
};

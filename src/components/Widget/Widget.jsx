import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WidgetHeader from './WidgetHeader';
import WidgetDateGuest from './WidgetDateGuest';
import GuestModal from './GuestModal';
import MainButton from './MainButton';
import CalendarModal from '../Calendar/CalendarModal';

const WidgetWrapper = styled.div`
  grid-area: widget;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  min-width: 220px;
  max-width: 372px;
  height: auto;
  margin: 50px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
}
`;

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      startDateSelected: false,
      guestModalVisible: false,
      calendarModalVisible: false,
    };

    this.toggleGuestModal = this.toggleGuestModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  toggleGuestModal(event, bool) {
    // eslint-disable-next-line no-unused-expressions
    bool !== undefined
      ? this.setState({ guestModalVisible: bool })
      : this.setState((prevState) => ({ guestModalVisible: !prevState.guestModalVisible }));
  }

  showModal(targetName, prefunct) {
    if (prefunct) { prefunct(); }
    this.setState({ [targetName]: true });
  }

  hideModal(event) {
    event.preventDefault();
    const targetName = event.target.name;
    this.setState({ [targetName]: false });
  }

  render() {
    const { guestModalVisible, calendarModalVisible } = this.state;
    const {
      guests, increaseGuestCount, decreaseGuestCount,
      days, weekendPricing, selectDate, clearDates,
      checkIn, checkOut, checkInFormatted, checkOutFormatted,
    } = this.props;

    console.log(typeof guestModalVisible);

    return (
      <WidgetWrapper>
        <WidgetHeader />
        <WidgetDateGuest
          toggleGuestModal={this.toggleGuestModal}
          guestModalVisible={guestModalVisible}
          calendarModalVisible={calendarModalVisible}
          guests={guests}
          showModal={this.showModal}
          checkInFormatted={checkInFormatted}
          checkOutFormatted={checkOutFormatted}
        />
        <GuestModal
          name="guestModalVisible"
          hideModal={this.hideModal}
          show={guestModalVisible}
          guests={guests}
          increaseGuestCount={increaseGuestCount}
          decreaseGuestCount={decreaseGuestCount}
        />
        <MainButton />
        { (days && calendarModalVisible)
          && (
            <CalendarModal
              days={days}
              hideModal={this.hideModal}
              weekendPricing={weekendPricing}
            // calendarModalVisible={calendarModalVisible}
            selectDate={selectDate}
              clearDates={clearDates}
            checkIn={checkIn}
            checkOut={checkOut}
            />
          )}
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
  checkInFormatted: PropTypes.string,
  checkOutFormatted: PropTypes.string,
};

Widget.defaultProps = {
  checkInFormatted: 'Add date',
  checkOutFormatted: 'Add date',
};

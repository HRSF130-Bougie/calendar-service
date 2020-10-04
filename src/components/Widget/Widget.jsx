import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WidgetHeader from './WidgetHeader';
import WidgetDateGuest from './WidgetDateGuest';
import GuestModal from './GuestModal';
import MainButton from './MainButton';

const WidgetWrapper = styled.div`
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
`;

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      startDateSelected: false,
      guestModalVisible: false,
    };

    const { hideModal } = this.props;

    this.toggleGuestModal = this.toggleGuestModal.bind(this);
    this.hideGuestModal = hideModal.bind(this);
  }

  toggleGuestModal() {
    this.setState((prevState) => ({ guestModalVisible: !prevState.guestModalVisible }));
  }

  render() {
    const { guestModalVisible } = this.state;
    const {
      guests, increaseGuestCount, decreaseGuestCount } = this.props;
    return (
      <WidgetWrapper>
        <WidgetHeader />
        <WidgetDateGuest
          toggleGuestModal={this.toggleGuestModal}
          guestModalVisible={guestModalVisible}
          guests={guests}
        />
        <GuestModal
          hideModal={this.hideGuestModal}
          show={guestModalVisible}
          guests={guests}
          increaseGuestCount={increaseGuestCount}
          decreaseGuestCount={decreaseGuestCount}
        />
        <MainButton />
      </WidgetWrapper>
    );
  }
}

export default Widget;

Widget.propTypes = {
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  increaseGuestCount: PropTypes.func.isRequired,
  decreaseGuestCount: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

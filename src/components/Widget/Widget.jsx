import React from 'react';
import styled from 'styled-components';
import WidgetHeader from './WidgetHeader';
import WidgetDateGuest from './WidgetDateGuest';
import GuestModal from './GuestModal';

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
  constructor() {
    super();
    this.state = {
      startDateSelected: false,
      guestModalVisible: false,
    };

    this.toggleGuestModal = this.toggleGuestModal.bind(this);
    this.hideGuestModal = this.hideGuestModal.bind(this);
  }

  toggleGuestModal() {
    this.setState((prevState) => ({ guestModalVisible: !prevState.guestModalVisible }));
  }

  hideGuestModal() {
    this.setState({ guestModalVisible: false });
  }

  render() {
    const { guestModalVisible } = this.state;

    return (
      <WidgetWrapper>
        <WidgetHeader />
        <WidgetDateGuest
          toggleGuestModal={this.toggleGuestModal}
          guestModalVisible={guestModalVisible}
        />
        <GuestModal hideModal={this.hideGuestModal} show={guestModalVisible} />
      </WidgetWrapper>
    );
  }
}

export default Widget;

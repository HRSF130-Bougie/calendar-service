import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const WidgetDateGuestWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: "checkin checkout"
                      "guests guests";
  grid-template-columns: "1fr 1fr";
  grid-template-rows: 56px 56px;
  border-radius: 8px;
  border: 1px solid rgb(190, 190, 190);
`;

const CheckInBox = styled.div`
  grid-area: checkin;
  display: flex;
  flex-flow: column wrap;
  box-sizing: border-box;
  border-radius: 8px 0px 0px 0px;
  border-right: 1px solid rgb(190, 190, 190);
  padding: 12px;
`;

const CheckOutBox = styled.div`
  grid-area: checkout;
  display: flex;
  flex-flow: column wrap;
  box-sizing: border-box;
  border-radius: 0px 8px 0px 0px;
  padding: 12px;
`;

const GuestBox = styled.div`
  grid-area: guests;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid rgb(190, 190, 190);
  border: ${(props) => (props.focused ? '2px solid rgb(34,34,34)' : '')};
  border-radius: ${(props) => (props.focused ? '8px' : '')};
`;

const DescriptionText = styled.span`
  font-size: 10px;
  line-height: 12px;
  font-weight: 800;
  text-transform: uppercase;
`;

const DisplayText = styled.span`
  display: block;
  font-size: 14px;
  line-height: 18px;
  font-weight: 200;
`;

const AngleUp = styled.span`
color: #484848;
`;

class WidgetDateGuest extends React.Component {
  constructor() {
    super();
    this.state = {
      checkIn: null,
      checkOut: null,
      guestModal: false,
    };

    this.toggleGuestModal = this.toggleGuestModal.bind(this);
  }

  toggleGuestModal() {
    this.setState((prevState) => ({ guestModal: !prevState.guestModal }));
  }

  render() {
    const { guestModal } = this.state;
    return (
      <WidgetDateGuestWrapper>
        <CheckInBox>
          <DescriptionText>
            Check-in
          </DescriptionText>
          <DisplayText>
            Add date
          </DisplayText>
        </CheckInBox>
        <CheckOutBox>
          <DescriptionText>
            Check-out
          </DescriptionText>
          <DisplayText>
            Add date
          </DisplayText>
        </CheckOutBox>
        <GuestBox onClick={this.toggleGuestModal} focused={guestModal}>
          <div>
            <DescriptionText>
              Guests
            </DescriptionText>
            <DisplayText>
              1 guest
            </DisplayText>
          </div>
          <div>
            <AngleUp><FontAwesomeIcon icon={faAngleUp} size="2x" flip={guestModal === true ? 'vertical' : null} /></AngleUp>
          </div>
        </GuestBox>
      </WidgetDateGuestWrapper>
    );
  }
}

export default WidgetDateGuest;

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

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
  vertical-align: top;
`;

const DescriptionText = styled.span`
  font-family: 'Airbnb Cereal App Bold', sans-serif;
  font-size: 10px;
  line-height: 12px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 800;
  text-transform: uppercase;
  vertical-align: top;
`;

const DisplayText = styled.span`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  display: block;
  font-size: 14px;
  line-height: 18px;
  vertical-align: top;
  color: rgb(113, 113, 113);
`;

const GuestText = styled(DisplayText)`
    line-height: 12px;
    font-family: 'Airbnb Cereal App Light', sans-serif;
    color: rgb(34, 34, 34);
`;

const AngleUp = styled.span`
color: #484848;
`;

class WidgetDateGuest extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      checkIn: null,
      // eslint-disable-next-line react/no-unused-state
      checkOut: null,
    };
  }

  render() {
    const { toggleGuestModal, guestModalVisible, state } = this.props;
    let guestCount = '';
    if (state.totalGuests === 1) { guestCount = '1 guest'; } else { guestCount = `${state.totalGuests} guests`; }
    let infantCount = '';
    if (state.infants === 1) { infantCount = ', 1 infant'; } else if (state.infants > 1) { infantCount = `, ${state.infants} infants`; }

    return (
      <WidgetDateGuestWrapper>
        <CheckInBox>
          <DescriptionText>Check-in</DescriptionText>
          <DisplayText> Add date</DisplayText>
        </CheckInBox>
        <CheckOutBox>
          <DescriptionText>Check-out</DescriptionText>
          <DisplayText>Add date </DisplayText>
        </CheckOutBox>
        <GuestBox onClick={toggleGuestModal} focused={guestModalVisible}>
          <div>
            <DescriptionText>Guests</DescriptionText>
            <GuestText>
              {guestCount}
              {infantCount}
            </GuestText>
          </div>
          <div>
            <AngleUp><FontAwesomeIcon icon={faAngleUp} size="2x" flip={guestModalVisible === true ? 'vertical' : null} /></AngleUp>
          </div>
        </GuestBox>
      </WidgetDateGuestWrapper>
    );
  }
}

export default WidgetDateGuest;

WidgetDateGuest.propTypes = {
  toggleGuestModal: PropTypes.func.isRequired,
  guestModalVisible: PropTypes.bool.isRequired,
  state: PropTypes.objectOf(PropTypes.number).isRequired,
};

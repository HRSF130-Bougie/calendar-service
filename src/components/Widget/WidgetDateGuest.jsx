import React from 'react';
import styled, { css } from 'styled-components';
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
`;

const CheckInBoxPopUp = css`
  border: 2px solid black;
  border-radius: 8px;
  width: 150px;
  margin-left: -41px;
`;

const CheckInBox = styled.button`
  grid-area: checkin;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: content-box;
  border-radius: 8px 0px 0px 0px;
  border: 1px solid rgb(190,190,190);
  padding: 12px;
  z-index: 10;
  background:white;
  &:focus {
    outline:none;
  }

  ${({ calendarModalVisible }) => calendarModalVisible && CheckInBoxPopUp}
`;

const CheckOutBoxPopUp = css`
  border-color: rgb(190,190,190);
  border: 1px;
  border-style: solid;
  border-radius: 8px;
  width: 153px;
  margin-left: -12px;
  padding-left: 26px;
  color: rgb(221, 221, 221);
  background: rgb(235, 235, 235);
`;

const CheckOutBox = styled.div`
  grid-area: checkout;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: content-box;
  border-radius: 0px 8px 0px 0px;
  border-color: rgb(190,190,190) rgb(190,190,190) rgb(190,190,190) transparent;
  border-width: 1px;
  border-style: solid;
  padding: 12px;
  z-index: 8;
  &:focus {
    outline:none;
  }

  ${({ calendarModalVisible }) => calendarModalVisible && CheckOutBoxPopUp}
`;

const GuestBoxPopUp = css`
  border: 2px solid black;
  border-radius: 8px;
`;

const GuestBox = styled.div`
  grid-area: guests;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 0px 0px 8px 8px;
  border-color: transparent rgb(190,190,190) rgb(190,190,190) rgb(190,190,190);
  border-width: 1px;
  border-style: solid;
  vertical-align: top;

  ${({ guestModalVisible }) => guestModalVisible && GuestBoxPopUp}

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
  z-index: 4;
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
    };
  }

  render() {
    const {
      toggleGuestModal, guestModalVisible, calendarModalVisible,
      guests, showModal, checkInFormatted,
    } = this.props;
    let guestCount = '';
    if (guests.totalGuests === 1) { guestCount = '1 guest'; } else { guestCount = `${guests.totalGuests} guests`; }
    let infantCount = '';
    if (guests.infants === 1) { infantCount = ', 1 infant'; } else if (guests.infants > 1) { infantCount = `, ${guests.infants} infants`; }

    return (
      <WidgetDateGuestWrapper>
        <CheckInBox
          onClick={() => showModal('calendarModalVisible', () => toggleGuestModal(false))}
          calendarModalVisible={calendarModalVisible}
        >
          <DescriptionText>Check-in</DescriptionText>
          <DisplayText>
            {' '}
            {checkInFormatted}
          </DisplayText>
        </CheckInBox>
        <CheckOutBox
          onClick={() => showModal('calendarModalVisible', () => toggleGuestModal(false))}
          calendarModalVisible={calendarModalVisible}
        >
          <DescriptionText>Check-out</DescriptionText>
          <DisplayText>Add date </DisplayText>
        </CheckOutBox>
        <GuestBox
          onClick={toggleGuestModal}
          focused={guestModalVisible}
          guestModalVisible={guestModalVisible}
        >
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
  calendarModalVisible: PropTypes.bool.isRequired,
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  showModal: PropTypes.func.isRequired,
  checkInFormatted: PropTypes.string.isRequired,
};

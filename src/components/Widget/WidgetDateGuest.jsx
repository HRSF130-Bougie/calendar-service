import React, { memo } from 'react';
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
  ${(props) => (props.checkIn && css`
      background: white;
      border: 1px solid rgb(190,190,190);
      border-radius: 8px;
      z-index: 8;
    }`)}
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
   ${(props) => (props.checkIn && css`
      background: white;
      border: 2px solid black;
      border-radius: 8px;
      z-index: 10;
    }`)}

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
  text-transform: uppercase;
  vertical-align: top;
  z-index: 4;
  color: rgb(34, 34, 34);
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

const WidgetDateGuest = ({
  toggleGuestModal, guestModalVisible, calendarModalVisible, guests,
  checkIn, checkOut, showCalendarModal, appendLeadingZeroes,
}) => {
  let guestCount = '';
  if (guests.totalGuests === 1) { guestCount = '1 guest'; } else { guestCount = `${guests.totalGuests} guests`; }
  let infantCount = '';
  if (guests.infants === 1) { infantCount = ', 1 infant'; } else if (guests.infants > 1) { infantCount = `, ${guests.infants} infants`; }

  const formatMMDDYYYY = (date) => `${appendLeadingZeroes(date.getMonth() + 1)}/${appendLeadingZeroes(date.getDate())}/${date.getFullYear()}`;

  return (
    <WidgetDateGuestWrapper>
      <CheckInBox
        onClick={() => showCalendarModal('calendarModalVisible', (e) => toggleGuestModal(e, false))}
        calendarModalVisible={calendarModalVisible}
        checkIn={checkIn}
      >
        <DescriptionText>Check-in</DescriptionText>
        <DisplayText>{checkIn ? formatMMDDYYYY(checkIn) : 'Add date'}</DisplayText>
      </CheckInBox>
      <CheckOutBox
        onClick={() => showCalendarModal('calendarModalVisible', (e) => toggleGuestModal(e, false))}
        calendarModalVisible={calendarModalVisible}
        checkIn={checkIn}
      >
        <DescriptionText>Check-out</DescriptionText>
        <DisplayText>{checkOut ? formatMMDDYYYY(checkOut) : 'Add date'}</DisplayText>
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
};

export default memo(WidgetDateGuest);

WidgetDateGuest.propTypes = {
  toggleGuestModal: PropTypes.func.isRequired,
  guestModalVisible: PropTypes.bool.isRequired,
  calendarModalVisible: PropTypes.bool.isRequired,
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  showCalendarModal: PropTypes.func.isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  appendLeadingZeroes: PropTypes.func.isRequired,
};

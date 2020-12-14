import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {
  WidgetDateGuestWrapper, CheckInBox, CheckOutBox, GuestBox,
  DescriptionText, DisplayText, GuestText, AngleUp,
} from './WidgetDateGuestStyles';

const WidgetDateGuest = ({
  toggleGuestModal, guestModalVisible, calendarModalVisible, guests,
  checkIn, checkOut, showCalendarModal,
}) => {
  let guestCount = '';
  if (guests.totalGuests === 1) { guestCount = '1 guest'; } else { guestCount = `${guests.totalGuests} guests`; }
  let infantCount = '';
  if (guests.infants === 1) { infantCount = ', 1 infant'; } else if (guests.infants > 1) { infantCount = `, ${guests.infants} infants`; }

  const appendLeadingZeroes = (n) => (n <= 9 ? `0${n}` : n);

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
};

/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  GuestModalWrapper, GuestModalInnerWrapper, MaxGuests, GuestModalCloseButtonWrapper,
} from './GuestModalStyles';
import ModalCloseButton from '../ModalCloseButton';
import GuestSelector from './GuestSelector';

const GuestModal = ({ hideGuestModal, show, guests, guestCountFunctions }) => (
  <GuestModalWrapper>
    {
      show
        ? (
          <GuestModalInnerWrapper>
            <GuestSelector
              target={{ target: 'adults', subtext: '' }}
              currentValue={guests.adults}
              guestCountFunctions={guestCountFunctions}
              currentTotal={guests.totalGuests}
            />
            <GuestSelector
              target={{ target: 'children', subtext: 'Ages 2-12' }}
              currentValue={guests.children}
              guestCountFunctions={guestCountFunctions}
              currentTotal={guests.totalGuests}
            />
            <GuestSelector
              target={{ target: 'infants', subtext: 'Under 2' }}
              currentValue={guests.infants}
              guestCountFunctions={guestCountFunctions}
              currentTotal={guests.totalGuests}
            />

            <MaxGuests>
              6 guests maximum. Infants don’t count toward the number of guests.
            </MaxGuests>
            <GuestModalCloseButtonWrapper>
              <ModalCloseButton name="guestModalVisible" funct={hideGuestModal} />
            </GuestModalCloseButtonWrapper>
          </GuestModalInnerWrapper>
        )
        : <div />
    }

  </GuestModalWrapper>
);

export default memo(GuestModal);

GuestModal.propTypes = {
  hideGuestModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  guests: PropTypes.objectOf(PropTypes.number).isRequired,
  guestCountFunctions: PropTypes.objectOf(PropTypes.func).isRequired,
};

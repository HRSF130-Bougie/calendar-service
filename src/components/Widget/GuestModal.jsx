import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GuestModalCloseButton from './GuestModalCloseButton';

const GuestModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100 %;
  margin: 0px;
`;

const GuestModalInnerWrapper = styled.div`
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 16px;
  position: absolute;
  text-align: left;
  z-index: 999;
  right: 0px;
  width: 100%;
  min-width: 280px;
`;

const GuestModalCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const GuestModal = ({ hideModal, show }) => (
  <GuestModalWrapper>
    {show
      ? (
        <GuestModalInnerWrapper>
          <p>Hi! I am a modal!</p>
          <GuestModalCloseButtonWrapper>
            <GuestModalCloseButton hideModal={hideModal} />
          </GuestModalCloseButtonWrapper>
        </GuestModalInnerWrapper>
      )
      : <div />}

  </GuestModalWrapper>
);

export default GuestModal;

GuestModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

import styled from 'styled-components';

export const GuestModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100 %;
  margin: 0px;
`;

export const GuestModalInnerWrapper = styled.div`
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 16px;
  position: absolute;
  text-align: left;
  z-index: 50;
  right: 0px;
  width: 100%;
  min-width: 280px;
`;

export const MaxGuests = styled.div`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  display: block;
  font-size: 14px;
  line-height: 18px;
  vertical-align: top;
  color: rgb(113, 113, 113);
  margin-bottom: 16px;
`;

export const GuestModalCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

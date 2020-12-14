import styled from 'styled-components';

export const WidgetHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
`;

export const Price = styled.span`
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
`;

export const PerNight = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`;

export const Star = styled.span`
  color: #92174D;
  font-size: 0.6em;
  line-height: 18px;
  vertical-align: top;
`;

export const Score = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-left: 4px;
`;

export const Count = styled.span`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  padding-left: 4px;
  color: rgb(113, 113, 113);
`;

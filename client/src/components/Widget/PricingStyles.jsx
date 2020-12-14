import styled from 'styled-components';

export const NoCharge = styled.div`
  display: flex;
  flex-direction: column;
  color: rgb(34, 34, 34);
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-top: 16px;
  margin-bottom: 22px;
  padding: 0px;
  text-align: center;
`;

export const PriceWrap = styled.div`
  margin-top: 16px;
`;

export const PriceRow = styled.div`
  color: rgb(34, 34, 34);
  font-family: 'Airbnb Cereal App Light', sans-serif;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const PriceDescription = styled.button`
  font-family: inherit;
  color: inherit;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  text-decoration-line: underline;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    color: rgb(5, 5, 5);
  };
`;

export const PriceFigure = styled.div`
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  text-align: right;
`;

export const BorderDiv = styled.div`
  border-top: 1px solid rgb(221, 221, 221);
  padding: 24px 0 0px;
  margin: 16px 0 0;
`;

export const TotalRow = styled(PriceRow)`
  margin: 0px;
`;

export const Total = styled(PriceFigure)`
font-family: 'Airbnb Cereal App Bold', sans-serif;
margin: 0px;
`;

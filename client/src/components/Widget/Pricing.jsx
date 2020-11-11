/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NoCharge = styled.div`
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

const PriceWrap = styled.div`
  margin-top: 16px;
`;

const PriceRow = styled.div`
  color: rgb(34, 34, 34);
  font-family: 'Airbnb Cereal App Light', sans-serif;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PriceDescription = styled.button`
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

const PriceFigure = styled.div`
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  text-align: right;
`;

const BorderDiv = styled.div`
  border-top: 1px solid rgb(221, 221, 221);
  padding: 24px 0 0px;
  margin: 16px 0 0;
`;

const TotalRow = styled(PriceRow)`
  margin: 0px;
`;

const Total = styled(PriceFigure)`
font-family: 'Airbnb Cereal App Bold', sans-serif;
margin: 0px;
`;

const averagePerNight = (base, nightCount) => base / nightCount;

const currencyFormat = (num) => `$${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

const Pricing = ({ fees }) => {
  const { nightCount } = fees;

  return (
    nightCount !== undefined
    && (
    <PriceWrap>
      <NoCharge>{`You won't be charged yet`}</NoCharge>
      <PriceRow>
          <PriceDescription>{`${currencyFormat(averagePerNight(fees.basePrice, nightCount))} x ${nightCount} nights`}</PriceDescription>
        <PriceFigure>{`${currencyFormat(fees.basePrice)}`}</PriceFigure>
      </PriceRow>
      <PriceRow>
        <PriceDescription>Cleaning Fee</PriceDescription>
        <PriceFigure>{`${currencyFormat(fees.cleaningFee)}`}</PriceFigure>
      </PriceRow>
      <PriceRow>
        <PriceDescription>Service Fee</PriceDescription>
        <PriceFigure>{`${currencyFormat(fees.serviceFee)}`}</PriceFigure>
      </PriceRow>
      <PriceRow>
        <PriceDescription>Occupancy taxes and fees</PriceDescription>
        <PriceFigure>{`${currencyFormat(fees.taxes)}`}</PriceFigure>
      </PriceRow>
      <BorderDiv />
      <TotalRow>
        <Total>Total</Total>
        <PriceFigure><Total>{`${currencyFormat(fees.total)}`}</Total></PriceFigure>
      </TotalRow>
    </PriceWrap>
    )
  );
};

export default memo(Pricing);

Pricing.propTypes = {
  fees: PropTypes.shape({
    cleaningFee: PropTypes.number,
    nightCount: PropTypes.number,
    basePrice: PropTypes.number,
    serviceFee: PropTypes.number,
    taxes: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};

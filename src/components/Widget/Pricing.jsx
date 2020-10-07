import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const PriceRow = styled.div`
  font-family: 'Airbnb Cereal App Light', sans-serif;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PriceDescription = styled.button`
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  text-decoration-line: underline;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
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

const Total = styled(PriceFigure)`
font-family: 'Airbnb Cereal App Bold', sans-serif;
`;

const averagePerNight = (base, nightCount) => base / nightCount;

const currencyFormat = (num) => `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

const Pricing = ({ fees }) => (
  <>
    <PriceRow>
      <PriceDescription>{`${currencyFormat(averagePerNight(fees.basePrice, fees.nights.length))} x ${fees.nights.length} nights`}</PriceDescription>
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
    <PriceRow>
      <Total>Total</Total>
      <PriceFigure><Total>{`${currencyFormat(fees.total)}`}</Total></PriceFigure>
    </PriceRow>
  </>
);

export default memo(Pricing);

Pricing.propTypes = {
  fees: PropTypes.object,
};

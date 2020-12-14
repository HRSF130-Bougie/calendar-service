/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  NoCharge, PriceWrap, PriceRow, PriceDescription, PriceFigure, BorderDiv, TotalRow, Total,
} from './PricingStyles';

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

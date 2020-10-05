import React from 'react';
import { createGlobalStyle } from 'styled-components';

import AirbnbCerealBlack from './AirbnbCerealBlack.woff';
import AirbnbCerealBold from './AirbnbCerealBold.woff';
import AirbnbCerealBook from './AirbnbCerealBook.woff';
import AirbnbCerealExtraBold from './AirbnbCerealExtraBold.woff';
import AirbnbCerealLight from './AirbnbCerealLight.woff';
import AirbnbCerealMedium from './AirbnbCerealMedium.woff';

const GlobalFonts = createGlobalStyle`
    @font-face {
      font-family: 'Airbnb Cereal App Book';
      font-style: normal;
      font-weight: normal;
      src: local('Airbnb Cereal App Book'), url(${AirbnbCerealBook}) format('woff');
    }

    @font-face {
      font-family: 'Airbnb Cereal App Light';
      font-style: normal;
      font-weight: normal;
      src: local('Airbnb Cereal App Light'), url(${AirbnbCerealLight}) format('woff');
    }

    @font-face {
      font-family: 'Airbnb Cereal App Medium';
      font-style: normal;
      font-weight: normal;
      src: local('Airbnb Cereal App Medium'), url(${AirbnbCerealMedium}) format('woff');
    }

    @font-face {
      font-family: 'Airbnb Cereal App Bold';
      font-style: normal;
      font-weight: normal;
      src: local('Airbnb Cereal App Bold'), url(${AirbnbCerealBold}) format('woff');
    }

    @font-face {
      font-family: 'Airbnb Cereal App Extra Bold';
      font-style: normal;
      font-weight: normal;
      src: local('Airbnb Cereal App Extra Bold'), url(${AirbnbCerealExtraBold}) format('woff');
    }

    @font-face {
      font-family: 'Airbnb Cereal App Black';
      font-style: normal;
      font-weight: normal;
      src: local('Airbnb Cereal App Black'), url(${AirbnbCerealBlack}) format('woff');
    }


  html, body {
    font-family: 'Airbnb Cereal App Book', sans-serif;
    color: rgb(34, 34, 34);
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
}
`;

export default GlobalFonts;

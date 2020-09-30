import React from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import Calendar from './Calendar';
import Widget from './Widget/Widget';

import AirbnbCerealBlack from '../assets/typefaces/AirbnbCerealBlack.woff';
import AirbnbCerealBold from '../assets/typefaces/AirbnbCerealBold.woff';
import AirbnbCerealBook from '../assets/typefaces/AirbnbCerealBook.woff';
import AirbnbCerealExtraBold from '../assets/typefaces/AirbnbCerealExtraBold.woff';
import AirbnbCerealLight from '../assets/typefaces/AirbnbCerealLight.woff';
import AirbnbCerealMedium from '../assets/typefaces/AirbnbCerealMedium.woff';

const GlobalStyle = createGlobalStyle`
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
}
`;

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentMonth: 10,
    };
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <h1>Hello World from Inside the Booking Component! Testing Again!</h1>
        <Widget />
        <Calendar />
      </>
    );
  }
}

export default hot(Booking);

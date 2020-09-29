/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { hot } from 'react-hot-loader/root';
import Calendar from './Calendar';
import Widget from './Widget/Widget';
<<<<<<< HEAD
import GlobalFonts from '../assets/fonts/GlobalFonts';
=======

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
    color: rgb(34, 34, 34)
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`;
>>>>>>> a21ff27... Merging for rebase - all necessary text present for widget header

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentMonth: 10,
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1,
    };

    this.increaseGuestCount = this.increaseGuestCount.bind(this);
    this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    this.calcTotalGuests = this.calcTotalGuests.bind(this);
  }

  calcTotalGuests() {
    const { adults, children } = this.state;
    this.setState({ totalGuests: adults + children });
  }

  increaseGuestCount(event) {
    const targetName = event.target.name;
    const currentValue = this.state[targetName];

    this.setState({ [targetName]: currentValue + 1 }, () => { this.calcTotalGuests(); });
  }

  decreaseGuestCount(event) {
    const targetName = event.target.name;
    const currentValue = this.state[targetName];

    this.setState({ [targetName]: currentValue - 1 }, () => { this.calcTotalGuests(); });
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests,
    } = this.state;
    return (
<<<<<<< HEAD
      <>
        <GlobalFonts />
<<<<<<< HEAD
        <Widget
          state={{
            adults, children, infants, totalGuests,
          }}
          increaseGuestCount={this.increaseGuestCount}
          decreaseGuestCount={this.decreaseGuestCount}
        />
=======
=======
      <
        <GlobalStyle />
>>>>>>> a21ff27... Merging for rebase - all necessary text present for widget header
        <h1>Hello World from Inside the Booking Component! Testing Again!</h1>
        <Widget />
>>>>>>> f3213dd... Merging for rebase - all necessary text present for widget header
        <Calendar />
      </>
    );
  }
}

export default hot(Booking);

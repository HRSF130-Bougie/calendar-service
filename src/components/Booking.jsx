import React from 'react';
import { hot } from 'react-hot-loader/root';
import Calendar from './Calendar';
import Widget from './Widget/Widget';
import GlobalFonts from '../assets/fonts/GlobalFonts';

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
        <GlobalFonts />
        <h1>Hello World from Inside the Booking Component! Testing Again!</h1>
        <Widget />
        <Calendar />
      </>
    );
  }
}

export default hot(Booking);

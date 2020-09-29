import React from 'react';
import { hot } from 'react-hot-loader/root';
import Calendar from './Calendar';

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      currentMonth: 10,
    };
  }

  render() {
    return (
      <>
        <h1>Hello World from Inside the Booking Component! Testing Again!</h1>
        <Calendar />
      </>
    );
  }
}

export default hot(Booking);

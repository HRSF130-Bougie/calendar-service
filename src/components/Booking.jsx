/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import CalendarCarousel from './Calendar/CalendarCarousel';
import Widget from './Widget/Widget';
import GlobalFonts from '../assets/fonts/GlobalFonts';

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentListing: 0,
      days: [],
      reservations: [],
      cleaningFee: 0,
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1,
    };

    this.increaseGuestCount = this.increaseGuestCount.bind(this);
    this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    this.calcTotalGuests = this.calcTotalGuests.bind(this);
  }

  componentDidMount() {
    const listing = Math.floor((Math.random() * 100) + 1);
    this.setState({ currentListing: listing });

    fetch(`/api/listing/${listing}`)
      .then((response) => response.json())
      .then((data) => {
        const { days, reservations, cleaningFee } = data;
        this.setState({ days, reservations, cleaningFee });
      })
      .catch((error) => console.error('Fetch error: ', error));
  }

  calcTotalGuests() {
    const { adults, children } = this.state;
    this.setState({ totalGuests: adults + children });
  }

  increaseGuestCount(event) {
    event.preventDefault();
    const targetName = event.target.name;

    this.setState(
      (prevState) => ({ [targetName]: prevState[targetName] + 1 }),
      () => { this.calcTotalGuests(); },
    );
  }

  decreaseGuestCount(event) {
    event.preventDefault();
    const targetName = event.target.name;

    this.setState(
      (prevState) => ({ [targetName]: prevState[targetName] - 1 }),
      () => { this.calcTotalGuests(); },
    );
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests, days,
    } = this.state;
    return (
      <>
        <GlobalFonts />
        <Widget
          guests={{
            adults, children, infants, totalGuests,
          }}
          increaseGuestCount={this.increaseGuestCount}
          decreaseGuestCount={this.decreaseGuestCount}
        />
        { days
          ? (
            <CalendarCarousel days={days} />
          )
          : <div />}
      </>
    );
  }
}

export default Booking;

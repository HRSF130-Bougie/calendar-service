/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import GlobalFonts from '../assets/fonts/GlobalFonts';
import Widget from './Widget/Widget';

const OuterPage = styled.div`
  width:100%;
  max-width: 1280px;
  position: relative ;
  min-height: 100vh ;
`;

const InnerPage = styled.div`
  display: grid;
  grid-template-areas: "space widget"
                      "calendar calendar";
  grid-template-columns: 1fr 500px;
  grid-template-rows:auto auto;
`;

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
      weekendPricing: false,
      checkIn: null,
      checkOut: null,
      checkInFormatted: 'Add date',
      checkOutFormatted: 'Add date',
    };

    this.increaseGuestCount = this.increaseGuestCount.bind(this);
    this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    this.calcTotalGuests = this.calcTotalGuests.bind(this);
    this.selectCheckIn = this.selectCheckIn.bind(this);
    this.clearDates = this.clearDates.bind(this);
  }

  componentDidMount() {
    const listing = Math.floor((Math.random() * 100) + 1);
    this.setState({ currentListing: listing });

    fetch(`/api/listing/${listing}`)
      .then((response) => response.json())
      .then((data) => {
        const {
          days, reservations, cleaningFee, weekendPricing,
        } = data;
        this.setState({
          days, reservations, cleaningFee, weekendPricing,
        });
      })
      .catch((error) => console.error('Fetch error: ', error));
  }

  clearDates() {
    this.setState({
      checkIn: null,
      checkOut: null,
      checkInFormatted: 'Add date',
      checkOutFormatted: 'Add date',
    });
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

  // eslint-disable-next-line class-methods-use-this
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return `0${n}`;
    }
    return n;
  }

  selectCheckIn(date) {
    const formattedDate = `${this.appendLeadingZeroes(date.getMonth() + 1)}/${this.appendLeadingZeroes(date.getDate())}/${date.getFullYear()}`;
    console.log(formattedDate);
    this.setState({
      checkIn: date,
      checkInFormatted: formattedDate,
    });
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests, days, weekendPricing, checkIn, checkOut,
      checkInFormatted } = this.state;
    return (
      <OuterPage>
        <GlobalFonts />
        <InnerPage>
          <Widget
            guests={{
              adults, children, infants, totalGuests,
            }}
            increaseGuestCount={this.increaseGuestCount}
            decreaseGuestCount={this.decreaseGuestCount}
            weekendPricing={weekendPricing}
            days={days}
            selectCheckIn={this.selectCheckIn}
            checkIn={checkIn}
            checkInFormatted={checkInFormatted}
            clearDates={this.clearDates}
          />
        </InnerPage>
      </OuterPage>
    );
  }
}

export default Booking;

/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
      currentListing: 0,
      days: [],
      reservations: [],
      cleaningFee: 0,
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1,
      currentMonth: 0,
      visibleMonth1: 0,
      visibleMonth2: 0,
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
        return days;
      })
      .then((days) => {
        let firstDate = new Date(days[0].date);
        console.log(firstDate);
        firstDate = new Date(firstDate);
        const dayOfWeek = firstDate.getDay();
        const getMonth = firstDate.getMonth();
        this.setState({
          currentMonth: getMonth,
          visibleMonth1: getMonth,
          visibleMonth2: getMonth + 1,
        });
      })

      .catch((error) => console.error('Fetch error: ', error));
  }

  calcTotalGuests() {
    const { adults, children } = this.state;
    this.setState({ totalGuests: adults + children });
  }

  increaseGuestCount(event) {
    const targetName = event.target.name;

    this.setState(
      (prevState) => ({ [targetName]: prevState[targetName] + 1 }),
      () => { this.calcTotalGuests(); },
    );
  }

  decreaseGuestCount(event) {
    const targetName = event.target.name;

    this.setState(
      (prevState) => ({ [targetName]: prevState[targetName] - 1 }),
      () => { this.calcTotalGuests(); },
    );
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests, days, currentMonth, visibleMonth1, visibleMonth2,
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
        <Calendar
          days={days}
          currentMonth={currentMonth}
          visibleMonth1={visibleMonth1}
          visibleMonth2={visibleMonth2}

        />
      </>
    );
  }
}

export default hot(Booking);

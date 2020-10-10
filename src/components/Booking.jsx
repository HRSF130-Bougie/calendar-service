/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import GlobalFonts from '../assets/fonts/GlobalFonts';
import Widget from './Widget/Widget';

const OuterPage = styled.div`
  width:100%;
  min-width: 700px;
  position: relative ;
  min-height: 100vh;
`;

const InnerPage = styled.div`
  display: grid;
  grid-template-areas: "space widget";
  grid-template-columns: 1fr 700px;
  grid-template-rows:auto;
`;

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentListing: 0,
      days: [],
      reservations: [],
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1,
      weekendPricing: false,
      checkIn: null,
      checkOut: null,
      calendarModalVisible: false,
      lastPossibleCheckOut: new Date(2030, 12),
      fees: {},
    };

    this.selectDate = this.selectDate.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.increaseGuestCount = this.increaseGuestCount.bind(this);
    this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    this.calcTotalGuests = this.calcTotalGuests.bind(this);
    this.hideCalendarModal = this.hideModal.bind(this);
    this.showCalendarModal = this.showModal.bind(this);
    this.getSelectedDays = this.getSelectedDays.bind(this);
  }

  componentDidMount() {
    const windowId = window.location.href.split('/')[4];
    const listing = Math.floor((Math.random() * 100) + 1);
    const param = windowId || listing;
    this.setState({ currentListing: param });

    fetch(`/api/booking/listing/${param}`)
      .then((response) => response.json())
      .then((data) => {
        const {
          days, reservations, cleaningFee, weekendPricing,
        } = data;
        this.setState({
          days, reservations, weekendPricing, fees: { cleaningFee },
        });
      })
      .catch((error) => console.error('Fetch error: ', error));
  }

  getLastDayCheckOut(selectedMonthIndex, selectedDayIndex) {
    const { days } = this.state;
    for (let months = selectedMonthIndex; months < days.length; months += 1) {
      for (let day = selectedDayIndex; day < days[months].length; day += 1) {
        if (days[months][day].booked) {
          return new Date(days[months][day - 1].date);
        }
      }
    }
    return null;
  }

  getSelectedDays(selectedMonthIndex, selectedDayIndex) {
    const {
      days, checkIn, checkOut, fees,
    } = this.state;

    const { cleaningFee } = fees;

    // Calculate number of days in the reservation
    const nightCount = Math.floor(
      // eslint-disable-next-line max-len
      (Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate()) - Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate())) / (1000 * 60 * 60 * 24),
    ) + 1;

    // Create an array of the date objects of all selected dates
    const nights = [];
    for (let months = selectedMonthIndex; months < days.length; months += 1) {
      for (let day = selectedDayIndex; day < days[months].length; day += 1) {
        if (nights.length < nightCount) {
          nights.push(days[months][day - 2]);
        }
      }
    }

    const initial = 0;
    // eslint-disable-next-line max-len
    const basePrice = nights.reduce((accumulator, currentValue) => accumulator + currentValue.price, initial);
    const serviceFee = Math.ceil(basePrice * 0.0148);
    const taxes = Math.ceil(basePrice * 0.011);
    const total = basePrice + cleaningFee + serviceFee + taxes;

    this.setState({
      fees: {
        cleaningFee, nights, basePrice, serviceFee, taxes, total,
      },
    });
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
    // TODO: Use a ternary when you want to return something
    return n <= 9 ? `0${n}` : n;
  }

  showModal(targetName, preFunct) {
    if (preFunct) { preFunct(); }
    this.setState({ [targetName]: true });
  }

  hideModal(event, name) {
    let targetName = name;
    if (event) {
      event.preventDefault();
      targetName = event.target.name;
    }
    this.setState({ [targetName]: false });
  }

  increaseGuestCount(event) {
    event.preventDefault();
    const targetName = event.target.name;

    this.setState(
      (prevState) => ({ [targetName]: prevState[targetName] + 1 }),
      () => { this.calcTotalGuests(); },
    );
  }

  calcTotalGuests() {
    const { adults, children } = this.state;
    this.setState({ totalGuests: adults + children });
  }

  clearDates() {
    this.setState({
      checkIn: null,
      checkOut: null,
      lastPossibleCheckOut: new Date(2030, 12),
    });
  }

  selectDate(date, selectedMonthIndex, selectedDayIndex) {
    const { checkIn, checkOut } = this.state;
    if (!checkIn) {
      this.setState({
        checkIn: date,
      }, () => this.setState({
        lastPossibleCheckOut: this.getLastDayCheckOut(selectedMonthIndex, selectedDayIndex),
      }));
    } else if (checkIn && !checkOut) {
      this.setState({
        checkOut: date,
      }, () => {
        this.hideModal(null, 'calendarModalVisible');
        this.getSelectedDays(selectedMonthIndex, selectedDayIndex);
      });
    } else if (checkIn && checkOut) {
      this.clearDates();
      this.setState({
        checkIn: date,
        lastPossibleCheckOut: this.getLastDayCheckOut(selectedMonthIndex, selectedDayIndex),
      });
    }
    if (checkOut) { this.getSelectedDays(); }
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests, days, weekendPricing, checkIn, checkOut,
      calendarModalVisible, lastPossibleCheckOut,
      fees,
    } = this.state;
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
            selectDate={this.selectDate}
            checkIn={checkIn}
            checkOut={checkOut}
            clearDates={this.clearDates}
            showModal={this.showModal}
            showCalendarModal={this.showCalendarModal}
            hideModal={this.hideModal}
            hideCalendarModal={this.hideCalendarModal}
            calendarModalVisible={calendarModalVisible}
            lastPossibleCheckOut={lastPossibleCheckOut}
            appendLeadingZeroes={this.appendLeadingZeroes}
            fees={fees}
          />
        </InnerPage>
      </OuterPage>
    );
  }
}

export default Booking;

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
      calendarModalVisible: false,
      lastPossibleCheckOut: new Date(2030, 12),
    };

    this.selectDate = this.selectDate.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.increaseGuestCount = this.increaseGuestCount.bind(this);
    this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    this.calcTotalGuests = this.calcTotalGuests.bind(this);
    this.hideCalendarModal = this.hideModal.bind(this);
    this.showCalendarModal = this.showModal.bind(this);
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

  getLastDayCheckOut(selectedMonthIndex, selectedDayIndex) {
    const { days } = this.state;
    for (let months = selectedMonthIndex; months < days.length; months += 1) {
      for (let day = selectedDayIndex; day < days[months].length; day += 1) {
        if (days[months][day].booked) {
          console.log(days[months][day - 1].date);
          return new Date(days[months][day - 1].date);
        }
      }
    }
    return null;
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
      checkInFormatted: 'Add date',
      checkOutFormatted: 'Add date',
      lastPossibleCheckOut: new Date(2030, 12),
    });
  }

  selectDate(date, selectedMonthIndex, selectedDayIndex) {
    const formattedDate = `${this.appendLeadingZeroes(date.getMonth() + 1)}/${this.appendLeadingZeroes(date.getDate())}/${date.getFullYear()}`;
    const { checkIn, checkOut } = this.state;
    if (!checkIn) {
      this.setState({
        checkIn: date,
        checkInFormatted: formattedDate,
        checkInIndices: [selectedMonthIndex, selectedDayIndex],
      }, () => this.setState({
        lastPossibleCheckOut: this.getLastDayCheckOut(selectedMonthIndex, selectedDayIndex),
      }));
    } else if (checkIn && !checkOut) {
      this.setState({
        checkOut: date,
        checkOutFormatted: formattedDate,
        checkInIndices: [selectedMonthIndex, selectedDayIndex],
      }, () => this.hideModal(null, 'calendarModalVisible'));
    } else if (checkIn && checkOut) {
      this.clearDates();
      this.setState({
        checkIn: date,
        checkInFormatted: formattedDate,
        checkInIndices: [selectedMonthIndex, selectedDayIndex],
      });
    }
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests, days, weekendPricing, checkIn, checkOut,
      checkInFormatted, checkOutFormatted, calendarModalVisible, lastPossibleCheckOut,
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
            checkInFormatted={checkInFormatted}
            checkOutFormatted={checkOutFormatted}
            clearDates={this.clearDates}
            showModal={this.showModal}
            showCalendarModal={this.showCalendarModal}
            hideModal={this.hideModal}
            hideCalendarModal={this.hideCalendarModal}
            calendarModalVisible={calendarModalVisible}
            lastPossibleCheckOut={lastPossibleCheckOut}
          />
        </InnerPage>
      </OuterPage>
    );
  }
}

export default Booking;

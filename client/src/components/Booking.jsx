/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import GlobalFonts from '../assets/fonts/GlobalFonts';
import Widget from './Widget/Widget';

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentListing: 0,
      calendar: [],
      reservations: [],
      adults: 1,
      children: 0,
      infants: 0,
      totalGuests: 1,
      weekendPricing: false,
      checkIn: null,
      checkOut: null,
      checkInIndex: {},
      checkOutIndex: [],
      calendarModalVisible: false,
      lastPossibleCheckOut: new Date(2030, 12),
      fees: {},
      headerInfo: {
        lowestPrice: null,
        rating: null,
        reviews: null,
      },
      bookHold: [],
    };

    this.selectDate = this.selectDate.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.increaseGuestCount = this.increaseGuestCount.bind(this);
    this.decreaseGuestCount = this.decreaseGuestCount.bind(this);
    this.calcTotalGuests = this.calcTotalGuests.bind(this);
    this.hideCalendarModal = this.hideModal.bind(this);
    this.showCalendarModal = this.showModal.bind(this);
    this.getSelectedDays = this.getSelectedDays.bind(this);
    this.addReservation = this.addReservation.bind(this);
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
          calendar, reservations, cleaningFee, weekendPricing, lowestPrice, rating, reviews,
        } = data;
        this.setState({
          calendar,
          reservations,
          weekendPricing,
          fees: { cleaningFee },
          headerInfo: { lowestPrice, rating, reviews },
        });
      })
      .catch((error) => console.error('Fetch error: ', error));
  }

  getLastDayCheckOut(selectedMonthIndex, selectedDayIndex) {
    const { calendar } = this.state;
    for (let months = selectedMonthIndex; months < calendar.length; months += 1) {
      for (let days = selectedDayIndex; days < calendar[months].length; days += 1) {
        if (calendar[months][days].booked) {
          const { year, month, day } = calendar[months][days - 1].date;
          return new Date(year, month, day);
        }
        // Go to the start of the next month if end of current is reached
        if (days === calendar[months].length - 1) {
          days = 0;
          months += 1;
        }
      }
    }
    return null;
  }

  getSelectedDays() {
    const {
      calendar, checkIn, checkOut, checkInIndex, checkOutIndex, fees,
    } = this.state;

    const { cleaningFee } = fees;

    // Calculate number of days in the reservation
    const nightCount = Math.floor(
      // eslint-disable-next-line max-len
      (Date.UTC(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate()) - Date.UTC(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate())) / (1000 * 60 * 60 * 24),
    ) + 1;

    // Create an array of the date objects of all selected dates
    const nights = [];
    const bookHold = [];
    let count = nightCount;
    // let monthCounter = selectedMonthIndex;
    // let dayCounter = selectedDayIndex;

    // Collect arrays of dates and price for fee calculations and to block out the dates

    for (let months = checkInIndex.monthIndex; months <= checkOutIndex.monthIndex; months += 1) {
      let dayLimit = calendar[months].length - 1;
      console.log({ months, dayLimit });
      for (let days = checkInIndex.dayIndex; days < dayLimit; days += 1) {
        console.log({ months, days })
        if (months === checkOutIndex.monthIndex) {
          dayLimit = checkOutIndex.dayIndex + 1;
        }
        if (days === calendar[months].length - 1) {
          days = -1;
          months += 1;
        } else {
          bookHold.push([months, days]);
        }
        // Go to the start of the next month if end of current is reached
      }
    }

    // while (count > 0) {
    //   console.log({ count, monthCounter, dayCounter });
    //   if (dayCounter < calendar[monthCounter].length) {
    //     nights.push(calendar[monthCounter][dayCounter-3]);
    //     bookHold.push([monthCounter, dayCounter]);
    //     dayCounter += 1;
    //   } else if (dayCounter === calendar[monthCounter].length) {
    //     nights.push(calendar[monthCounter][dayCounter-3]);
    //     dayCounter = 1;
    //     monthCounter += 1;
    //   }
    //   count -= 1;
    // }

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
      bookHold,
    });
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

  calcTotalGuests() {
    const { adults, children } = this.state;
    this.setState({ totalGuests: adults + children });
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

  clearDates() {
    this.setState({
      checkIn: null,
      checkOut: null,
      lastPossibleCheckOut: new Date(2030, 12),
      bookHold: [],
    }, () => this.setState((prevState) => ({ fees: { cleaningFee: prevState.fees.cleaningFee } })));
  }

  clearGuests() {
    this.setState({
      adults: 0,
      children: 0,
      infants: 0,
      totalGuests: 1,
    });
  }

  selectDate(date, selectedMonthIndex, selectedDayIndex) {
    const { checkIn, checkOut } = this.state;
    if (!checkIn || (checkIn && checkOut)) {
      if (checkOut) { this.clearDates(); }
      this.setState({
        checkIn: date,
        checkInIndex: { monthIndex: selectedMonthIndex, dayIndex: selectedDayIndex },
      }, () => this.setState({
        lastPossibleCheckOut: this.getLastDayCheckOut(selectedMonthIndex, selectedDayIndex),
      }));
    } else if (checkIn && !checkOut) {
      this.setState({
        checkOut: date,
        checkOutIndex: { monthIndex: selectedMonthIndex, dayIndex: selectedDayIndex },
      }, () => {
        this.hideModal(null, 'calendarModalVisible');
        this.getSelectedDays();
      });
    }
  }

  addReservation() {
    const {
      currentListing, checkIn, checkOut, adults, children, infants, fees, calendar, bookHold,
    } = this.state;
    const {
      cleaningFee, basePrice, serviceFee, taxes, total,
    } = fees;

    const newBooking = {
      checkIn,
      checkOut,
      guests: {
        adults,
        children,
        infants,
      },
      fees: {
        cleaningFee,
        basePrice,
        serviceFee,
        taxes,
        total,
      },
    };

    const daysCopy = calendar;

    bookHold.forEach((resDay) => {
      console.log(resDay);
      const month = resDay[0];
      const day = resDay[1];
      console.log(month, day);
      console.log(daysCopy[month][day]);
      daysCopy[month][day].booked = true;
      console.log(daysCopy[month][day].booked);
    });

    this.setState({ calendar: daysCopy });

    console.log('hit add');

    fetch(`api/booking/listing/reservation/${currentListing}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking, calendar),
    })
      .then((response) => response.json())
      .then(() => this.clearDates())
      .then(() => this.clearGuests())
      .catch((error) => console.error('Fetch error: ', error));
  }

  render() {
    const guestType = 'adults';
    const {
      adults, children, infants, totalGuests, calendar, weekendPricing, checkIn, checkOut,
      calendarModalVisible, lastPossibleCheckOut, headerInfo, fees,
    } = this.state;

    return (
      // <OuterPage>
      <>
        <GlobalFonts />
        <Widget
          guests={{
            adults, children, infants, totalGuests,
          }}
          increaseGuestCount={this.increaseGuestCount}
          decreaseGuestCount={this.decreaseGuestCount}
          weekendPricing={weekendPricing}
          calendar={calendar}
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
          headerInfo={headerInfo}
          addReservation={this.addReservation}
        />
      </>
      // </OuterPage>
    );
  }
}

export default Booking;

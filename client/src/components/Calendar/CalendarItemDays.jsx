/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import {
  DayCellWrapper, DayCell, SelectedCheck, Available, Unavailable, InBetween, DateDisplay, PriceDisplay,
} from './CalendarItemDaysStyles';

class CalendarDayCell extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      dayState: 'available',
      // beforeToday, booked, available, beforeCheckin,
      // checkInOnly, checkInBoth, inBetween, checkOut
    };

    this.calcDayState = this.calcDayState.bind(this);
    this.selectThisDate = this.selectThisDate.bind(this);
  }

  componentDidMount() {
    this.setState({
      dayState: this.calcDayState(),
    });
  }

  calcDayState() {
    let dayStatus = 'available';
    const {
      dayInfo, checkIn, checkOut, lastPossibleCheckOut,
    } = this.props;
    const { year, month, day } = dayInfo.date;
    const today = new Date(Date.now());
    const thisCell = new Date(year, month, day);

    if (thisCell < today) {
      dayStatus = 'beforeToday';
    }

    const isBooked = dayInfo.booked || dayInfo.booked === undefined;
    const isCheckInOnly = checkIn !== null && thisCell < checkIn && !checkOut;
    const isAfterLastPossibleCheckOut = thisCell > lastPossibleCheckOut;
    const isCheckIn = checkIn && thisCell.toDateString() === checkIn.toDateString();
    const isCheckOut = checkOut && thisCell.toDateString() === checkOut.toDateString();
    const isBetweenSelected = (checkIn && checkOut) && (thisCell > checkIn) && (thisCell < checkOut);
    const isNotBooked = dayInfo.booked === false;
    const isNotSelected = dayStatus !== 'selected';

    if (thisCell >= today) {
      if (isCheckInOnly || isAfterLastPossibleCheckOut) {
        dayStatus = 'unavailable';
      } else if (isBooked) {
        dayStatus = 'booked';
      } else if (isCheckIn || isCheckOut) {
        dayStatus = 'selected';
      } else if (isBetweenSelected) {
        dayStatus = 'inBetween';
      } else if (isNotBooked && isNotSelected) {
        dayStatus = 'available';
      }
    }

    return dayStatus;
  }

  selectThisDate() {
    const {
      dayInfo, selectDate, monthIndex, dayIndex,
    } = this.props;
    const { year, month, day } = dayInfo.date;
    const thisCell = new Date(year, month, day);
    this.setState({ dayState: 'selected' });
    selectDate(thisCell, monthIndex, dayIndex);
  }

  render() {
    const {
      dayInfo, weekendPricing, checkIn, checkOut,
    } = this.props;
    const { year, month, day } = dayInfo.date;
    const dateDisplay = dayInfo ? day : null;
    const priceDisplay = dayInfo.price ? dayInfo.price : null;
    const { dayState } = this.state;
    const thisCell = new Date(year, month, day);
    let inOrOut = '';

    if (checkOut) {
      if (thisCell.toDateString() === checkIn.toDateString()) {
        inOrOut = 'in';
      } else if (thisCell.toDateString() === checkOut.toDateString()) {
        inOrOut = 'out';
      }
    }

    return (
      <DayCellWrapper inBetween={dayState} inOrOut={inOrOut}>
        <DayCell cellState={dayState}>
          {dayState === 'available'
            && (
              <Available onClick={this.selectThisDate}>
                <DateDisplay>{dateDisplay}</DateDisplay>
                { weekendPricing
                  && (
                    <PriceDisplay>
                      $
                      {priceDisplay}
                    </PriceDisplay>
                  )}
              </Available>
            )}
          {
            (dayState === 'beforeToday' || dayState === 'booked' || dayState === 'unavailable')
            && (
              <Unavailable>{dateDisplay}</Unavailable>
            )
          }
          {
            (dayState === 'selected')
            && (
              <SelectedCheck>
                <DateDisplay>{dateDisplay}</DateDisplay>
                { weekendPricing
                  && (
                    <PriceDisplay selected={dayState}>
                      $
                      {priceDisplay}
                    </PriceDisplay>
                  )}
              </SelectedCheck>
            )
          }
          {dayState === 'inBetween'
            && (
              <InBetween onClick={this.selectThisDate}>
                <DateDisplay>{dateDisplay}</DateDisplay>
                { weekendPricing
                  && (
                    <PriceDisplay>
                      $
                      {priceDisplay}
                    </PriceDisplay>
                  )}
              </InBetween>
            )}

        </DayCell>
      </DayCellWrapper>
    );
  }
}

export default CalendarDayCell;

CalendarDayCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dayInfo: PropTypes.object,
  weekendPricing: PropTypes.bool,
  selectDate: PropTypes.func.isRequired,
  checkIn: PropTypes.instanceOf(Date),
  checkOut: PropTypes.instanceOf(Date),
  monthIndex: PropTypes.number.isRequired,
  dayIndex: PropTypes.number.isRequired,
  lastPossibleCheckOut: PropTypes.instanceOf(Date),
};

CalendarDayCell.defaultProps = {
  dayInfo: {
    date: 0,
    price: 0,
    booked: false,
    minimumNights: 0,
  },
  weekendPricing: false,
};

/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayCellWrapper = styled.div`
  background: ${(props) => ((props.inBetween === 'inBetween' || (props.inBetween === 'selected' && props.inOrOut)) ? '#f7f7f7' : 'transparent')};
  border-radius: 0;
  border-radius: ${(props) => ((props.inOrOut === 'in') && '50% 0% 0% 50%')};
  border-radius: ${(props) => ((props.inOrOut === 'out') && '0 50% 50% 0')};
`;

const DayCell = styled.div`
  font-family: 'Airbnb Cereal App Book', sans-serif;
  display: flex;
  flex-flow: column;
  align-self: center;
  font-size: 14px;
  line-height: 18px;
  color: rgb(34, 34, 34);
  height:-webkit-fill-available;
  justify-content: center;
  border-radius: 50%;
  width: -webkit-fill-available;
  &:hover {
    border: thin solid rgb(34,34,34);
    background:white;
}
`;

const SelectedCheck = styled(DayCell)`
  background: black;
  color: white !important;
  border-radius: 50%;
  &:hover {
    border: thin solid white;
    background:black;
}
`;

const Available = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  display: flex;
  flex-flow: column;
  text-align: center;
  padding: 3px;
`;

const Unavailable = styled(Available)`
  color: rgb(176, 176, 176);
  text-decoration: line-through;
`;

const InBetween = styled(Available)`
  background: #f7f7f7;
  height:-webkit-fill-available;
  display: inline-flex;
  justify-content: center;
  &:hover {
      border: thin solid black;
      background:white;
      border-radius:50%;
  }
`;

const DateDisplay = styled.div`
  font-size: 14px;
  line-height: 18px;
  align-self: center;
`;

const PriceDisplay = styled.div`
  font-family: 'Airbnb Cereal App Book', sans-serif;
  font-size: 10px;
  line-height: 12px;
  color: ${(props) => (props.selected === 'selected' ? 'white' : 'rgb(113, 113, 113)')};
  align-self: center;
`;

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
    this.calcDayState();
  }

  calcDayState() {
    const { dayState } = this.state;
    const {
      dayInfo, checkIn, checkOut, lastPossibleCheckOut,
    } = this.props;
    const { year, month, day } = dayInfo.date;
    const today = new Date(Date.now());
    const thisCell = new Date(year, month, day);

    console.log('thisCell: ', thisCell);

    if (thisCell <= today
      || (thisCell < checkIn && !checkOut)
      || (lastPossibleCheckOut !== null && !checkOut && (thisCell > lastPossibleCheckOut))) {
      this.setState({ dayState: 'beforeToday' });
    } else if (dayInfo.booked || dayInfo.booked === undefined) {
      this.setState({ dayState: 'booked' });
    } else if ((checkIn && thisCell.toUTCString() === checkIn.toUTCString())
      || (checkOut && thisCell.toUTCString() === checkOut.toUTCString())) {
      this.setState({ dayState: 'selected' });
    } else if ((checkIn && checkOut) && (thisCell > checkIn) && (thisCell < checkOut)) {
      this.setState({ dayState: 'inBetween' });
    } else if (dayInfo.booked === false && dayState !== 'selected') {
      this.setState({ dayState: 'available' });
    }
  }

  selectThisDate() {
    const {
      dayInfo, selectDate, monthIndex, dayIndex,
    } = this.props;
    this.setState({ dayState: 'selected' });
    selectDate(new Date(dayInfo.date), monthIndex, dayIndex);
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
      if (thisCell.toUTCString() === checkIn.toUTCString()) {
        inOrOut = 'in';
      } else if (thisCell.toUTCString() === checkOut.toUTCString()) {
        inOrOut = 'out';
      }
    }

    return (
      <DayCellWrapper inBetween={dayState} inOrOut={inOrOut}>
        <DayCell cellState={dayState}>
          { dayState === 'available'
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
          (dayState === 'beforeToday' || dayState === 'booked')
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

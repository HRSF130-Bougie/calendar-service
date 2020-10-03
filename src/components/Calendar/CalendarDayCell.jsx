import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayCell = styled.div`
  font-family: 'Airbnb Cereal App Book', sans-serif;
  display: flex;
  flex-flow: column;
  align-self: center;
  font-size: 14px;
  line-height: 18px;
  color: rgb(34, 34, 34);
`;

const Available = styled.div`
  font-family: 'Airbnb Cereal App Medium', sans-serif;
  display: flex;
  flex-flow: column;
  text-align: center;
  padding: 3px;
`;

const Unavailable = styled(DayCell)`
  color: rgb(176, 176, 176);
  text-decoration: line-through;
`;

const DateDisplay = styled.div`
  font-size: 14px;
  line-height: 18px;
`;

const PriceDisplay = styled.div`
  font-size: 10px;
  line-height: 12px;
  color: rgb(113, 113, 113);
`;

class CalendarDayCell extends React.PureComponent {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { dayInfo } = this.props;
    const dateDisplay = dayInfo.date ? new Date(dayInfo.date).getDate() : null;
    const priceDisplay = dayInfo.price ? dayInfo.price : null;

    return (
      <DayCell>
        {
          dayInfo.booked
            ? <Unavailable>{dateDisplay}</Unavailable>
            : (
              <Available>
                <DateDisplay>{dateDisplay}</DateDisplay>
                <PriceDisplay>${priceDisplay}</PriceDisplay>
              </Available>
            )
        }
      </DayCell>
    );
  }
}

export default CalendarDayCell;

CalendarDayCell.propTypes = {
  dayInfo: PropTypes.object,
};

CalendarDayCell.defaultProps = {
  dayInfo: {
    date: 0,
    price: 0,
    booked: false,
    minimumNights: 0,
  },
};

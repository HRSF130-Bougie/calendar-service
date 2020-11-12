import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarDayCell from '../../client/src/components/Calendar/CalendarItemDays'

describe('Calendar Item Days', () => {

  describe('When no check in date has been selected yet', () => {
    it(`if cell date is earlier than today's date`, () => {
      const wrapper = shallow(<CalendarDayCell
        dayInfo={{
          date: { year: 2020, month: 9, day: 1 },
          price: 0,
          booked: false,
          minimumNights: 0,
        }}
        weekendPricing={true}
        selectDate={() => { }}
        checkIn={null}
        checkOut={null}
        monthIndex={1}
        dayIndex={1}
        lastPossibleCheckOut={null}
      />)

      let instance = wrapper.instance()
      let testValue = instance.calcDayState()

      expect(testValue).toBe('beforeToday')
    })

    it(`if cell date is later than today's date`, () => {
      const wrapper = shallow(<CalendarDayCell
        dayInfo={{
          date: { year: 2020, month: 12, day: 1 },
          price: 0,
          booked: false,
          minimumNights: 0,
        }}
        weekendPricing={true}
        selectDate={() => { }}
        checkIn={null}
        checkOut={null}
        monthIndex={1}
        dayIndex={1}
        lastPossibleCheckOut={null}
      />)

      let instance = wrapper.instance()
      let testValue = instance.calcDayState()

      expect(testValue).not.toBe('beforeToday')
    })

    it(`if cell date is booked`, () => {
      const wrapper = shallow(<CalendarDayCell
        dayInfo={{
          date: { year: 2020, month: 11, day: 1 },
          price: 0,
          booked: true,
          minimumNights: 0,
        }}
        weekendPricing={true}
        selectDate={() => { }}
        checkIn={null}
        checkOut={null}
        monthIndex={1}
        dayIndex={1}
        lastPossibleCheckOut={new Date(2030, 12)}
      />)

      let instance = wrapper.instance()
      let testValue = instance.calcDayState()

      expect(testValue).toBe('booked')
    })
  })
})
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarDayCell from '../../client/src/components/Calendar/CalendarItemDays'

describe('<Calendar Item Days', () => {
  const wrapper = shallow(<CalendarDayCell
    dayInfo={{
      date: { year: 2020, month: 10, day: 1 },
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

  console.log('Can I see props? ', instance.props)

  //const today = new Date(2020, 10, 1)
  const thisCell = new Date(2020, 1, 1)

  describe('CalcDayState', () => {
    //wrapper.setProps({ dayInfo: { date: { year: 2020, month: 10, day: 1 } } });
    //wrapper.setState({ dayState: 'lalala' })
    wrapper.setProps({ dayInfo: { date: { year: 2020, month: 9, day: 1 } } })
    instance = wrapper.instance()

    console.log('new instance props ', instance.props)
    describe(`Where dayState should be set to beforeToday`, () => {
      it(`if cell date is earlier than today's date`, () => {
        let testValue = instance.calcDayState()
        expect(testValue).toBe('beforeToday')
      })





    })
  })



  // describe('calcDayState()', () => {
  //   it('should be true', () =< {
  //     expect(true).toBe.(true)
  //   })
  // })
})
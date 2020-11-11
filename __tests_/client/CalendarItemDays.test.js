import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarDayCell from '../../client/src/components/Calendar/CalendarItemDays'

describe('<Calendar Item Days', () => {
  const wrapper = mount(<CalendarDayCell />)
  const today = new Date(date.now())

  // describe('calcDayState()', () => {
  //   it('should be true', () =< {
  //     expect(true).toBe.(true)
  //   })
  // })
})
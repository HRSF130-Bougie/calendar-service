import React from 'react';
import { shallow, mount } from 'enzyme'


import WidgetHeader from '../../client/src/components/Widget/WidgetHeader.jsx';

describe('<WidgetHeader />', () => {
  const wrapper = mount(<WidgetHeader />)
  wrapper.setProps({ headerInfo: { lowestPrice: 236, rating: 4.89, reviews: 36 } })

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('allows us to set props', () => {
    expect(wrapper.prop('headerInfo')).toEqual({ lowestPrice: 236, rating: 4.89, reviews: 36 })
  })

  it('renders with the lowest price in the price ', () => {
    expect(wrapper.find('Price').text()).toBe(`$236`)
  })

  it('renders with the rating score in the rating div', () => {
    expect(wrapper.find('Score').text()).toBe(`4.89`)
  })

  it('renders with the ratings count in the ratings div', () => {
    expect(wrapper.find('Count').text()).toBe(`(36)`)
  })
})


import React from 'react';
import { mount, shallow } from 'enzyme';
import Widget from '../src/components/Widget/Widget';

const wrapper = mount(<Widget />); // mount/render/shallow when applicable

test('Widget exists', () => {
  expect(wrapper).toExist();
});

import React from 'react';
import { LoginDisplay } from './LoginDisplay';

describe('LoginDisplay', () => {
  let wrapper = shallow(<LoginDisplay login={jest.fn()} />);
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

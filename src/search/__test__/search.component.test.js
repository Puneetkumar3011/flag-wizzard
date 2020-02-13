import React from 'react';
import { mount } from 'enzyme';
import SearchComponent from '../search.component';
import Root from '../../store';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchComponent />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has an input text', () => {
  expect(wrapped.find('input').length).toEqual(1);
});

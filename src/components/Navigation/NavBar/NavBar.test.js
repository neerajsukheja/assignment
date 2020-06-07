import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './NavBar';
import {
    Navbar,
  } from 'react-bootstrap';
  
configure({
    adapter: new Adapter()
})

describe('Component <NavBar />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavBar />);
    })
    it('should render React Bootstrap <Navbar>', () => {
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });
});
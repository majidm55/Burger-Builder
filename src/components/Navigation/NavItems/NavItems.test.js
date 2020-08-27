import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavEl from './NavEl/NavEl';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <NavItems /> );
  });

  it('should render two <NavigationItem /> elements if not authenticated ', () => {
    expect(wrapper.find(NavEl)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated ', () => {
    // wrapper = shallow( <NavItems isAuthenticated /> );
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavEl)).toHaveLength(3);
  });

  it('should render logout <NavigationItem /> element if authenticated ', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains( <NavEl link="/logout">Logout</NavEl>)).toEqual(true);
  });
});

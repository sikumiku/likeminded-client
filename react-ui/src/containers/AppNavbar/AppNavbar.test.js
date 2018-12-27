import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppNavbar from "./AppNavbar";
import { DropdownToggle } from 'reactstrap';

configure({adapter: new Adapter()})

describe('<AppNavbar />', () => {
    it('should render name if customer is authenticated', () => {
        const wrapper = shallow(<AppNavbar/>);
        wrapper.setProps({isAuthenticated: true, currentUser: {username: "Max_Jones11"}});
        expect(wrapper.contains("Max_Jones11"));
    });

    it('should not render name if customer is authenticated', () => {
        const wrapper = shallow(<AppNavbar/>);
        wrapper.setProps({isAuthenticated: false, currentUser: {username: "Max_Jones11"}});
        !expect(wrapper.contains("Max_Jones11"));
    });
});

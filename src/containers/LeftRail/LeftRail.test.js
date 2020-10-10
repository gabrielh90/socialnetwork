import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import LeftRail from './LeftRail.js'
import Grid from '@material-ui/core/Grid'


configure({adapter : new Adapter()})

describe('Tests Left Rail Layout', () => {
    it('should render one grid container', () => {
        const wrapper = shallow(<LeftRail/>);
        expect(wrapper.find(Grid)).toHaveLength(2); 
    });
});
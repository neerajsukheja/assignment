import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Salad from './Salad';
import {
    Table,
} from 'react-bootstrap';

configure({
    adapter: new Adapter()
})

describe('Component <Salad />', () => {
    const defaultProps = {
        ingredients: {
            "cucumber": 1,
            "onion": 1,
            "carrots": 1,
            "mushroom": 1
        },
        ingredientsPrice: {
            "cucumber": 1,
            "onion": 2,
            "carrots": 3,
            "mushroom": 4
        },
    };

    const props = {
        showActionColumn: true,
    };

    let SaladComponent;

    beforeEach(() => {
        SaladComponent = shallow(<Salad {...defaultProps} />);
    })
    it('should render <Table>', () => {
        expect(SaladComponent.find(Table)).toHaveLength(1);
    });

    it('should render 5 <tr>', () => {
        expect(SaladComponent.find('tr').length).toEqual(5);
    });

    it('should render 4 column is showActionColumn props is set to false', () => {
        expect(SaladComponent.find('thead tr th').length).toEqual(4);
    });

    it('should render 5 column is showActionColumn props is set to true', () => {
        SaladComponent = shallow(<Salad {...defaultProps} {...props}/>);
        expect(SaladComponent.find('thead tr th').length).toEqual(5);
    });
});
import React from 'react';
import { Provider } from 'react-redux'
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Salad from '../../components/Salad/Salad';
import Ingredients from './Ingredients';
import {
    Button,
    Spinner
} from 'react-bootstrap';
const mockStore = configureMockStore([thunk]);

configure({
    adapter: new Adapter()
})

describe('Container <Ingredients />', () => {
    const initialState = {
        ingredients: null,
        ingredientsPrice: null,
        totalPrice: 0
    }
    const initialStore = mockStore(initialState);

    const updatedState = {
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
        totalPrice: 40
    };
    const updatedStore = mockStore(updatedState);

    it('should render <Salad> component and h3 tag', () => {
        const wrapper = mount(
            <Provider store={updatedStore}>
                <Ingredients />
            </Provider>
        )
        const saladWrapper = wrapper.find(Salad);
        expect(saladWrapper).toHaveLength(1);
        expect(saladWrapper.prop('ingredientAdded')).not.toBeNull();
        expect(saladWrapper.prop('ingredientRemoved')).not.toBeNull();
        expect(saladWrapper.prop('ingredients')).toBe(updatedState.ingredients);
        expect(saladWrapper.prop('ingredientsPrice')).toBe(updatedState.ingredientsPrice);
        expect(saladWrapper.prop('ingredientsPrice')).toBe(updatedState.ingredientsPrice);
        expect(saladWrapper.prop('showActionColumn')).toBe(true);

        expect(wrapper.find(Button)).not.toBeNull();
        expect(wrapper.find('h3').text()).toEqual('Total Amount : $40');
    })

    it('should render <Spinner> component', () => {
        const wrapper = mount(
            <Provider store={initialStore}>
                <Ingredients />
            </Provider>
        )
        expect(wrapper.find(Salad)).toHaveLength(0);
        expect(wrapper.find(Button)).toHaveLength(0);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    })
})
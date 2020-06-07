import React, { useEffect, useCallback } from 'react';
import {
    Button,
    Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

import * as actions from '../../store/actions/index';
import Salad from '../../components/Salad/Salad';

const Ingredients = (props) => {
    // React Redux Latest Hooks 
    const dispatch = useDispatch(); // Create Dispatcher
    // Get State from Store
    const ings = useSelector(state => {
        return state.ingredients;
    });
    const ingsPrice = useSelector(state => {
        return state.ingredientsPrice;
    });
    const totalPrice = useSelector(state => state.totalPrice);

    // Initially Load All Ingredients
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]
    );
    useEffect(() => {
        // Check if Ingredients Not Present than only initialise Ingredients.
        !ings && onInitIngredients();
    }, [onInitIngredients, ings]);

    // Call Action for Adding Ingredient
    const onIngredientAdded = ingName =>
        dispatch(actions.addIngredient(ingName));

    // Call Action for Removing Ingredient
    const onIngredientRemoved = ingName =>
        dispatch(actions.removeIngredient(ingName));

    /**
     * Function to Redirect To Checkout Page.
     */
    const redirectToCheckoutPageHandler = () => {
        props.history.push("/checkout");
    }

    // Check if Ingredients Loaded from Ajax else show spinner.
    let salad = <Spinner animation="border" />;
    if (ings) {
        salad = <Salad
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            ingredients={ings}
            ingredientsPrice={ingsPrice}
            showActionColumn
        />;
    }

    // Check if Total Price is more than 0, show checkout button.
    let checkoutButton = null;
    if (totalPrice) {
        checkoutButton = <Button
            onClick={() => redirectToCheckoutPageHandler()}
            className="mt-5"
            variant="success">
            <FontAwesomeIcon icon={faCreditCard} />  Checkout
            </Button>
    }
    return (
        <div className="text-center mt-5">
            {salad}
            <h3>Total Amount : ${totalPrice}</h3>
            {checkoutButton}
        </div>
    )
}

export default Ingredients;
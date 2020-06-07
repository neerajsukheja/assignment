import React, { Fragment } from 'react';
import {
    Button
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const redirectToIngredientsPageHandler = (props) => {
    props.history.push("/ingredients")
}

const Store = (props) => {
    return (
        <Fragment>
            <div className="text-center m-5">
                <h1>Greetings!!</h1>
                <h2>Welcome To Salad shop</h2>
                <Button
                    onClick={() => redirectToIngredientsPageHandler(props)}
                    className="m-5"
                    variant="success"><FontAwesomeIcon icon={faShoppingCart} /> Order Salad</Button>
            </div>
        </Fragment>
    )
}

export default Store;
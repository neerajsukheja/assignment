import React, { Fragment, useState } from 'react';
import {
    Button,
    Card,
    Form,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import CmeModal from '../../components/UI/Modal/Modal';
import Salad from '../../components/Salad/Salad';
import * as actions from '../../store/actions/index';

const Checkout = (props) => {
    // Set State
    const [modalShow, setModalShow] = useState(null);
    const [formName, setFormName] = useState(null);
    const [formEmail, setFormEmail] = useState(null);
    const [formNotes, setFormNotes] = useState(null);

    // Create Dispatcher.
    const dispatch = useDispatch(); 
    // Get State from Store.
    const ings = useSelector(state => {
        return state.ingredients;
    });
    const ingsPrice = useSelector(state => {
        return state.ingredientsPrice;
    });
    const totalPrice = useSelector(state => state.totalPrice);

    // Generate Form Variables.
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        // Storing form data in states as it's not sharing by multiple
        // components for now. 
        setFormName(data.orderDetailsName);
        setFormEmail(data.orderDetailsEmail);
        setFormNotes(data.orderDetailsNotes);
        setModalShow(true);
    }

    /**
     * Function to Redirect Back to Ingredients Page.
     */
    const redirectToIngredientsPageHandler = () => {
        props.history.goBack();
    }

    /**
     * Redirect to store page and Close Modal on Modal Close.
     */
    const hideModalHandler = () => {
        // Clear Store.
        dispatch(actions.completeOrder());
        // Close Modal Box.
        setModalShow(false);
        // Redirect to Store Page.
        props.history.push("/store");
    }

    // Check if Ingredients Loaded.
    let orderDetails = null;
    let saladTable = <h4>Add Ingredients First!!</h4>;
    if (ings) {
        saladTable = <Salad
            ingredients={ings}
            ingredientsPrice={ingsPrice}
        />;

        orderDetails = (
            <Card className="mt-5">
                <Card.Header>Order details form</Card.Header>
                <Card.Body>
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="orderDetailsName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                isInvalid={!!errors.orderDetailsName}
                                name="orderDetailsName"
                                type="text"
                                placeholder="Enter Name"
                                ref={register({
                                    required: "Name field is required.",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Only alphabet are allowed"
                                    }
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.orderDetailsName && errors.orderDetailsName.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="orderDetailsEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                isInvalid={!!errors.orderDetailsEmail}
                                name="orderDetailsEmail"
                                type="email"
                                placeholder="Enter email"
                                ref={register({
                                    required: "Email field is required.",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid email address."
                                    }
                                })}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.orderDetailsEmail && errors.orderDetailsEmail.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="orderDetailsNotes">
                            <Form.Label>Additional Notes</Form.Label>
                            <Form.Control name="orderDetailsNotes" ref={register} as="textarea" rows="3" />
                        </Form.Group>
                        <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faCreditCard} />  Order
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    // Generate Modal Data
    const model = {
        title: <div>Thank you<br />Delivery is on its way</div>,
        body: (
            <Fragment>
                <h5 className="text-info">Order Details:</h5>
                <p>Name : {formName}</p>
                <p>Email : {formEmail}</p>
                {formNotes && <p>Notes : {formNotes}</p>}
                {saladTable}
                <h6>Total Amount : ${totalPrice}</h6>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Card className="mt-5">
                <Card.Header>Current order description</Card.Header>
                <Card.Body>
                    {saladTable}
                    <Button variant="success" size="sm" onClick={() => redirectToIngredientsPageHandler()}><FontAwesomeIcon icon={faPlus} />  Continue Purchasing</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Total Price : ${totalPrice.toFixed(2)}</Card.Footer>
            </Card>
            {orderDetails}
            {modalShow && (
                <CmeModal
                    modal={model}
                    show={modalShow}
                    onHide={hideModalHandler}
                />
            )}
        </Fragment>
    )
}

export default Checkout;
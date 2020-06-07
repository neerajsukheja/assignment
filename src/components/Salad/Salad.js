import React from 'react';
import {
    Button,
    Table,
} from 'react-bootstrap';

/**
 * Generate table with Ingredients List.
 */
const Salad = props => {
    let transformedIngredients = props.ingredients && Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <tr key={igKey}>
                    <td className="text-capitalize">{igKey}</td>
                    <td>${props.ingredientsPrice && props.ingredientsPrice[igKey]}</td>
                    <td>{props.ingredients[igKey]}</td>
                    {props.showActionColumn ? (
                        <td>
                            {props.ingredients[igKey] ?
                                <Button
                                    onClick={() => props.ingredientRemoved(igKey)}
                                    className="mx-1"
                                    variant="danger"
                                    size="sm"
                                >Remove</Button> : null
                            }
                            <Button
                                onClick={() => props.ingredientAdded(igKey)}
                                className="mx-1"
                                variant="success"
                                size="sm">Add</Button>
                        </td>
                    ) : null}
                    <td>${(props.ingredientsPrice[igKey] * props.ingredients[igKey]).toFixed(2)}</td>
                </tr>
            );
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>Ingredients</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    {props.showActionColumn ? <th>Action</th> : null}
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {transformedIngredients}
            </tbody>
        </Table>
    );
}

export default Salad;
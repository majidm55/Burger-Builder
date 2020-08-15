import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const summary = Object.keys(props.ingredients)
  .map((igKey, i) => {
  return (
    <li key={igKey + i}>
    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
    </li>)
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {summary}
      </ul>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
      <Button clicked ={props.purchaseContinued} btnType = 'Success' >PROCEED</Button>

    </Aux>
  )
}

export default orderSummary;
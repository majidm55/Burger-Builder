import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render () {
    const summary = Object.keys(this.props.ingredients).map((igKey, i) => {
    return (
      <li key={igKey + i}>
      <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>)
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
          {summary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType='Danger'>CANCEL</Button>
        <Button clicked ={this.props.purchaseContinued} btnType = 'Success' >PROCEED</Button>
  
      </Aux>
    )

  }
}

export default OrderSummary;
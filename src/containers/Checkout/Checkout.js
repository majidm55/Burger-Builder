import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
  state = {
    ingredients : {
      salad: 1,
      meat: 1,
      cheese: 1,
      turkeyBacon: 1
    }
  }
  checkoutCancelHandler = () => {

  }

  checkoutContinueHandler = () => {

  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
        checkoutCancel={}
        checkoutContinue={}
        />
      </div>
    )
  }
}

export default Checkout;
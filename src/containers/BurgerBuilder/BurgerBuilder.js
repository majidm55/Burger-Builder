import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildContorls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  turkeyBacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients : {
      salad: 0,
      turkeyBacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 3,
    purchase: false,
    shouldOrder: false
  }

  updatePurchase (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      this.setState({purchase: sum > 0});
  }

  addIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchase(updatedIngredients);

  }

  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDedcuct = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDedcuct;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchase(updatedIngredients);

  }

  shouldOrderHandler = () => {
    this.setState({shouldOrder: true});
  }

  shouldCancelOrderHandler = () => {
    this.setState({shouldOrder: false});
  }

  shouldContinueHandler = () => {
    alert('You continue');
  }

  render () {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <=0
    }

    return (
      <Aux>
        <Modal 
        show={this.state.shouldOrder}
        modalClosed={this.shouldCancelOrderHandler}
        >
          <OrderSummary  
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.shouldCancelOrderHandler}
          purchaseContinued={this.shouldContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildContorls 
        ingredientAdd={this.addIngredient}
        ingredientRemove={this.removeIngredient}
        disabled={disableInfo}
        purchasable={this.state.purchase}
        ordered={this.shouldOrderHandler}
        price={this.state.totalPrice}
        />

      </Aux>
    );
  }
}

export default BurgerBuilder;
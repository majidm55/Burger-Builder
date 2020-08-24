import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildContorls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {
  state = {
    shouldOrder: false,
  }

  componentDidMount () {
    console.log("Burger builder component ", this.props);
    this.props.onInitIngredients();
  }

  updatePurchase (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      return sum > 0;
  }


  shouldOrderHandler = () => {
    this.setState({shouldOrder: true});
  }

  shouldCancelOrderHandler = () => {
    this.setState({shouldOrder: false});
    // this.props.history.push('/');

  }

  shouldContinueHandler = () => {
   this.props.history.push('/checkout');
  }
  

  render () {
    const disableInfo = {
      ...this.props.ings
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients Can't be loaded</p> : <Spinner />
    if ( this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildContorls 
          ingredientAdd={this.props.onIngAdded}
          ingredientRemove={this.props.onIngRemoved}
          disabled={disableInfo}
          purchasable={this.updatePurchase(this.props.ings)}
          ordered={this.shouldOrderHandler}
          price={this.props.price}/>
        </Aux>
        );
        orderSummary = <OrderSummary  
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.shouldCancelOrderHandler}
          purchaseContinued={this.shouldContinueHandler}/>;
    }
    if (this.state.loading) {
      orderSummary = < Spinner /> ;
    }
    return (
      <Aux>
        <Modal 
        show={this.state.shouldOrder}
        modalClosed={this.shouldCancelOrderHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
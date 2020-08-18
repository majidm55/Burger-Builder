import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildContorls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  turkeyBacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients : null,
    totalPrice: 3,
    purchase: false,
    shouldOrder: false,
    loading: false,
    error: false
  }
  componentDidMount () {
    axios.get('/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data});
    })
    .catch(error => {
      this.setState({error: true})
    });
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
    // this.props.history.push('/');

  }

  shouldContinueHandler = () => {
    // alert('You continue');
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'M.Majid',
    //     address: {
    //       street: 'Test Street',
    //       zip: '3456',
    //       country: 'USAYE'
    //     },
    //     email: 'soo@soo.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({loading: false, shouldOrder : false});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({loading: false, shouldOrder : false});

    //   });
    const query = [];
    for (let i in this.state.ingredients) {
      query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    query.push('price=' + this.state.totalPrice);
    const queryString = query.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search: '?' + queryString
    });
  }
  

  render () {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner />
    if ( this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildContorls 
          ingredientAdd={this.addIngredient}
          ingredientRemove={this.removeIngredient}
          disabled={disableInfo}
          purchasable={this.state.purchase}
          ordered={this.shouldOrderHandler}
          price={this.state.totalPrice}/>
        </Aux>
        );
        orderSummary = <OrderSummary  
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
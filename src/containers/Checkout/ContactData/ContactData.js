import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }, 
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
             {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
  }
  
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formKey in this.state.orderForm) {
      formData[formKey] = this.state.orderForm[formKey].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      OrderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);
    
  }

  inputChangedHandler = (event, inputId) => {
    const updatedFormEl = updateObject(this.state.orderForm[inputId],{
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
      touched: true
    });
    const updatedForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormEl
    })

    let formIsValid = true;
    for (let inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }
    this.setState({orderForm: updatedForm, formIsValid: formIsValid});
  }

  render () {
    const formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map(el => {
         return <Input 
          key={el.id}
          elementType={el.config.elementType} 
          elementConfig={el.config.elementConfig}
          value={el.config.value}
          invalid={!el.config.valid}
          shouldValidate={el.config.validation}
          touched={el.config.touched}
          changed={(event) => this.inputChangedHandler(event, el.id)} />
        })}   
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (OrderData, token) => dispatch(actions.purchaseBurger(OrderData, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      }, 
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
             {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }
  

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formKey in this.state.orderForm) {
      formData[formKey] = this.state.orderForm[formKey].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      OrderData: formData
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        this.props.history.push('/')
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});

      });
  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.orderForm
    }
    const updatedFormEl = {
      ...updatedForm[inputId]
    };
    updatedFormEl.value = event.target.value;
    updatedForm[inputId] = updatedFormEl;
    this.setState({orderForm: updatedForm});
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
          changed={(event) => this.inputChangedHandler(event, el.id)} />
        })}   
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;
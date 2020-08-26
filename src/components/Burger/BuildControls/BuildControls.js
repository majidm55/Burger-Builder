import React from 'react';
import classes from './BuildControls.css';
import BuildButtons from '../BuildControls/BuildButtons/BuildButtons';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Turkey-Bacon', type: 'turkeyBacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(el => (
      <BuildButtons 
      key={el.label} 
      label={el.label}
      added={() => props.ingredientAdd(el.type)}
      removed={() => props.ingredientRemove(el.type)}
      disabled={props.disabled[el.type]}

      />
    ))}
    <button 
    className={classes.OrderButton}
    disabled={!props.purchasable}
    onClick={props.ordered}
    >{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
  </div>
);


export default buildControls;
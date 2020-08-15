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
    {controls.map(el => (
      <BuildButtons key={el.label} label={el.label}/>
    ))
    }
  </div>
);


export default buildControls;
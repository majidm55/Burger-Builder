import React from 'react';
import classes from './NavItems.css';
import NavEl from './NavEl/NavEl';

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavEl link="/" active>Burger Builder</NavEl>
    <NavEl>Checkout</NavEl>
  </ul>
);

export default navItems;
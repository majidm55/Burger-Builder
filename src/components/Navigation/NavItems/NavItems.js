import React from 'react';
import classes from './NavItems.css';
import NavEl from './NavEl/NavEl';

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavEl link="/" exact>Burger Builder</NavEl>
    <NavEl link="/orders">Orders</NavEl>
  </ul>
);

export default navItems;
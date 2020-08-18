import React from 'react';
import  { NavLink } from 'react-router-dom';
import classes from './NavEl.css';

const navEl = (props) => (
    <li className={classes.NavEl}>
      <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>{props.children}
      </NavLink>
    </li>
);

export default navEl;
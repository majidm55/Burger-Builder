import React from 'react';
import classes from './NavEl.css';

const navEl = (props) => (
    <li 
    className={classes.NavEl}>
      <a 
      href={props.link}
      className={props.active ? classes.active : null}
      >{props.children}</a>
      </li>
);

export default navEl;
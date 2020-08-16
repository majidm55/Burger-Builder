import React from 'react'
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Menu from '../SideDrawer/Menu/Menu';


const toolbar = (props) => (
  <header className={classes.Toolbar}>
      <Menu clicked={props.menuClicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
    <nav className={classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
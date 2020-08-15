import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDarwer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  sideDrawerClosed = () => {
    this.setState({showSideDrawer: false})
  }
  render () {
    
    return (
    <Aux>
      <Toolbar />
      <SideDrawer  open={this.state.showSideDrawer} closed={this.sideDrawerClosed}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>
    );
  }
};

export default Layout;
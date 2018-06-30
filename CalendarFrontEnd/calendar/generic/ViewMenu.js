import React, { Component }  from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';

const options = [
  'Month',
  'Week',
  'Day'
];
class ViewMenu extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedView: 0,
      anchorElement: null
    };
  }
  handleMenuClick = event => {
    this.setState({ anchorElement: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorElement: null });
  };

  handleSelection = (event, index) => {
    let { changeView } = this.props;
    this.setState({selectedView: index, anchorElement: null});
    changeView(index);
  }

  render(){
    let { selectedView, anchorElement } = this.state;
    return (
      <div className="view-menu">
        <Button
          id = "nav-btn"
          size="medium"
          aria-owns={anchorElement ? 'menu' : null}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
        >
          {options[selectedView]}
          <ArrowIcon id="dropIcon"/>
        </Button>

        <Menu
          id="menu"
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedView}
            onClick={event => this.handleSelection(event, index)}
          >
            {option}
          </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

}

export default ViewMenu;

import React, { Component } from 'react'
import { Label, Icon, Menu } from 'semantic-ui-react'
import { Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Auth from '../auth';
export default class Sidebar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isNavOpen: false,
    }
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
    console.log(this.state.isNavOpen)
  }

  render() {

    return (
      <div fixed="top" style={{ paddingTop: '3.8em' }}>
      <Collapse id="sidebar" isOpen={this.state.isNavOpen} >
      
      <Menu vertical inverted className=' sidebar-menu dmx-color'>
        {Auth.isAuthenticated() && (
          <NavLink className='item' to="/new">
          <Label color='green'>+</Label>
          Request a delivery
        </NavLink>)} 
        {Auth.isAuthenticated() && (
          <NavLink className='item' to="/current">
            Active Orders
          </NavLink>
        )}
        {Auth.isAuthenticated() && (
          <NavLink className='item' to="/completed">
            Delivered Orders
          </NavLink>)}
        {Auth.isAuthenticated() && (
          <NavLink className='item' to="/all">
            All My Orders
          </NavLink>
        )}
        {Auth.isAuthenticated() && (
          <NavLink className='item' to="/profile">
            <Icon name="user circle" />
            My Profile
          </NavLink>
        )}
        {/* <Menu.Item name='payment' active={activeItem === 'payment'} onClick={this.handleItemClick}>
          <Icon name="money" />
          Payment
        </Menu.Item>
        <Menu.Item name='quote' active={activeItem === 'quote'} onClick={this.handleItemClick}>
          <Icon name="calculator" />
          Get Quote
        </Menu.Item> */}
      </Menu>
      
      </Collapse>
       <Icon id="mobile-menu" name="bars" size="big" onClick={this.toggleNav} />
      
      </div>
    )
  }
}
import React, { Component } from 'react'
import { Label, Icon, Menu } from 'semantic-ui-react'
import { Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isNavOpen: false,
      activeItem: 'inbox',
    }
    this.toggleNav = this.toggleNav.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
    console.log(this.state.isNavOpen)
  }


  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  } 

  render() {
    const { activeItem } = this.state

    return (
      <div fixed="top" style={{ paddingTop: '3.8em' }}>
      <Collapse id="sidebar" isOpen={this.state.isNavOpen} >
      
      <Menu vertical inverted className=' sidebar-menu dmx-color'>
      <NavLink to="/new">
        <Menu.Item name='new' active={activeItem === 'new'} onClick={this.handleItemClick}>
          <Label color='green'>+</Label>
          Request a delivery
        </Menu.Item>
        </NavLink>
        <NavLink to="/current">
        <Menu.Item name='active' active={activeItem === 'active'} onClick={this.handleItemClick}>
          <Label color="blue">3</Label>
          
          Active Orders
          
        </Menu.Item>
        </NavLink>
        <NavLink to="/completed">
        <Menu.Item name='delivered' active={activeItem === 'delivered'} onClick={this.handleItemClick}>
          <Label color="olive">22</Label>
          
          Delivered Orders
          
        </Menu.Item>
        </NavLink>
        <NavLink to="/">
        <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
          <Label color="black">24</Label>
          
          All My Orders
          
        </Menu.Item>
        </NavLink>
        <NavLink to="/profile">
        <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
          <Icon name="user circle" />
          
          My Profile
          
        </Menu.Item>
        </NavLink>
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
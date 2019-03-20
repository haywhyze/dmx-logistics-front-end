import React, { Component } from 'react'
import { Menu, Statistic, Container, Icon, Image, Dropdown, Item } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

const trigger = (
  <span>
    <Icon name='user' /> Hello, Bob
  </span>
)

const options = [
  {
    key: 'user',
    text: (
      <span>
        Signed in as <strong>Bob Smith</strong>
      </span>
    ),
    disabled: true,
  },
  { key: 'profile', text: ( <Item as="a" href="/profile" style={{color: 'black', padding: 0}}>My Profile</Item>) },
  { key: 'number', text: '08031961496', disabled: true },
  { key: 'sign-out', text: 'Sign Out' },
]

export default class Header extends Component {
  
  render() {

    return (
      <>
        <Menu fixed='top' inverted>
          <Container>
            <NavLink to="/">
              <Menu.Item header>
                <Image size='tiny' src='./dmx-logo.jpg' style={{ marginRight: '1em' }} />
              </Menu.Item>
            </NavLink>
            <Menu.Item>
              <Statistic size="mini" inverted color='red'>
                <Statistic.Value className="dmx-color">27</Statistic.Value>
                <Statistic.Label>Account Balance</Statistic.Label>
              </Statistic>
            </Menu.Item>
            <Menu.Menu position="right">
              <Dropdown item simple icon="info" >
                <Dropdown.Menu>
                  <Dropdown.Item>FAQ</Dropdown.Item>
                  <Dropdown.Item>How to Pay</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Call Us Now</Dropdown.Header>
                  <Dropdown.Item>+234(803)1961496</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown item trigger={trigger} options={options}/>
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    )
  }
}
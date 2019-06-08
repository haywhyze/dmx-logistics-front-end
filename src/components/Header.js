import React, { Component } from 'react'
import { Menu, Container, Icon, Image, Dropdown, Item, Button } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom';
import Auth from '../auth';

export default class Header extends Component {
  
 trigger = (
    <span>
      <Icon name='user' /> Hello, {this.props.user.firstName}
    </span>
  )
  
 options = [
    {
      key: 'user',
      text: (
        <span>
          Call us on <strong>08091234567</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'profile', text: ( <Link as="a" to="/profile" style={{color: 'black', padding: 0}}>My Profile</Link>) },
    { key: 'faq', text: ( <Link as="a" to="/faq" style={{color: 'black', padding: 0}}>FAQ</Link>) },
    { key: 'how-to-pay', text: ( <Link as="a" to="/how-to-pay" style={{color: 'black', padding: 0}}>How to Pay</Link>) },
    { key: 'contact', text: ( <Link as="a" to="/contact" style={{color: 'black', padding: 0}}>Contact Us</Link>) },
    { key: 'number', text: this.props.user.phoneNumber, disabled: true },
    { key: 'sign-out', text: (<Item as='a' style={{color: 'black', padding: 0}} onClick={() => Auth.signout(() => this.props.history.push('/login'))}>Sign Out</Item>) },
  ]
  
  render() {
    return (
      <>
        <Menu fixed='top' inverted>
          <Container fluid>
            <NavLink to="/">
              <Menu.Item header>
                <Image size='tiny' src='https://dmx-backend.herokuapp.com/dmx-logo.jpg' style={{ marginRight: '1em' }} />
              </Menu.Item>
            </NavLink>
            
            <Menu.Menu position="right">
            { Auth.isAuthenticated() ? 
              (
                <Dropdown item trigger={this.trigger} options={this.options}/>
              )
              : (
                <>
                  {
                    this.props.location.pathname === '/login' &&
                    (<Menu.Item >
                      <Link to="/register"> <Button color="green">Sign up</Button></Link>
                    </Menu.Item>)
                  }
                  {
                    this.props.location.pathname === '/register' &&
                    (
                      <Menu.Item>
                        <Link to="/login"> <Button>Log-in</Button> </Link>
                      </Menu.Item>
                    )
                  }
                </>
              )
            }
            </Menu.Menu>
          </Container>
        </Menu>
      </>
    )
  }
}
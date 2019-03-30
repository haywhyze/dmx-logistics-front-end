import React from 'react'
import { Icon, Button, Input, Form, Grid, Card, Header } from 'semantic-ui-react'

class Profile extends React.Component {
  
  render() {
    console.log(this.props)
    return  (
      <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
        <Header as='h3' dividing>
        My Profile
        </Header>
        <Grid stackable columns={3}>
          <Grid.Column textAlign='center' width={8}>
            <Card
            fluid >
              <Card.Content header='Rick Sanchez' />
              <Card.Content meta={(<span><Icon name='phone' /> 08031961496</span>)} />
              <Card.Content description={(<><Icon name='map marker alternate' /> Oshodi/Isolo, Lagos, Nigeria</>)} />
            </Card>
          </Grid.Column>
        </Grid>
        <Header as='h3' dividing>
        Update Profile
        </Header>
        <Form>
        <Form.Group widths='equal'>
          <Form.Field
            name='firstName'
            control={Input}
            label='First name'
            placeholder='First name'
          />
          <Form.Field
            name='lastName'
            control={Input}
            label='Last name'
            placeholder='Last name'
          />
          <Form.Field
            name='phoneNumber'
            control={Input}
            label='Phone Number'
            placeholder='Phone Number'
          />
        </Form.Group>
        <Form.Field
          id='address'
          control={Input}
          label='Default Address'
          placeholder='Default Address'
        />
        
        <Button className="dmx-color">
            Save Profile
        </Button>
      </Form>
        <Header as='h3' dividing>
          Change Password
        </Header>
        <Form style={{ marginBottom: '2em',}}>
          <Form.Group widths='equal'>
            <Form.Input
              name='oldPassword'
              type='password'
              label='Old Password'
              placeholder='Old Password'
            />
            <Form.Input
              name='newPassword'
              type='password'
              label='New Password'
              placeholder='New Password'
            />
            <Form.Input
              name='confirmPassword'
              type='password'
              label='Confirm New Password'
              placeholder='confirm new password'
            />
            
          </Form.Group>
          <Button className="dmx-color">
              Change Password
            </Button>
        </Form>
      </div>
    )
   }
} 

export default Profile
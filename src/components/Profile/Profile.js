import React from 'react';
import { Header, Button, Message, Grid, Card, Icon } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Script from "react-load-script";
import jwtDecode from 'jwt-decode';

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/
const valSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name cannot be less than 2 characters')
    .max(50, 'First name provided is too long. Please provide in the range of 2 - 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name cannot be less than 2 characters')
    .max(50, 'Last name provided is too long. Please provide in the range of 2 - 50 characters')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .required('Phone Number is Required')
    .matches(phoneRegExp, 'Please provide a valid phone number'),
  address: Yup.string()
    .max(280, 'Address provided too long')
})

let errorMess;
let successMess;
class Profile extends React.Component {

  state = {
    address: this.props.user.address
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const google = window.google
    var options = {
      types: ["geocode", "establishment"],
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(6.5244, 3.3792),
        new google.maps.LatLng(9.0765, 7.3986)
      ),
      fields: ["address_components", "formatted_address", "name", "geometry"]
    };
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("address"),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    var place = this.autocomplete.getPlace();
    // Set State
      this.setState({
        address: `${place.formatted_address}`
      })
  };

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value 
    })
}

  
  render() {
    
    return  (
      <div className='main' style={{ width: '60%', display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
        <Header as='h3' dividing>
        My Profile
        </Header>
        <Grid stackable columns={3}>
          <Grid.Column textAlign='center' width={8}>
            <Card
            fluid >
              <Card.Content header={`${this.props.user.firstName} ${this.props.user.lastName}`} />
              <Card.Content meta={(<span><Icon name='phone' /> {this.props.user.phoneNumber}</span>)} />
              <Card.Content description={(<><Icon name='map marker alternate' />{this.props.user.address}</>)} />
            </Card>
          </Grid.Column>
        </Grid>
        <Header as='h3' dividing>
        Update Profile
        </Header>
        <Formik
          initialValues={{
            firstName: this.props.user.firstName || '',
            lastName: this.props.user.lastName || '',
            phoneNumber: this.props.user.phoneNumber || '',
          }}
          onSubmit={
            (values, actions) => {
              const token = localStorage.token;
              let decoded, userId;
              if (token) decoded = jwtDecode(token);
              if (decoded) userId = decoded.userId;
              const { address } = this.state
              axios({
                method: 'put',
                url: `https://dmx-backend.herokuapp.com/api/v1/users/${userId}/profile`,
                data: {
                  ...values,
                  address
                },
                headers: {'auth-token': token},
              }).then(response => {
                successMess = 'Profile Updated successfully';
                console.log(successMess);
                this.props.updateState({
                  user: response.data.data,
                })
                
              })
              .catch(error => {
                console.log(error)
                errorMess = error.response.data
              })
              .then(() => actions.setSubmitting(false))
            }
          }
          validationSchema={() => valSchema}
        >
        {
          ({ errors, touched, isSubmitting }) => {
            return (
              <>
              <Script
                  url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places"
                  onLoad={this.handleScriptLoad}
                />
              <Form
              className=
              { errorMess ? 
                "ui form new error" : 
                successMess ? 
                "ui form new success" :
                "ui form new" 
              }>
              <div className="equal width fields">
            <div className={ errors.firstName && touched.firstName ? "field error" : "field" }>
                <label>First Name
                  <Field type="text" name="firstName" placeholder="Olawale" />
                  <ErrorMessage name="firstName" component="div" />
                </label>
              </div>
              <div className={ errors.lastName && touched.lastName ? "field error" : "field" }>
                <label>Last Name
                  <Field type="text" name="lastName" placeholder="Chinedu" />
                  <ErrorMessage name="lastName" component="div" />
                </label>
              </div>
              <div className={ errors.phoneNumber && touched.phoneNumber ? "field error" : "field" }>
                <label>Phone Number
                  <Field type="text" name="phoneNumber" placeholder="08031234567/+234708123456" />
                  <ErrorMessage name="phoneNumber" component="div" />
                </label>
              </div>
              </div>
              <div className={ errors.address && touched.address ? "field error" : "field" }>
                <label>Address
                  <Field 
                    value={ this.state.address} 
                    id="address" 
                    name="address" 
                    onChange={this.handleChange('address')}
                    placeholder="Your preffered address for pick up or delivery" />
                </label>
              </div>
              <div style={{marginBottom: '1em'}}>
                {errorMess && (
                  <Message
                  error
                  header='Action Forbidden'
                  content={errorMess.error}
                />
                )}
                {successMess && (
                  <Message
                  success
                  header={successMess}
                />
                )}
              </div>
              <Button loading={isSubmitting} className="dmx-color">
                  Save Profile
              </Button>
              </Form></>
            )
          }
        }
{/*        
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
            </Button> */}
        </Formik>
      </div>
    )
   }
} 

export default Profile
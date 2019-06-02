/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Script from "react-load-script";
// import googleMaps from '@google/maps';

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/
const valSchema = Yup.object().shape({
  senderName: Yup.string()
    .min(2, 'Sender\'s Name too Short!')
    .max(50, 'Sender\'s Name too Long!')
    .required('Sender\'s Name is Required'),
  senderPhone: Yup.string()
    .required('Sender\'s Phone Number is Required')
    .matches(phoneRegExp, 'Please provide a valid phone number'),
  senderEmail: Yup.string()
    .required('Sender\'s Email is Required')
    .email('Please provide a valid email address'),
  senderAddress: Yup.string()
    .max(280, 'Address provided too long')
});

class SenderDetails extends Component{

  saveAndContinue = values => {
    !this.props.values.senderCountry && this.handlePlaceSelect();
    this.props.updateState(values)
    this.props.nextStep()
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = {
      types: ["geocode", "establishment"],
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(6.5244, 3.3792),
        new google.maps.LatLng(9.0765, 7.3986)
      ),
      fields: ["address_components", "formatted_address", "geometry", "name"]
    };
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("senderAddress"),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    var place = this.autocomplete.getPlace();
    if (!place) {
      let geocoder = new google.maps.Geocoder();
      let address = document.getElementById("senderAddress").value;

      geocoder.geocode({
        'address': address
      }, (result, status) => {
        if (status === 'OK') {
          place = result[0]
          const country = place.address_components.find(e => e.types[0] === 'country');
          const state = place.address_components.find(e => e.types[0] === 'administrative_area_level_1');
          this.props.updateState({
            senderState: state['long_name'],
            senderCountry: country['long_name'],
            senderAddress: address,
            srcData: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }
        })
          
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      })
      console.log()
      return null;
    }
    
    var country = place.address_components.find(function(element) {
      return element.types[0] === "country";
    });
    var state = place.address_components.find(function(element) {
      return element.types[0] === "administrative_area_level_1";
    });

    // Check if address is valid
    if (country && state) {
      // Set State
      this.props.updateState({
        senderState: state['long_name'],
        senderCountry: country['long_name'],
        senderAddress: `${place.formatted_address}`,
        srcData: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      })
    }
  };

  render(){
    return(
      <div>  
        <Header as='h3' dividing>
        Sender's Details </Header>
        <Formik 
        initialValues={{
          senderName:  this.props.values.senderName || `${this.props.user.firstName} ${this.props.user.lastName}` || '',
          senderPhone: this.props.values.senderPhone || this.props.user.phoneNumber || '',
          senderEmail: this.props.values.senderEmail || this.props.user.email || '',
        }}
        onSubmit={
          values => {
            this.saveAndContinue(values)
          }
        }
        validationSchema={() => valSchema}
        >
        {({ errors, touched }) => {
            return ( <Form className="ui form new">
            <Script
                  url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places,geometry"
                  onLoad={this.handleScriptLoad}
                />
              <div className={ errors.senderName && touched.senderName ? "field error" : "field" }>
                <label>Sender's Name
                  <Field type="text" name="senderName" placeholder="Olawale Chinedu" />
                  <ErrorMessage name="senderName" component="div" />
                </label>
              </div>
              <div className={ errors.senderPhone && touched.senderPhone ? "field error" : "field" }>
                <label>Sender's Phone
                  <Field type="text" name="senderPhone" placeholder="08031234567/+234708123456" />
                  <ErrorMessage name="senderPhone" component="div" />
                </label>
              </div>
              <div className={ errors.senderEmail && touched.senderEmail ? "field error" : "field" }>
                <label>Sender's Email
                  <Field type="email" name="senderEmail" placeholder='abc@xyz.com' />
                  <ErrorMessage name="senderEmail" component="div" />
                </label>
              </div>
              <div className={ errors.senderAddress && touched.senderAddress ? "field error" : "field" }>
                <label>Sender's Address
                  <Field 
                    value={this.props.values.senderAddress} 
                    id="senderAddress" 
                    type="text" 
                    name="senderAddress" 
                    onChange={this.props.handleChange('senderAddress')}
                    placeholder="Sender's Address" />
                </label>
              </div>
              <Button type="submit" className="dmx-color" style={ { display: 'block' } }>Save And Continue</Button>
            </Form> );
          }}
        </Formik>
      </div>
    )
  }
}

export default SenderDetails;
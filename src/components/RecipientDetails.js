/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Script from "react-load-script";

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/
const valSchema = Yup.object().shape({
  recipientName: Yup.string()
    .min(2, 'Recipient\'s Name too Short!')
    .max(50, 'Recipient\'s Name too Long!')
    .required('Recipient\'s Name is Required'),
  recipientPhone: Yup.string()
    .required('Recipient\'s Phone Number is Required')
    .matches(phoneRegExp, 'Please provide a valid phone number'),
  recipientEmail: Yup.string()
    .email('Please provide a valid email address'),
  recipientAddress: Yup.string()
    .max(280, 'Address provided too long')
});

class RecipientDetails extends Component{

  saveAndContinue = values => {
    this.props.updateState(values)
    this.props.nextStep()
  }

  back  = (e) => {
    e.preventDefault();
    this.props.prevStep();
}

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = {
      types: ["geocode", "establishment"],
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(6.5244, 3.3792),
        new google.maps.LatLng(9.0765, 7.3986)
      ),
      fields: ["address_components", "formatted_address", "name"]
    };
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("recipientAddress"),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    // Extract City From Address Object
    var place = this.autocomplete.getPlace();
    if (place) var country = place.address_components.find(function(element) {
      return element.types[0] === "country";
    });
    if (place) var state = place.address_components.find(function(element) {
      return element.types[0] === "administrative_area_level_1";
    });
    // Check if address is valid
    if (country && state) {
      // Set State
      this.props.updateState({
        recipientState: state['long_name'],
        recipientCountry: country['long_name'],
        recipientAddress: `${place.name}`
      })
    }
  };

  render(){
    return(
      <div>  
        <Header as='h3' dividing>
        Recipient's Details </Header>
        <Formik 
        initialValues={{
          recipientName:  this.props.values.recipientName || '',
          recipientPhone: this.props.values.recipientPhone || '',
          recipientEmail: this.props.values.recipientEmail || '',
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
                  url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFjD-GUhv7z3uj8KjNM91c2q0ivWnecg&libraries=places"
                  onLoad={this.handleScriptLoad}
                />
              <div className={ errors.recipientName && touched.recipientName ? "field error" : "field" }>
                <label>Recipient's Name
                  <Field type="text" name="recipientName" placeholder="Olawale Chinedu" />
                  <ErrorMessage name="recipientName" component="div" />
                </label>
              </div>
              <div className={ errors.recipientPhone && touched.recipientPhone ? "field error" : "field" }>
                <label>Recipient's Phone
                  <Field type="text" name="recipientPhone" placeholder="08031234567/+234708123456" />
                  <ErrorMessage name="recipientPhone" component="div" />
                </label>
              </div>
              <div className={ errors.recipientEmail && touched.recipientEmail ? "field error" : "field" }>
                <label>Recipient's Email
                  <Field type="email" name="recipientEmail" placeholder='abc@xyz.com' />
                  <ErrorMessage name="recipientEmail" component="div" />
                </label>
              </div>
              <div className={ errors.recipientAddress && touched.recipientAddress ? "field error" : "field" }>
                <label>Recipient's Address
                  <Field 
                    value={this.props.values.recipientAddress} 
                    id="recipientAddress" 
                    type="text" 
                    name="recipientAddress" 
                    onChange={this.props.handleChange('recipientAddress')}
                    placeholder="recipient's Address" />
                </label>
              </div>
              <Button type="button" secondary onClick={this.back}>Back</Button>
              <Button type="submit" className="dmx-color">Save And Continue</Button>
            </Form> );
          }}
        </Formik>
      </div>
    )
  }
}

export default RecipientDetails;
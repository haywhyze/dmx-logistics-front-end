import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const valSchema = Yup.object().shape({
    itemDescription: Yup.string()
        .min(3,'Item description is too short')
        .max(140, 'Item description is too long')
        .required('A short description of the package is required'),
    paymentStatus: Yup.string()
        .required('The method of payment is required'),
    weight: Yup.number()
        .min(1, 'The package weight can not be less than 1 kg')
        .max(10, 'The package weight can not be more than 10 kg')
        .required('The package weight is required'),
    extraInfo: Yup.string()
        .max(250, 'extra information is too long')
})
class OrderDetails extends Component{

  saveAndContinue = values => {
    this.props.updateState(values)
    this.props.nextStep()
  }

  back  = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  render(){
    return(
      <div>
        <Header as='h3' dividing> Package Details </Header>
        <Formik 
          initialValues={{
            itemDescription:  this.props.values.itemDescription || '',
            weight: this.props.values.weight || '',
            extraInfo: this.props.values.extraInfo || '',
            paymentStatus: this.props.paymentStatus || 'pay on pickup',
          }}
          onSubmit={
            values => {
                this.saveAndContinue(values)
            }
          }
          validationSchema={() => valSchema}
          >
          {({ errors, touched }) => {
            return (
              <Form className="ui form new">
                <div className={ errors.itemDescription && touched.itemDescription ? "field error" : "field" }>
                  <label> Item Description
                    <Field 
                      name="itemDescription" 
                      placeholder="A short description of the package"
                     />
                    <ErrorMessage name="itemDescription" component="div" /> 
                  </label>
                </div>
                <div className={ errors.weight && touched.weight ? "field error" : "field" }>
                  <label> Weight (kg)
                    <Field 
                      name="weight" 
                      type="number"
                     />
                    <ErrorMessage name="weight" component="div" /> 
                  </label>
                </div>
                <div className={ errors.extraInfo && touched.extraInfo ? "field error" : "field" }>
                  <label> Extra Information
                    <Field 
                      name="extraInfo" 
                      placeholder="e.g Please handle the package with extreme care"
                     />
                    <ErrorMessage name="extraInfo" component="div" /> 
                  </label>
                </div>
                <div className= "field">
                  <label> Payment Method
                    <Field 
                      name="paymentStatus"
                      component="select"
                     >
                      <option value="pay on delivery">Pay on Delivery</option>
                      <option value="bank transfer">Bank Transfer</option>
                      <option value="pay on pickup">Pay on Pickup</option>
                      <option value="credit/debit card">Credit/Debit Card</option>
                      <option value="wallet">Wallet</option>
                     </Field>
                    <ErrorMessage name="extraInfo" component="div" /> 
                  </label>
                </div>
                <Button type="button" secondary onClick={this.back}>Back</Button>
                <Button type="submit" className="dmx-color">Save And Continue</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    )
  }
}

export default OrderDetails;

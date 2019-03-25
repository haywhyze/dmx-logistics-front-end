import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/
const valSchema = Yup.object().shape({
  senderName: Yup.string()
    .min(2, 'Sender\'s Name too Short!')
    .max(50, 'Sender\'s Name too Long!')
    .required('Sender\'s Name is Required'),
  senderPhone: Yup.string()
    .required('Sender\'s Phone Number is Required')
    .matches(phoneRegExp, 'Please provide a valid phone number')
});

class SenderDetails extends Component{

  saveAndContinue = values => {
    this.props.updateState(values)
    console.log(values)
    this.props.nextStep()
  }

  render(){
    return(
      <div>  
        <Header as='h3' dividing>
        Sender Details </Header>
        <Formik 
        initialValues={{
          senderName: '',
          senderPhone: '',
          senderEmail: '',
          senderAddress: '',
        }}
        onSubmit={
          (values, { setSubmitting }) => {
            this.saveAndContinue(values)
          }
        }
        validationSchema={() => valSchema}
        >
        {({ errors, touched, isSubmitting }) => (
          <Form className="ui form new">
            <div className={errors.senderName && touched.senderName ? "field error" : "field"}>
              <label>Sender's Name
                <Field 
                  type="text" 
                  name="senderName" 
                  placeholder="Olawale Chinedu"
                />
                <ErrorMessage name="senderName" component="div" />
              </label>
            </div>
            <div className={errors.senderPhone && touched.senderPhone ? "field error" : "field"}>
              <label>Sender Phone
                <Field 
                  type="text" 
                  name="senderPhone" 
                  placeholder="08031234567/+234708123456"
                />
                <ErrorMessage name="senderPhone" component="div" />
              </label>
            </div>
            <div className="field">
              <label>Sender Email
                <Field 
                  type="email" 
                  name="senderEmail" 
                  placeholder='abc@xyz.com'
                />
              </label>
            </div>
            <div className="field">
              <label>Sender's Address
                <Field 
                  type="text" 
                  name="senderAddress" 
                  placeholder="Sender's Address"
                />
              </label>
            </div>
            <Button style={{display:'block'}}>Save And Continue </Button>
          </Form>
        )}
        </Formik>
      </div>
    )
  }
}

export default SenderDetails;
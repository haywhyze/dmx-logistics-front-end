/* eslint-disable no-undef */
import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import SenderReceiverForm from "./SenderReceiverForm";

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/;
const valSchema = Yup.object().shape({
  recipientName: Yup.string()
    .min(2, "Recipient's Name too Short!")
    .max(50, "Recipient's Name too Long!")
    .required("Recipient's Name is Required"),
  recipientPhone: Yup.string()
    .required("Recipient's Phone Number is Required")
    .matches(phoneRegExp, "Please provide a valid phone number"),
  recipientEmail: Yup.string().email("Please provide a valid email address"),
  recipientAddress: Yup.string().max(280, "Address provided too long")
});

class RecipientDetails extends Component {
  
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            recipientName: this.props.values.recipientName || "",
            recipientPhone: this.props.values.recipientPhone || "",
            recipientEmail: this.props.values.recipientEmail || "",
          }}
          onSubmit={values => {
            this.props.saveAndContinue(values);
          }}
          validationSchema={() => valSchema}
        >
          {({ errors, touched }) => {
            return (
              <SenderReceiverForm
                errors={errors}
                touched={touched}
                values={this.props.values}
                handleChange={this.props.handleChange}
                handleScriptLoad={this.props.handleScriptLoad}
                back={this.props.back}
                sender={false}
              />
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default RecipientDetails;

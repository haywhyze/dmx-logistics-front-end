/* eslint-disable no-undef */
import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import SenderReceiverForm from "./SenderReceiverForm";

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/;
const valSchema = Yup.object().shape({
  senderName: Yup.string()
    .min(2, "Sender's Name too Short!")
    .max(50, "Sender's Name too Long!")
    .required("Sender's Name is Required"),
  senderPhone: Yup.string()
    .required("Sender's Phone Number is Required")
    .matches(phoneRegExp, "Please provide a valid phone number"),
  senderEmail: Yup.string()
    .required("Sender's Email is Required")
    .email("Please provide a valid email address"),
  senderAddress: Yup.string().max(280, "Address provided too long")
});

class SenderDetails extends Component {

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            senderName: this.props.values.senderName || "",
            senderPhone: this.props.values.senderPhone || "",
            senderEmail: this.props.values.senderEmail || "",
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
                sender={true}
              />
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default SenderDetails;

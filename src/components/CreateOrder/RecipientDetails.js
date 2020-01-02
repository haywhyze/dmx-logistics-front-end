/* eslint-disable no-undef */
import React from "react";
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

export default ({
  data,
  saveAndContinue,
  handleChange,
  handleScriptLoad,
  back
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          recipientName: "",
          recipientPhone: "",
          recipientEmail: ""
        }}
        onSubmit={values => {
          saveAndContinue(values);
        }}
        validationSchema={() => valSchema}
      >
        {({ errors, touched }) => {
          return (
            <SenderReceiverForm
              errors={errors}
              touched={touched}
              data={data}
              handleChange={handleChange}
              handleScriptLoad={handleScriptLoad}
              back={back}
              sender={false}
            />
          );
        }}
      </Formik>
    </div>
  );
};

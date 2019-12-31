/* eslint-disable no-undef */
import React from "react";
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

export default ({
  values,
  saveAndContinue,
  handleChange,
  handleScriptLoad,
  back
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          senderName: values.senderName || "",
          senderPhone: values.senderPhone || "",
          senderEmail: values.senderEmail || ""
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
              values={values}
              handleChange={handleChange}
              handleScriptLoad={handleScriptLoad}
              back={back}
              sender={true}
            />
          );
        }}
      </Formik>
    </div>
  );
};

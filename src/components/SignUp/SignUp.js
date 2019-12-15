import React, { useState } from "react";
import { Header, Button, Message } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import baseUrl from "../../api/baseUrl";

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/;
const valSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name cannot be less than 2 characters")
    .max(
      50,
      "First name provided is too long. Please provide in the range of 2 - 50 characters"
    )
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name cannot be less than 2 characters")
    .max(
      50,
      "Last name provided is too long. Please provide in the range of 2 - 50 characters"
    )
    .required("Last name is required"),
  email: Yup.string()
    .required("Email address is required to register")
    .email("Please provide a valid email address"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(phoneRegExp, "Please provide a valid phone number"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(64, "Password too long!"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  businessName: Yup.string()
    .min(2, "Business name cannot be less than 2 characters")
    .max(
      50,
      "First name provided is too long. Please provide in the range of 2 - 50 characters"
    )
});
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

function SignUp(props) {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  let errorMess;
  let successMess;

  let { from } = props.location.state || { from: { pathname: "/all" } };

  if (redirectToReferrer) {
    return (
      <Redirect
        to={{
          pathname: from.pathname,
          state: { message: "Registered successfully" }
        }}
      />
    );
  }
  return (
    <div
      className="main"
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-2em"
      }}
    >
      <div>
        <Header as="h2" textAlign="center" dividing>
          Register{" "}
        </Header>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            businessName: "",
            userRole: "personal"
          }}
          onSubmit={(values, actions) => {
            axios
              .post(`${baseUrl}/api/v1/auth/signup`, values)
              .then(response => {
                errorMess = undefined;
                localStorage.setItem("dmx_logistics_token", response.data.token);
                setRedirectToReferrer(true);
              })
              .catch(error => {
                console.log(error);
                errorMess = error.response.data;
              })
              .then(() => actions.setSubmitting(false));
          }}
          validationSchema={() => valSchema}
        >
          {({ errors, touched, values, isSubmitting }) => {
            return (
              <Form
                className={
                  errorMess
                    ? "ui form new error"
                    : successMess
                    ? "ui form new success"
                    : "ui form new"
                }
              >
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{ marginTop: "0" }}
                    className="ui compact segment black"
                  >
                    <div className="ui toggle checkbox">
                      <Field
                        component={RadioButton}
                        name="userRole"
                        id="business"
                        label="Business"
                      />
                    </div>
                  </div>
                  <div
                    style={{ marginTop: "0" }}
                    className="ui compact segment black"
                  >
                    <div className="ui toggle checkbox">
                      <Field
                        component={RadioButton}
                        name="userRole"
                        id="personal"
                        label="Personal"
                      />
                    </div>
                  </div>
                </div>
                <div className="two fields">
                  <div
                    className={
                      errors.firstName && touched.firstName
                        ? "field error"
                        : "field"
                    }
                  >
                    <label>
                      First Name
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Olawale"
                      />
                      <ErrorMessage name="firstName" component="div" />
                    </label>
                  </div>
                  <div
                    className={
                      errors.lastName && touched.lastName
                        ? "field error"
                        : "field"
                    }
                  >
                    <label>
                      Last Name
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Chinedu"
                      />
                      <ErrorMessage name="lastName" component="div" />
                    </label>
                  </div>
                </div>
                <div className="two fields">
                  <div
                    className={
                      errors.email && touched.email ? "field error" : "field"
                    }
                  >
                    <label>
                      Email
                      <Field
                        type="email"
                        name="email"
                        placeholder="abc@xyz.com"
                      />
                      <ErrorMessage name="email" component="div" />
                    </label>
                  </div>
                  <div
                    className={
                      errors.phoneNumber && touched.phoneNumber
                        ? "field error"
                        : "field"
                    }
                  >
                    <label>
                      Phone Number
                      <Field
                        type="text"
                        name="phoneNumber"
                        placeholder="08031234567/+234708123456"
                      />
                      <ErrorMessage name="phoneNumber" component="div" />
                    </label>
                  </div>
                </div>
                <div className="two fields">
                  <div
                    className={
                      errors.password && touched.password
                        ? "field error"
                        : "field"
                    }
                  >
                    <label>
                      Password
                      <Field
                        type="password"
                        name="password"
                        placeholder="********"
                      />
                      <ErrorMessage name="password" component="div" />
                    </label>
                  </div>
                  <div
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "field error"
                        : "field"
                    }
                  >
                    <label>
                      Confirm Password
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="********"
                      />
                      <ErrorMessage name="confirmPassword" component="div" />
                    </label>
                  </div>
                </div>
                <div>
                  {" "}
                  {values.userRole === "business" && (
                    <div
                      className={
                        errors.businessName && touched.businessName
                          ? "field error"
                          : "field"
                      }
                    >
                      <label>
                        Business Name
                        <Field
                          name="businessName"
                          placeholder="Almond Clothiers"
                        />
                        <ErrorMessage name="businessName" component="div" />
                      </label>
                    </div>
                  )}{" "}
                </div>
                <div style={{ marginBottom: "1em" }}>
                  {errorMess && (
                    <Message
                      error
                      header="Action Forbidden"
                      content={errorMess.error}
                    />
                  )}
                  {successMess && <Message success header={successMess} />}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="dmx-color"
                  >
                    Sign Up
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;

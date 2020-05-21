import React, { useState } from "react";
import { Header, Button, Message } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import baseUrl from "../../api/baseUrl";

const valSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required to login")
    .email("Please provide a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(64, "Password too long!")
});

let errorMess;
let successMess;

function Login(props) {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  let { from } = props.location.state || { from: { pathname: "/all" } };

  if (redirectToReferrer) {
    return (
      <Redirect
        to={{
          pathname: from.pathname,
          state: { message: "Logged in Successfully" }
        }}
      />
    );
  }
  localStorage.removeItem("dmx_logistics_token");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Header as="h2" textAlign="center" dividing>
          Login{" "}
        </Header>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={(values, actions) => {
            axios
              .post(`${baseUrl}/api/v1/auth/login`, values)
              .then(response => {
                errorMess = undefined;
                localStorage.setItem(
                  "dmx_logistics_token",
                  response.data.token
                );
                setRedirectToReferrer(true);
              })
              .catch(error => {
                console.log(error);
                if (error.response) errorMess = error.response.data;
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
                </div>
                <div style={{ marginBottom: "1em" }}>
                  {errorMess && (
                    <Message
                      error
                      header="Action Forbidden"
                      content={errorMess.error}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                >
                  <Button
                    loading={isSubmitting}
                    type="submit"
                    className="dmx-color"
                  >
                    Login
                  </Button>
                  <p>
                    Haven't signed up yet?{" "}
                    <Link to="/register">Create new account</Link>{" "}
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;

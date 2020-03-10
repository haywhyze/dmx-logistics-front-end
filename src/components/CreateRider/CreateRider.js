import React, { useContext } from "react";
import { Header, Button, Message } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";

import { ContextOrders } from "../context/Orders";
import { createNewRider, resetRiderSuccess } from "../../Actions/orderActions";
import valSchema from "./validationSchema";

const CreateRider = () => {
  const [state, dispatch] = useContext(ContextOrders);
  if (state && state.newRiderSuccess) resetRiderSuccess(dispatch);
  if (state.newRiderSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/all",
          state: { message: "Registered Rider successfully" }
        }}
      />
    );
  }

  return (
    <div
      className="main"
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
          Create Rider
        </Header>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            userRole: "rider"
          }}
          onSubmit={values => {
            createNewRider(dispatch, values);
          }}
          validationSchema={() => valSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form
                className={
                  state.newRiderError
                    ? "ui form new error"
                    : "successMess"
                    ? "ui form new success"
                    : "ui form new"
                }
              >
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
                <div style={{ marginBottom: "1em" }}>
                  {state.newRiderError && (
                    <Message
                      error
                      header="Action Forbidden"
                      content={state.newRiderError.error}
                    />
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    loading={state.newRiderLoading}
                    type="submit"
                    className="dmx-color"
                  >
                    Create Rider
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CreateRider;

import React from "react";
import { Button } from "semantic-ui-react";
import { Form, Field, ErrorMessage } from "formik";

export default ({
  errors,
  touched,
  values,
  handleChange,
  back,
  sender
}) => (
  <Form className="ui form new">
   
    <div
      className={
        errors[`${sender ? "sender" : "recipient"}Name`] &&
        touched[`${sender ? "sender" : "recipient"}Name`]
          ? "field error"
          : "field"
      }
    >
      <label>
        {`${sender ? "Sender" : "Recipient"}`}'s Name
        <Field
          type="text"
          name={`${sender ? "sender" : "recipient"}Name`}
          placeholder="Olawale Chinedu"
        />
        <ErrorMessage
          name={`${sender ? "sender" : "recipient"}Name`}
          component="div"
        />
      </label>
    </div>
    <div
      className={
        errors[`${sender ? "sender" : "recipient"}Phone`] &&
        touched[`${sender ? "sender" : "recipient"}Phone`]
          ? "field error"
          : "field"
      }
    >
      <label>
        {`${sender ? "Sender" : "Recipient"}`}'s Phone
        <Field
          type="text"
          name={`${sender ? "sender" : "recipient"}Phone`}
          placeholder="08031234567/+234708123456"
        />
        <ErrorMessage
          name={`${sender ? "sender" : "recipient"}Phone`}
          component="div"
        />
      </label>
    </div>
    <div
      className={
        errors[`${sender ? "sender" : "recipient"}Email`] &&
        touched[`${sender ? "sender" : "recipient"}Email`]
          ? "field error"
          : "field"
      }
    >
      <label>
        {`${sender ? "Sender" : "Recipient"}`}'s Email
        <Field
          type="email"
          name={`${sender ? "sender" : "recipient"}Email`}
          placeholder="abc@xyz.com"
        />
        <ErrorMessage
          name={`${sender ? "sender" : "recipient"}Email`}
          component="div"
        />
      </label>
    </div>
    <div
      className={
        errors[`${sender ? "sender" : "recipient"}Address`] &&
        touched[`${sender ? "sender" : "recipient"}Address`]
          ? "field error"
          : "field"
      }
    >
      <label>
        {`${sender ? "Sender" : "Recipient"}`}'s Address
        <Field
          value={values[`${sender ? "sender" : "recipient"}Address`]}
          id={`${sender ? "sender" : "recipient"}Address`}
          type="text"
          name={`${sender ? "sender" : "recipient"}Address`}
          onChange={handleChange(`${sender ? "sender" : "recipient"}Address`)}
          placeholder={`${sender ? "Sender" : "Recipient"}'s Address`}
        />
      </label>
    </div>
    {!sender && (
      <Button type="button" secondary onClick={back}>
        Back
      </Button>
    )}
    <Button type="submit" className="dmx-color">
      Save And Continue
    </Button>
  </Form>
);

import * as Yup from "yup";

const phoneRegExp = /^[+]?(\d{0,3})(\d{10})$/;
export default Yup.object().shape({
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
  )
});

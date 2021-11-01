import * as Yup from "yup";

import { SIGNUP_FIELDS } from "../constants/auth-constants";

const { email, username, password } = SIGNUP_FIELDS;

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required(password.errorRequired)
    .min(4, password.errorMin)
    .max(16, password.errorMax),
  email: Yup.string().email(email.errorValid).required(email.errorRequired),
  username: Yup.string()
    .required(username.errorRequired)
    .min(3, username.errorMin)
    .max(16, username.errorMax),
});

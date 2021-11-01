import * as Yup from "yup";

import { SIGNIN_FIELDS } from "../constants/auth-constants";

const { email, password } = SIGNIN_FIELDS;

export const validationSchema = Yup.object().shape({
  password: Yup.string().required(password.errorRequired),
  email: Yup.string().email(email.errorValid).required(email.errorRequired),
});

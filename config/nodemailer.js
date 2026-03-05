import nodemailer from "nodemailer";

import { EMAIL_PASSWORD } from "./env.js";

export const accountMail = "sujata@jsmastery.pro";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountMail,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;

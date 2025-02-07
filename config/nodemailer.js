import nodemailer from "nodemailer";

import { EMAIL_PASSWORD } from "./env.js";

export const accountMail = "codinggirl25@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountMail,
    pass: EMAIL_PASSWORD,
  },
});

export default transporter;

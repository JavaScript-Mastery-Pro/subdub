import dayjs from "dayjs";

import emailTemplates from "../constants/reminders.js";
import transporter, { accountMail } from "../config/nodemailer.js";

export const sendRemiderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Email recipient and type are required");

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error("Invalid email type");

  const message = template.body
    .replace("{userName}", subscription.user.name)
    .replace("{subscriptionName}", subscription.name)
    .replace(
      "{renewalDate}",
      dayjs(subscription.renewalDate).format("MMM D, YYYY")
    )
    .replace("{planName}", subscription.name)
    .replace(
      "{price}",
      `${subscription.currency} ${subscription.price} (${subscription.frequency})`
    )
    .replace("{paymentMethod}", subscription.paymentMethod);

  const subject = template.subject.replace(
    "{subscriptionName}",
    subscription.name
  );

  const mailOptions = {
    from: accountMail,
    to: to,
    html: message,
    subject: subject,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log("Error sending email: ", error);

    console.log("Email sent successfully: ", info);
  });
};

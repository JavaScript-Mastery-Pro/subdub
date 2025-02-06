import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_USER_ID,
} from "../config/env.js";

const emailTemplates = [
  {
    label: "7 days before reminder",
    subject:
      "📅 Reminder: Your {subscriptionName} Subscription Renews in 7 Days!",
    body: `
      Hello {userName},  

      Your **{subscriptionName}** subscription is set to renew on **{renewalDate}** (7 days from today).  

      🔹 **Plan:** {planName}  
      🔹 **Price:** {price}  
      🔹 **Payment Method:** {paymentMethod}  

      If you’d like to make changes or cancel your subscription, please visit your account settings before the renewal date.  

      Need help? Contact our support team anytime.  

      Best,  
      [Your Company]
    `,
  },
  {
    label: "5 days before reminder",
    subject: "⏳ {subscriptionName} Renews in 5 Days – Stay Subscribed!",
    body: `
      Hey {userName},  

      Just a reminder that your **{subscriptionName}** subscription renews on **{renewalDate}** (5 days from today).  

      🔹 **Plan:** {planName}  
      🔹 **Price:** {price}  
      🔹 **Payment Method:** {paymentMethod}  

      No action is needed if you wish to continue. To update your details, visit your account page.  

      Cheers,  
      [Your Company]
    `,
  },
  {
    label: "2 days before reminder",
    subject: "🚀 2 Days Left! {subscriptionName} Subscription Renewal",
    body: `
      Hi {userName},  

      Your **{subscriptionName}** subscription renewal is just **2 days away** on **{renewalDate}**.  

      🔹 **Plan:** {planName}  
      🔹 **Price:** {price}  
      🔹 **Payment Method:** {paymentMethod}  

      Make sure your payment details are up to date to avoid any service interruptions.  

      Have questions? We’re here to help.  

      Best regards,  
      [Your Company]
    `,
  },
  {
    label: "1 day before reminder",
    subject: "⚡ Final Reminder: {subscriptionName} Renews Tomorrow!",
    body: `
      Hello {userName},  

      This is your **final reminder**! Your **{subscriptionName}** subscription will renew **tomorrow** on **{renewalDate}**.  

      🔹 **Plan:** {planName}  
      🔹 **Price:** {price}  
      🔹 **Payment Method:** {paymentMethod}  

      If you wish to make any changes, please do so before midnight today.  

      Thanks for being a valued subscriber!  

      Sincerely,  
      [Your Company]
    `,
  },
  {
    label: "Final day reminder",
    subject: "✅ {subscriptionName} Renews Today – You’re All Set!",
    body: `
      Hey {userName},  

      Today’s the day! Your **{subscriptionName}** subscription renews **today** (**{renewalDate}**).  

      🔹 **Plan:** {planName}  
      🔹 **Price:** {price}  
      🔹 **Payment Method:** {paymentMethod}  

      If everything looks good, you’re all set for another subscription cycle. If you have any issues, our support team is here to assist.  

      Looking forward to serving you another term!  

      Warm regards,  
      [Your Company]
    `,
  },
];

const sendEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Email recipient and type are required");

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error("Invalid email type");

  // Replace placeholders with actual subscription values
  const message = template.body
    .replace("{userName}", subscription.user.name)
    .replace("{subscriptionName}", subscription.name)
    .replace("{renewalDate}", subscription.renewalDate)
    .replace("{planName}", subscription.planName) // Fixed planName replacement
    .replace("{price}", `$${subscription.price}`)
    .replace("{paymentMethod}", subscription.paymentMethod);

  const subject = template.subject.replace(
    "{subscriptionName}",
    subscription.name
  );

  console.log("EMAIL TEMPLATE", to, subject, message);

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_USER_ID,
          template_params: {
            to_email: to,
            subject,
            message,
          },
        }),
      }
    );

    // Clone response before attempting to read it
    const responseClone = response.clone();

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = await responseClone.text(); // Read text if JSON fails
    }

    if (!response.ok) {
      console.error("Error sending email:", responseData);
      throw new Error(responseData?.message || "Failed to send email");
    }

    console.log("Email sent successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("ERROR SENDING EMAIL:", error);
    throw error;
  }
};

export default sendEmail;

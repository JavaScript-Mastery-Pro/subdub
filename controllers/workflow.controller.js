import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";
import sendEmail from "../utils/email.js";

const reminders = [
  { label: "7 days before reminder", daysBefore: 7 },
  { label: "5 days before reminder", daysBefore: 5 },
  { label: "2 days before reminder", daysBefore: 2 },
  { label: "1 day before reminder", daysBefore: 1 },
  { label: "Final day reminder", daysBefore: 0 },
];

export const sendReminders = async () => {
  serve(async (context) => {
    const { subscriptionId } = context.requestPayload;

    console.log("🔥 COMING HERE", subscriptionId);

    const subscription = await context.run("get subscription", async () => {
      return await Subscription.findById(subscriptionId).populate(
        "user",
        "name email"
      );
    });

    if (!subscription) {
      console.error("Subscription not found");
      return;
    }

    if (subscription.status !== "active") {
      console.log(
        `Subscription "${subscription.name}" is not active. Stopping workflow.`
      );
      return;
    }

    const renewalDate = new Date(subscription.renewalDate);
    const now = new Date();

    if (renewalDate < now) {
      console.log(
        `Renewal date of ${subscription.name} is in the past. Stopping workflow.`
      );
      return;
    }

    await context.run("send demo email", async () => {
      await sendEmail({
        to: subscription.user.email,
        type: "5 days before reminder",
        subscription,
      });
    });

    for (let i = 0; i < reminders.length; i++) {
      const reminder = reminders[i];

      const reminderDate = new Date(renewalDate);
      reminderDate.setDate(renewalDate.getDate() - reminder.daysBefore);

      // Check how many days remain until renewal
      const timeDiff = Math.ceil((reminderDate - now) / (1000 * 60 * 60 * 24));

      if (timeDiff > 0) {
        console.log(
          `Sleeping until ${reminder.label} at ${reminderDate.toISOString()}`
        );
        await context.sleepUntil(`${reminder.label} sleep`, reminderDate);
      }

      // Execute the reminder step
      await context.run(reminder.label, async () => {
        console.log(
          `${reminder.label} triggered at ${new Date().toISOString()}`
        );

        await sendEmail({
          to: subscription.user.email,
          type: reminder.label,
          subscription,
        });
      });

      // Recalculate `now` after sleeping
      now.setTime(Date.now());
    }

    return;
  });
};

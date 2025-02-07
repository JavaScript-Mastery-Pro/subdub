import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const reminders = [
  { label: "7 days before reminder", daysBefore: 7 },
  { label: "5 days before reminder", daysBefore: 5 },
  { label: "2 days before reminder", daysBefore: 2 },
  { label: "1 day before reminder", daysBefore: 1 },
  { label: "Final day reminder", daysBefore: 0 },
];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

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

  const result = await context.run("check renewal date", async () => {
    const renewalDate = dayjs(subscription.renewalDate);
    const now = dayjs();

    if (renewalDate.isBefore(now)) {
      return {
        shouldStop: true,
        renewalDate: renewalDate.toISOString(),
        now: now.toISOString(),
      };
    }

    return {
      shouldStop: false,
      renewalDate: renewalDate.toISOString(),
      now: now.toISOString(),
    };
  });

  const shouldStop = result.shouldStop;
  const renewalDate = dayjs(result.renewalDate);
  const now = dayjs(result.now);

  if (shouldStop) {
    console.log(
      `Renewal date of ${subscription.name} is in the past. Stopping workflow.`
    );
    return;
  }

  for (const reminder of reminders) {
    const reminderDate = renewalDate.subtract(reminder.daysBefore, "day");
    const timeDiff = reminderDate.diff(now, "day");

    if (timeDiff > 0) {
      console.log(
        `Sleeping until ${reminder.label} at ${reminderDate.toISOString()}`
      );
      await context.sleepUntil(
        `${reminder.label} sleep`,
        reminderDate.toDate()
      );
    }

    await context.run(reminder.label, async () => {
      console.log(`${reminder.label} triggered at ${dayjs().toISOString()}`);

      await sendReminderEmail({
        to: subscription.user.email,
        type: reminder.label,
        subscription,
      });
    });
  }

  return;
});

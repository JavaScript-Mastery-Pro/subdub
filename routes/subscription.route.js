import { Router } from "express";

const subscriptionRouter = Router();

// GET all subscriptions
subscriptionRouter.get("/", (req, res) => res.send("get all subscriptions"));

// GET subscription by id
subscriptionRouter.get("/:id", (req, res) => res.send("subscription detail"));

// POST create subscription
subscriptionRouter.post("/", (req, res) => res.send("create subscription"));

// PUT update subscription by id
subscriptionRouter.put("/:id", (req, res) => res.send("update subscription"));

// DELETE delete subscription by id
subscriptionRouter.delete("/:id", (req, res) =>
  res.send("delete subscription")
);

// GET all subscriptions of a user
subscriptionRouter.get("/user/:id", (req, res) =>
  res.send("get all subscriptions of a user")
);

// PUT cancel subscription of a user
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send("cancel subscription of a user")
);

// GET upcoming renewals of a user
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send("upcoming renewals of a user")
);

export default subscriptionRouter;

import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getUpcomingRenewals,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

// GET all subscriptions
subscriptionRouter.get("/", getSubscriptions);

// GET subscription by id
subscriptionRouter.get("/:id", getSubscription);

// POST create subscription
subscriptionRouter.post("/", authorize, createSubscription);

// PUT update subscription by id
subscriptionRouter.put("/:id", updateSubscription);

// DELETE delete subscription by id
subscriptionRouter.delete("/:id", deleteSubscription);

// GET all subscriptions of a user
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

// PUT cancel subscription of a user
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

// GET upcoming renewals of a user
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

export default subscriptionRouter;

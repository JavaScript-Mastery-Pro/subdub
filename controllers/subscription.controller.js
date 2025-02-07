import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

// GET all subscriptions
export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

// GET subscription by id
export const getSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Subscription fetched successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// POST create subscription
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: {
        subscription,
        workflowRunId,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PUT update subscription by id
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE delete subscription by id
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// GET all subscriptions for a user
export const getUserSubscriptions = async (req, res, next) => {
  try {
    // check if user is the owner of the subscription
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      message: "User Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

// PUT cancel subscription of a user
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    // check if user is the owner of the subscription
    if (subscription.user.toString() !== req.user.id) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }

    // set status to cancelled
    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// GET upcoming renewals subscriptions of a user
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    // check if user is the owner of the subscription
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this subscription");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({
      user: req.params.id,
      status: "active",
    }).populate("user", "name email");

    res
      .status(200)
      .json({
        success: true,
        message: "Upcoming renewals fetched successfully",
        data: subscriptions,
      });
  } catch (error) {
    next(error);
  }
};

const mongoose = require("mongoose");

// schema for the Users

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    trialPeriod:{
      type: Number,
      default: 3, //3days trial period
    },
    trialActive: {
      type: Boolean,
      default: true,
    },
    trialExpires: {
      type: Date,
    },
    subscription: {
      type: String,
      enum: ["Trial", "Free", "Basic", "Premium"],
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 0,
    },
    nextBillingDate: Date,
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    history:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History",
        }
    ]
  },
  {
    timestamps: true,
  }
);

const User= mongoose.model("User", userSchema);

module.exports = User;

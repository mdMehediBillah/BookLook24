import mongoose from "mongoose";

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const NewsletterSubscription = mongoose.model(
  "Subscription",
  SubscriptionSchema
);

export default NewsletterSubscription;

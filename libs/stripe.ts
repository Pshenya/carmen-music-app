import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? '',
  {
    apiVersion: "2024-04-10", //2022-11-15
    appInfo: {
      name: "carmen-music-app",
      version: "0.1.0"
    }
  }
);
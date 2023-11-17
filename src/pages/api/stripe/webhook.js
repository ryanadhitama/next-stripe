import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  const body = JSON.stringify(req.body, null, 2);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: body,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, header, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log(
        `Payment success for session ID: ${checkoutSessionCompleted.id}`
      );
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
}

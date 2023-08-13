import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import Stripe from 'stripe';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
      });

    const priceId = process.env.STRIPE_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        success_url: `${process.env.CLIENT_URL}/dashboard`,
        cancel_url: process.env.CLIENT_URL,
    })


    return formatJSONResponse({
        message: "Subscription Successful",
        url: session.url,
    });
};

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { payment_id } = await req.json();

    // Fetch payment details from Razorpay using payment_id
    const payment = await razorpay.payments.fetch(payment_id);

    // Extract payment details
    const { method, upi_id, card, amount } = payment;

    console.log(method, upi_id, card, amount, "method, upi_id, card, amount");
    if (error) {
      throw error;
    }

    // Return success response
    return NextResponse.json(
      { success: true, paymentDetails: payment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return NextResponse.json(
      { error: "Error fetching Razorpay payment details" },
      { status: 500 }
    );
  }
}

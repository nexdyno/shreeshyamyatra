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

    // Check if payment_id is provided
    if (!payment_id) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(payment_id);

    // Extract relevant payment details
    const { method, upi_id, card, amount, email, contact, status } = payment;

    return NextResponse.json(
      {
        success: true,
        paymentDetails: {
          method,
          upi_id,
          card,
          amount,
          email,
          contact,
          status,
        },
      },
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

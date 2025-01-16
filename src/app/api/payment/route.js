import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid"; // Import UUID

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    // Parse request body for dynamic amount and guest data
    const { amount } = await req.json();

    // Generate a unique receipt ID using UUID
    const receiptId = `rcpt_${uuidv4().substring(0, 30)}`; // Ensures receipt length is <= 40

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: receiptId,
    });

    // At this point, Razorpay order has been created, but we don't save guest data yet.
    // We'll save the guest data only after the payment is successful.

    return NextResponse.json({ orderId: order.id, receiptId }, { status: 200 });
  } catch (error) {
    console.error("Error while creating order:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}

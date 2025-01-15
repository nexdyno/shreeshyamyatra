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
    // Parse request body for dynamic amount
    const { amount, guestData } = await req.json();

    // Generate a unique receipt ID using UUID
    const receiptId = `rcpt_${uuidv4().substring(0, 30)}`; // Ensures receipt length is <= 40

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: receiptId,
    });

    // Store the order details in Supabase
    const { data, error } = await supabase
      .from("guests")
      .insert(guestData)
      .select();

    if (error) {
      console.error("Error storing order in Supabase:", error);
      return NextResponse.json(
        { error: "Failed to save order in the database" },
        { status: 500 }
      );
    }

    // Return the Razorpay order ID and receipt ID
    return NextResponse.json(
      { orderId: order.id, receiptId, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating order:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}

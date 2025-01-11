// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(NextRequest) {
//   try {
//     const order = await razorpay.orders.create({
//       amount: 100 * 100, // in paisa
//       currency: INR,
//       receipt: "receipt_" + Math.random().toString(36).substring(7),
//     });

//     return NextResponse.json({ orderId: order.id }, { status: 200 });
//   } catch (error) {
//     console.error("error while booking ", error);
//     return NextResponse.json(
//       {
//         error: "Error creating order",
//       },
//       { status: 500 }
//     );
//   }
// }

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
    const { amount = 100 } = await req.json();

    // Generate a unique receipt ID using UUID
    const receiptId = `receipt_${uuidv4()}`;

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: receiptId,
    });

    // Store the order details in Supabase
    const { data, error } = await supabase.from("orders").insert([
      {
        id: uuidv4(), // Unique ID for the Supabase order record
        order_id: order.id,
        receipt_id: receiptId,
        amount,
        currency: "INR",
        status: "created",
      },
    ]);

    if (error) {
      console.error("Error storing order in Supabase:", error);
      return NextResponse.json(
        { error: "Failed to save order in the database" },
        { status: 500 }
      );
    }

    // Return the Razorpay order ID and receipt ID
    return NextResponse.json({ orderId: order.id, receiptId }, { status: 200 });
  } catch (error) {
    console.error("Error while creating order:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}

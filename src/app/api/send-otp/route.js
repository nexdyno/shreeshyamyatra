// import { supabase } from "@/lib/supabase/supabaseClient";
// import twilio from "twilio";

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export default async function POST(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { phone, id } = req.body;

//   if (!phone) {
//     return res.status(400).json({ error: "Phone number is required" });
//   }

//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

//   try {
//     // Send OTP via Twilio
//     await twilioClient.messages.create({
//       body: `Your Shree Shyam Yatra verification code is:${otp}. `,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     // Save OTP and expiry in Supabase profiles table
//     const { error } = await supabase
//       .from("profiles")
//       .update({ otp, otp_expiry: expiry })
//       .eq("id", id);

//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

import { supabase } from "@/lib/supabase/supabaseClient";
import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req) {
  const res = new Response();

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  const { phone, id } = await req.json();

  if (!phone) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

  try {
    // Send OTP via Twilio
    await twilioClient.messages.create({
      body: `Your Shree Shyam Yatra verification code is:${otp}. `,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    // Save OTP and expiry in Supabase profiles table
    const { error } = await supabase
      .from("profiles")
      .update({ otp, otp_expiry: expiry })
      .eq("id", id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

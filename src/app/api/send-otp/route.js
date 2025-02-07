import { supabase } from "@/lib/supabase/supabaseClient";
import twilio from "twilio";
import axios from "axios";
import { NextResponse } from "next/server";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// export async function POST(req) {
//   const res = new Response();

//   if (req.method !== "POST") {
//     return new Response(JSON.stringify({ error: "Method not allowed" }), {
//       status: 405,
//     });
//   }

//   const { phone, id } = await req.json();

//   if (!phone) {
//     return new Response(JSON.stringify({ error: "Phone number is required" }), {
//       status: 400,
//     });
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
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//       });
//     }

//     return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
//       status: 200,
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//     });
//   }
// }

// export async function POST(req) {
//   const { phone, id } = await req.json();

//   if (!phone) {
//     return new Response(JSON.stringify({ error: "Phone number is required" }), {
//       status: 400,
//     });
//   }

//   if (!id) {
//     return new Response(JSON.stringify({ error: "User ID is required" }), {
//       status: 400,
//     });
//   }

//   // Generate a 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

//   try {
//     const token = process.env.YOUR_WHATSAPP_API_TOKEN; // Use env variable
//     const phoneNumberId = process.env.WHATSAPP_API_PHONE_NUMBER_ID; // Use env variable

//     const body = {
//       messaging_product: "whatsapp",
//       to: phone, // Ensure number is in correct format
//       type: "template",
//       template: {
//         name: "otp_verification", // Ensure this matches your registered template
//         language: { code: "en" },
//         components: [
//           {
//             type: "body",
//             parameters: [{ type: "text", text: otp }], // Insert OTP into the template
//           },
//         ],
//       },
//     };

//     const response = await axios.post(
//       `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
//       body,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     // Save OTP and expiry in Supabase profiles table
//     const { error } = await supabase
//       .from("profiles")
//       .update({ otp, otp_expiry: expiry })
//       .eq("id", id);

//     if (error) {
//       return new Response(JSON.stringify({ error: error.message }), {
//         status: 500,
//       });
//     }

//     return new Response(
//       JSON.stringify({ success: true, data: response.data }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(
//       "Error sending message:",
//       error.response?.data || error.message
//     );

//     return new Response(JSON.stringify({ error: "Failed  to send message" }), {
//       status: 500,
//     });
//   }
// }
export async function POST(req) {
  try {
    const { phone, id } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    // WhatsApp API credentials
    const token = process.env.YOUR_WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_API_PHONE_NUMBER_ID;

    // WhatsApp Message Payload
    const body = {
      messaging_product: "whatsapp",
      to: phone, // Ensure number is in correct format
      type: "template",
      template: {
        name: "otp_verfication", // Ensure this matches your registered template
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: otp }], // Insert OTP into the template
          },
          {
            type: "button",
            sub_type: "url",
            index: 0,
            parameters: [
              {
                type: "text",
                text: otp,
              },
            ],
          },
        ],
      },
    };

    // Send WhatsApp message
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Save OTP and expiry in Supabase
    const { error } = await supabase
      .from("profiles")
      .update({ otp, otp_expiry: expiry })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "OTP sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "lets check the error");
    console.error("Error sending OTP:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

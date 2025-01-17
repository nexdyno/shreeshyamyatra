// // pages/api/verify-otp.js
// import { supabase } from "@/lib/supabase/supabaseClient";

// export default async function POST(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { phone, otp, id } = req.body;

//   if (!phone || !otp) {
//     return res.status(400).json({ error: "Phone number and OTP are required" });
//   }

//   try {
//     // Fetch profile with the given phone number
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("otp, otp_expiry")
//       .eq("id", id)
//       .single();

//     if (error || !data) {
//       return res.status(404).json({ error: "Profile not found" });
//     }

//     const { otp: savedOtp, otp_expiry } = data;

//     // Check if OTP matches and is within the valid timeframe
//     if (savedOtp !== otp) {
//       return res.status(400).json({ error: "Invalid OTP" });
//     }

//     if (new Date() > new Date(otp_expiry)) {
//       return res.status(400).json({ error: "OTP has expired" });
//     }

//     // Update profile to mark phone as verified
//     const { error: updateError } = await supabase
//       .from("profiles")
//       .update({ phone_verified: true, otp: null, otp_expiry: null })
//       .eq("id", id)
//       .select();

//     if (updateError) {
//       return res.status(500).json({ error: updateError.message });
//     }

//     res.status(200).json({ message: "Phone number verified successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

import { supabase } from "@/lib/supabase/supabaseClient";

export async function POST(req) {
  const res = new Response();

  const { phone, otp, id } = await req.json();

  if (!phone || !otp) {
    return new Response(
      JSON.stringify({ error: "Phone number and OTP are required" }),
      { status: 400 }
    );
  }

  try {
    // Fetch profile with the given phone number
    const { data, error } = await supabase
      .from("profiles")
      .select("otp, otp_expiry")
      .eq("id", id)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
      });
    }

    const { otp: savedOtp, otp_expiry } = data;

    // Check if OTP matches and is within the valid timeframe
    if (savedOtp !== otp) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }

    if (new Date() > new Date(otp_expiry)) {
      return new Response(JSON.stringify({ error: "OTP has expired" }), {
        status: 400,
      });
    }

    // Update profile to mark phone as verified
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        phone_verified: true,
        otp: null,
        otp_expiry: null,
        phone_number: phone,
      })
      .eq("id", id)
      .select();

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Phone number verified successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

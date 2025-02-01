import axios from "axios";

export async function POST(req) {
  const { phone, message } = await req.json();

  if (!phone) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  try {
    const token = process.env.YOUR_WHATSAPP_API_TOKEN; // Use env variable
    const phoneNumberId = process.env.WHATSAPP_API_PHONE_NUMBER_ID; // Use env variable
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        ...message, // Spread message directly, no need for `template: JSON.stringify(message)`
        to: phone, // Phone number in international format (e.g., +1234567890)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Save OTP and expiry in Supabase profiles table

    return new Response(
      JSON.stringify({ success: true, data: response.data }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );

    return new Response(JSON.stringify({ error: "Failed  to send message" }), {
      status: 500,
    });
  }
}

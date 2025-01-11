import { supabase } from "@/lib/supabase/supabaseClient.js";

export const googleAuth = async () => {
  console.log("Google authentication initiated");
  try {
    // Step 1: Sign in with Google
    const { data: authData, error: authError } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });

    if (authError) {
      console.error("Error signing in with Google:", authError.message);
      return { error: authError };
    }

    // Step 2: Check if the user is logged in and session data is present
    if (authData?.user) {
      const user = authData.user;

      // Step 3: Fetch the user's record from the `profiles` table
      const { data: userRecord, error: userFetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (userFetchError) {
        console.error("Error fetching user record:", userFetchError.message);
      }

      if (!userRecord) {
        console.log(
          "No user record found in the `profiles` table, creating a new record..."
        );

        // Step 4: Insert new user record into `profiles` table
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id, // Assuming `id` is the primary key in the `profiles` table
          email: user.email,
          created_at: new Date(),
        });

        if (insertError) {
          console.error(
            "Error inserting new user record:",
            insertError.message
          );
          return { error: insertError };
        } else {
          console.log(
            "New user record created successfully in `profiles` table"
          );
        }
      } else {
        console.log("Existing user record found:", userRecord);
      }
    } else {
      console.warn(
        "No session data or user details found after authentication"
      );
    }

    return { data: authData };
  } catch (err) {
    console.error(
      "Unexpected error during Google authentication:",
      err.message
    );
    return { error: err };
  }
};

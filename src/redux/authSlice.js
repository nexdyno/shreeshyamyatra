import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase/supabaseClient";
import reducer from "./dataSlice";
import toast from "react-hot-toast";

// Async thunks to fetch data
export const anonymouslySignin = createAsyncThunk(
  "auth/anonymouslySignin",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const checkUserSession = createAsyncThunk(
  "auth/checkUserSession",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const newUserSignUp = createAsyncThunk(
  "auth/newUserSignUp", // Corrected action name
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.updateUser({
      email,
      password,
    });
    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email, password, "what my email");
    try {
      // Call the signUp function directly within try block
      const { data, error } = await supabase.auth.signUp({
        email: email, // Use the email passed in
        password: password, // Use a password (you can replace it with a variable or input from the user)
      });

      // If there is an error with the sign-up process, handle it
      if (error) {
        throw new Error(error.message);
      }

      // Return the user data if successful
      toast.success("User Created Successfully");
      return data;
    } catch (error) {
      toast.error("An unexpected error occurred."); // Show error message to the user
      return rejectWithValue(error.message); // Return the error message to the thunk's reject handler
    }
  }
);

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email, // Email passed from the user
        password, // Password passed from the user
      });

      // Handle error if sign in fails
      if (error) {
        throw new Error(error.message); // Throw an error with the message if available
      }

      // Successfully signed in
      toast.success("Log in successful!");

      // Return the user data or session
      return data; // Data will typically contain the session and user information
    } catch (error) {
      // Handle any unexpected errors
      console.log(error, "Error while logging in");
      toast.error(error.message || "An unexpected error occurred."); // Show meaningful error message
      return rejectWithValue(error.message); // Pass the error message to the reject handler
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Trigger success toast if logout is successful
      toast.success("Logged out successfully");
      return true;
    } catch (err) {
      // Trigger error toast if logout fails
      toast.error("Logout failed. Please try again.");
      return rejectWithValue(err.message);
    }
  }
);
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue }) => {
    const returnUrl =
      process.env.NEXT_PUBLIC_REDIRECT_URL + window.location.pathname;
    try {
      // const { data, error } = await supabase.auth.linkIdentity({
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `https://www.shreeshyamyatra.com${window.location.pathname}`,
        },
      });

      if (error) {
        return rejectWithValue(error.message); // Pass the error message to the rejected action
      }

      return data; // Return the successful authentication data
    } catch (error) {
      console.error("Error during Google authentication:", error);
      return rejectWithValue(error.message || "An unknown error occurred.");
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ phone });
      if (error) throw error;
      return { message: "OTP sent successfully", phone };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ phone, email, token }, { rejectWithValue }) => {
//     try {
//       const { data, error } = await supabase.auth.verifyOtp({
//         phone,
//         token,
//         type: "sms",
//       });
//       if (error) throw error;
//       return { user: data.user };
//     } catch (err) {
//       console.error("OTP Verification Failed:", err.message);
//       return rejectWithValue(err.message || "Failed to verify OTP.");
//     }
//   }
// );

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, email, token }, { rejectWithValue }) => {
    console.log("this is hit");
    try {
      // Dynamically set the type based on whether phone or email is provided
      const type = phone ? "sms" : email ? "email" : null;

      if (!type) {
        throw new Error("Either phone or email must be provided.");
      }

      const { data, error } = await supabase.auth.verifyOtp({
        [phone ? "phone" : "email"]: phone || email, // Use phone or email dynamically
        token,
        type,
      });

      if (error) {
        throw error; // Throw error if OTP verification fails
      }

      return { user: data.user }; // Return the user data if successful
    } catch (err) {
      console.error("OTP Verification Failed:", err.message);
      return rejectWithValue(err.message || "Failed to verify OTP.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoginModalOpen: false,
    session: null,
    sessionFromLocal: null,
    userData: null,
    status: "idle",
    error: null,
    isOTPModalOpen: false,
  },
  reducers: {
    setLoginIsModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    setUserSession: (state, action) => {
      state.sessionFromLocal = action.payload;
    },
    setIsOTPModalOpen: (state, action) => {
      state.isOTPModalOpen = !state.isOTPModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(sendOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture error message
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture error message
      })
      .addCase(googleAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload; // Store user data from Google Auth
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture error message
      })
      .addCase(anonymouslySignin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(anonymouslySignin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(anonymouslySignin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Storing the error in the 'error' field
      })
      .addCase(newUserSignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newUserSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(newUserSignUp.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload; // Storing the error in the 'error' field
      })
      .addCase(userSignIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload; // Storing the error in the 'error' field
      })
      .addCase(checkUserSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.session = action.payload;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.session = null;
        state.status = "idle";
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setLoginIsModalOpen, setUserSession, setIsOTPModalOpen } =
  authSlice.actions;
export default authSlice.reducer;

// export const googleAuth = createAsyncThunk(
//   "auth/googleAuth",
//   async (_, { rejectWithValue }) => {
//     try {
//       const anonUser = supabase.auth.user(); // Get the current anonymous user
//       const anonId = anonUser?.id; // Anonymous user ID

//       // Link the anonymous user with Google account
//       const { data: linkedData, error: linkError } =
//         await supabase.auth.linkIdentity({
//           provider: "google",
//           options: {
//             redirectTo:
//               process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000",
//           },
//         });

//       if (linkError) {
//         return rejectWithValue(linkError.message); // Pass the error message to the rejected action
//       }

//       const permanentUser = linkedData.user; // Permanent user after linking
//       const permanentId = permanentUser?.id; // Permanent user ID

//       // Migrate data from the anonymous ID to the permanent user
//       if (anonId && permanentId && anonId !== permanentId) {
//         const { data: migrationData, error: migrationError } = await supabase
//           .from("your_table_name") // Replace with the actual table where you store user-specific data
//           .update({ user_id: permanentId }) // Update records with the permanent ID
//           .eq("user_id", anonId); // Find records by anonymous ID

//         if (migrationError) {
//           console.error("Error migrating data:", migrationError);
//           return rejectWithValue("Failed to migrate data.");
//         }
//       }

//       return linkedData; // Return the successful authentication data
//     } catch (error) {
//       console.error("Error during Google authentication:", error);
//       return rejectWithValue(error.message || "An unknown error occurred.");
//     }
//   }
// );

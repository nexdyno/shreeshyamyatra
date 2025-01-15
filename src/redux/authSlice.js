import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase/supabaseClient";
import reducer from "./dataSlice";

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
export const userSignIn = createAsyncThunk(
  "auth/userSignIn", // Corrected action name
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return rejectWithValue(error.message);

    if (!error) alert("login successfully");

    return data;
  }
);

// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ phone, token }, { rejectWithValue }) => {
//     try {
//       // Verify the OTP
//       const { data, error } = await supabase.auth.verifyOtp({
//         phone,
//         token,
//         type: "sms",
//       });

//       if (error) throw new Error(error.message);

//       if (data?.user) {
//         const { user } = data;

//         // Update the anonymous user to a real user with a phone number
//         const { error: updateError } = await supabase.auth.updateUser({
//           phone: phone,
//         });

//         if (updateError) {
//           console.error(
//             "Error updating user information:",
//             updateError.message
//           );
//           throw updateError;
//         }

//         // Check if user exists in the `profiles` table
//         const { data: userRecord, error: userFetchError } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", user.id)
//           .single();

//         if (userFetchError && userFetchError.code !== "PGRST116") {
//           // Log errors other than "Row not found" (code PGRST116)
//           console.error("Error fetching user record:", userFetchError.message);
//           throw userFetchError;
//         }

//         if (!userRecord) {
//           // Insert new user record if not found
//           const { error: insertError } = await supabase
//             .from("profiles")
//             .insert({
//               id: user.id,
//               phone: user.phone,
//               created_at: new Date(),
//             });

//           if (insertError) {
//             console.error(
//               "Error inserting new user record:",
//               insertError.message
//             );
//             throw insertError;
//           }
//         }

//         return {
//           id: user.id,
//           phone: user.phone,
//           ...userRecord, // Include any other relevant fields from the profiles table
//         };
//       } else {
//         throw new Error("No user details found after OTP verification");
//       }
//     } catch (err) {
//       console.error("Error during OTP verification:", err.message);
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ phone, token }, { rejectWithValue }) => {
//     try {
//       // Verify the OTP
//       const { data, error } = await supabase.auth.verifyOtp({
//         phone,
//         token,
//         type: "sms",
//       });

//       if (error) throw new Error(error.message);

//       if (data?.user) {
//         const { user } = data;

//         // Update the anonymous user to a real user with a phone number
//         const { error: updateError } = await supabase.auth.updateUser({
//           phone: phone,
//         });

//         if (updateError) {
//           console.error(
//             "Error updating user information:",
//             updateError.message
//           );
//           throw updateError;
//         }

//         // Check if user exists in the `profiles` table
//         const { data: userRecord, error: userFetchError } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", user.id)
//           .single();

//         if (userFetchError && userFetchError.code !== "PGRST116") {
//           // Log errors other than "Row not found" (code PGRST116)
//           console.error("Error fetching user record:", userFetchError.message);
//           throw userFetchError;
//         }

//         if (!userRecord) {
//           // Insert new user record if not found
//           const { error: insertError } = await supabase
//             .from("profiles")
//             .insert({
//               id: user.id,
//               phone: user.phone,
//               created_at: new Date(),
//             });

//           if (insertError) {
//             console.error(
//               "Error inserting new user record:",
//               insertError.message
//             );
//             throw insertError;
//           }
//         }

//         return {
//           id: user.id,
//           phone: user.phone,
//           ...userRecord, // Include any other relevant fields from the profiles table
//         };
//       } else {
//         throw new Error("No user details found after OTP verification");
//       }
//     } catch (err) {
//       console.error("Error during OTP verification:", err.message);
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue }) => {
    try {
      // const { data, error } = await supabase.auth.linkIdentity({
      const { data, error } = await supabase.auth.linkIdentity({
        provider: "google",
        options: {
          redirectTo:
            process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000",
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
// export const sendOtp = createAsyncThunk(
//   "auth/sendOtp",
//   async (phone, { rejectWithValue }) => {
//     try {
//       const { data, error } = await supabase.auth.updateUser({ phone });
//       if (error) throw error;
//       return { message: "OTP sent successfully", phone };
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ phone });
      // const { data, error } = await supabase.auth.admin.updateUserById({
      //   phone,
      // });
      if (error) throw error;
      return { message: "OTP sent successfully", phone };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, token }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      if (error) throw error;
      return { user: data.user };
    } catch (err) {
      return rejectWithValue(err.message);
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
  },
  reducers: {
    setLoginIsModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    setUserSession: (state, action) => {
      state.sessionFromLocal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(verifyOtp.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(verifyOtp.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.userData = action.payload; // Save user data in state
      // })
      // .addCase(verifyOtp.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload;
      // })

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
        console.log(action.payload, "user data paylaod");
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(newUserSignUp.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload, "user data paylaod failed");
        state.error = action.payload; // Storing the error in the 'error' field
      })
      .addCase(userSignIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        console.log(action.payload, "user data userSignIn paylaod");
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload, "user data paylaod userSignIn  failed");
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
export const { setLoginIsModalOpen, setUserSession } = authSlice.actions;
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

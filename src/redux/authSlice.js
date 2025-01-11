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
// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoginModalOpen: false,
    session: null,
    userData: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setLoginIsModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
export const { setLoginIsModalOpen } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { supabase } from "@/lib/supabase/supabaseClient";

// export const anonymouslySignin = createAsyncThunk(
//   "auth/anonymouslySignin",
//   async (_, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.signInAnonymously();
//     if (error) return rejectWithValue(error.message);
//     return data;
//   }
// );

// export const checkUserAndHandleEmail = createAsyncThunk(
//   "auth/checkUserAndHandleEmail",
//   async ({ email }, { rejectWithValue }) => {
//     console.log(email, "email");
//     const { data: userExists, error: userError } = await supabase.auth.signUp({
//       email,
//     });

//     if (userExists) {
//       console.log(userExists, "user exist");
//       // User exists; return info to proceed with password sign-in
//       return { existingUser: true, email };
//     }

//     // User doesn't exist; send OTP for new user verification
//     const { error: otpError } = await supabase.auth.signInWithOtp({
//       email,
//     });

//     if (otpError) return rejectWithValue(otpError.message);

//     return { existingUser: false, email };
//   }
// );

// export const signInWithPassword = createAsyncThunk(
//   "auth/signInWithPassword",
//   async ({ email, password }, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) return rejectWithValue(error.message);
//     return data;
//   }
// );

// export const verifyEmailOtp = createAsyncThunk(
//   "auth/verifyEmailOtp",
//   async ({ email, otp }, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.verifyOtp({
//       email,
//       token: otp,
//       type: "magiclink",
//     });

//     if (error) return rejectWithValue(error.message);
//     return data;
//   }
// );

// export const completeSignupWithPassword = createAsyncThunk(
//   "auth/completeSignupWithPassword",
//   async ({ email, password }, { rejectWithValue }) => {
//     const { data, error } = await supabase.auth.updateUser({
//       email,
//       password,
//     });

//     if (error) return rejectWithValue(error.message);
//     return data;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     userData: null,
//     email: null,
//     isAnonymous: true,
//     emailSent: false,
//     otpVerified: false,
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       .addCase(anonymouslySignin.fulfilled, (state, action) => {
//         console.log(action.payload, "action.payload anan");
//         state.userData = action.payload;
//         state.isAnonymous = true;
//         state.status = "succeeded";
//       })
//       .addCase(anonymouslySignin.rejected, (state, action) => {
//         console.log(action.payload, "action.payload rejected anan");
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(checkUserAndHandleEmail.fulfilled, (state, action) => {
//         console.log(action.payload, "checkUserAndHandleEmail.fulfilled");
//         state.email = action.payload.email;
//         state.emailSent = !action.payload.existingUser;
//         state.isAnonymous = false;
//         state.status = "succeeded";
//       })
//       .addCase(checkUserAndHandleEmail.rejected, (state, action) => {
//         console.log(action.payload, "checkUserAndHandleEmail.rejected");

//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(signInWithPassword.fulfilled, (state, action) => {
//         state.userData = action.payload;
//         state.isAnonymous = false;
//         state.status = "succeeded";
//       })
//       .addCase(signInWithPassword.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(verifyEmailOtp.fulfilled, (state) => {
//         state.otpVerified = true;
//         state.status = "succeeded";
//       })
//       .addCase(verifyEmailOtp.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(completeSignupWithPassword.fulfilled, (state, action) => {
//         state.userData = action.payload;
//         state.emailSent = false;
//         state.otpVerified = false;
//         state.status = "succeeded";
//       })
//       .addCase(completeSignupWithPassword.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;

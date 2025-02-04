import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase/supabaseClient";

export const fetchProfiles = createAsyncThunk(
  "data/fetchProfiles",
  async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) throw error;

    return data;
  }
);
export const fetchProperty = createAsyncThunk(
  "data/fetchProperty",
  async () => {
    const { data, error } = await supabase
      .from("property")
      .select("*")
      .eq("is_enabled", true)
      .eq("is_verified", true)
      .not("user_id", "is", null);

    if (error) throw error;

    return data;
  }
);

export const fetchPropertyById = createAsyncThunk(
  "data/fetchPropertyById",
  async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("property")
        .select()
        .eq("id", id);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching property:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPropertyEvent = createAsyncThunk(
  "data/fetchPropertyEvent",
  async () => {
    const { data, error } = await supabase.from("property_events").select("*");
    if (error) throw error;
    return data;
  }
);

export const fetchRooms = createAsyncThunk("data/fetchRooms", async () => {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) throw error;

  return data;
});
export const fetchRoomsBusy = createAsyncThunk(
  "data/fetchRoomsBusys",
  async () => {
    const { data, error } = await supabase.from("room_busy").select("*");
    if (error) throw error;

    return data;
  }
);

export const fetchImages = createAsyncThunk("data/fetchImages", async () => {
  const { data, error } = await supabase.from("property_images").select("*");
  if (error) throw error;

  return data;
});

export const bookingCreate = createAsyncThunk(
  "data/bookingCreate",
  async (guestData, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("guests")
      .insert(guestData)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return rejectWithValue(error.message);
    }

    return data;
  }
);
export const fetchPropetyContactByBookingId = createAsyncThunk(
  "guests/fetchContact",
  async (id, { rejectWithValue }) => {
    try {
      // Step 1: Fetch property_id from guests table
      const { data: guestData, error: guestError } = await supabase
        .from("guests")
        .select("property_id")
        .eq("booking_id", id)
        .single();

      if (guestError || !guestData) {
        console.error("Error fetching property_id:", guestError);
        return rejectWithValue(guestError?.message || "Property ID not found");
      }

      const property_id = guestData.property_id;

      // Step 2: Fetch user_id from property table using property_id
      const { data: propertyData, error: propertyError } = await supabase
        .from("property")
        .select("user_id")
        .eq("id", property_id)
        .single();

      if (propertyError || !propertyData) {
        console.error("Error fetching user_id:", propertyError);
        return rejectWithValue(propertyError?.message || "User ID not found");
      }
      const user_id = propertyData.user_id;

      // Step 3: Fetch contact_number from profiles table using user_id
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("phone")
        .eq("id", user_id)
        .select();

      if (profileError || !profileData) {
        console.error("Error fetching contact_number:", profileError);
        return rejectWithValue(
          profileError?.message || "Contact number not found"
        );
      }

      return profileData?.[0]?.phone;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllBookingById = createAsyncThunk(
  "data/fetchAllBookingById",
  async ({ id }, { rejectWithValue }) => {
    try {
      // Fetch data from the Supabase "guests" table
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("profile_id", id);

      if (error) {
        // Handle Supabase errors
        throw new Error(
          error.message || "Error fetching booking data from the database"
        );
      }

      return data; // Return the fetched data
    } catch (err) {
      // Pass error message to the rejectWithValue for Redux
      return rejectWithValue(err.message || "Failed to fetch booking data");
    }
  }
);

export const fetchBookingData = createAsyncThunk(
  "data/fetchBookingData",
  async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*") // Specify columns if necessary
        .eq("booking_id", id); // Filter by booking_id

      if (error) {
        throw new Error(error.message);
      }

      if (!data || data.length === 0) {
        throw new Error("No data found for the given booking ID");
      }

      return data; // Return the filtered data
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch booking data");
    }
  }
);
export const saveGuestData = createAsyncThunk(
  "data/saveGuestData",
  async ({ guestData, id }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("guests") // Table name in Supabase
        .update(guestData)
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(error.message); // Handle error
      }

      return data; // Return updated data
    } catch (error) {
      return rejectWithValue(error.message); // Return error message if failure
    }
  }
);
export const savePaymentDetail = createAsyncThunk(
  "data/savePaymentDetail",
  async ({ paymentdata }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .insert(paymentdata)
        .select();

      if (error) {
        throw new Error(error.message); // Handle error
      }

      // Return the inserted data
      return data;
    } catch (error) {
      console.error("Error inserting payment details:", error);
      return rejectWithValue(error.message); // Return error message if failure
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "data/userData",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      // Check if data is null or undefined
      if (!data) {
        throw new Error("No user data found.");
      }

      return data; // Returning the data directly
    } catch (error) {
      console.log("Error while fetching the user data", error);
      return rejectWithValue(error.message); // Passing the error message
    }
  }
);

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    profiles: [],
    property: [],
    rooms: [],
    busyRoom: [],
    allImages: [],
    propertyEvent: [],
    singleProperty: [],
    userData: null,
    propertyContact: null,
    searchValue: "",
    guestData: null,
    paymentdata: null,
    bookingData: null,
    userAllBooking: null,
    IsSearchOpen: false,
    isConfirmOrder: false,
    totalSummary: null,
    bookingDate: null,
    roomAndGuest: null,
    selectedRoom: null,
    matchedProperty: null,
    OneRoom: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setMatchedProperty: (state, action) => {
      state.matchedProperty = action.payload;
      if (action.payload) {
        const { id, name, address, country, city } = action.payload;
        const filteredProperty = { id, name, address, country, city };
        localStorage.setItem(
          "matchedProperty",
          JSON.stringify(filteredProperty)
        );
      }
    },
    setIsSearchOpen: (state, action) => {
      state.IsSearchOpen = action.payload;
    },
    setOneRoom: (state, action) => {
      state.OneRoom = action.payload;
    },
    setBookingDate: (state, action) => {
      state.bookingDate = action.payload;
    },
    setroomAndGuest: (state, action) => {
      state.roomAndGuest = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setTotalSummary: (state, action) => {
      state.totalSummary = action.payload;
    },
    setIsConfirmOrder: (state, action) => {
      state.isConfirmOrder = action.payload;
    },

    clearAll: (state) => {
      localStorage.removeItem("matchedProperty");
      localStorage.removeItem("my_id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPropetyContactByBookingId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPropetyContactByBookingId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyContact = action.payload;
      })
      .addCase(fetchPropetyContactByBookingId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveGuestData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveGuestData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.guestData = action.payload;
      })
      .addCase(saveGuestData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(savePaymentDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePaymentDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.paymentdata = action.payload;
      })
      .addCase(savePaymentDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchBookingData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookingData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookingData = action.payload;
      })
      .addCase(fetchBookingData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllBookingById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllBookingById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAllBooking = action.payload;
      })
      .addCase(fetchAllBookingById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProperty.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.property = action.payload;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPropertyEvent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPropertyEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyEvent = action.payload;
      })
      .addCase(fetchPropertyEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchImages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allImages = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRoomsBusy.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRoomsBusy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.busyRoom = action.payload;
      })
      .addCase(fetchRoomsBusy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setMatchedProperty,
  setOneRoom,
  setBookingDate,
  setroomAndGuest,
  setSelectedRoom,
  setTotalSummary,
  setIsConfirmOrder,
  setIsSearchOpen,
  setSearchValue,
  clearAll,
} = dataSlice.actions;
export default dataSlice.reducer;

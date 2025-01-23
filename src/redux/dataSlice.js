import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase/supabaseClient";

export const fetchProfiles = createAsyncThunk(
  "data/fetchProfiles",
  async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) throw error;
    console.log(data, "fetchProfiles");
    return data;
  }
);

export const fetchProperty = createAsyncThunk(
  "data/fetchProperty",
  async () => {
    const { data, error } = await supabase.from("property").select("*");
    if (error) throw error;
    console.log(data, "fetchProperty");
    return data;
  }
);

export const fetchRooms = createAsyncThunk("data/fetchRooms", async () => {
  const { data, error } = await supabase.from("rooms").select("*");
  if (error) throw error;
  console.log(data, "fetchRooms");
  return data;
});
export const fetchRoomsBusy = createAsyncThunk(
  "data/fetchRoomsBusys",
  async () => {
    const { data, error } = await supabase.from("room_busy").select("*");
    if (error) throw error;
    console.log(data, "room_busy room_busyroom_busy");
    return data;
  }
);

export const fetchImages = createAsyncThunk("data/fetchImages", async () => {
  const { data, error } = await supabase.from("property_images").select("*");
  if (error) throw error;
  console.log(data, "fetchImages");
  return data;
});

export const bookingCreate = createAsyncThunk(
  "data/bookingCreate",
  async (guestData, { rejectWithValue }) => {
    console.log(guestData, "guestData in redux");
    const { data, error } = await supabase
      .from("guests")
      .insert(guestData)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return rejectWithValue(error.message);
    }
    console.log("Booking data:", data);
    return data;
  }
);
export const fetchAllBookingById = createAsyncThunk(
  "data/fetchAllBookingById",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, "this in fetch booking id ");
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

      // if (!data || data.length === 0) {
      //   // Handle no data scenario
      //   throw new Error("No bookings found for the given user ID");
      // }

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
    console.log(guestData, id, "guestdata saveGuestData");
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
      console.log(paymentdata, "paymentdata , paymentdata");

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

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    profiles: [],
    property: [],
    rooms: [],
    busyRoom: [],
    allImages: [],
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
    // Reducer to set matchedProperty
    setMatchedProperty: (state, action) => {
      state.matchedProperty = action.payload;
      localStorage.setItem("matchedProperty", JSON.stringify(action.payload));
    },
    setIsSearchOpen: (state, action) => {
      state.IsSearchOpen = action.payload;
    },
    setOneRoom: (state, action) => {
      state.OneRoom = action.payload;
      localStorage.setItem("OneRoom", JSON.stringify(action.payload));
    },
    setBookingDate: (state, action) => {
      state.bookingDate = action.payload;
      localStorage.setItem("bookingDate", JSON.stringify(action.payload));
    },
    setroomAndGuest: (state, action) => {
      state.roomAndGuest = action.payload;
      localStorage.setItem("roomAndGuest", JSON.stringify(action.payload));
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
      localStorage.setItem("selectedRoom", JSON.stringify(action.payload));
    },
    setTotalSummary: (state, action) => {
      state.totalSummary = action.payload;
      localStorage.setItem("totalSummary", JSON.stringify(action.payload));
    },
    setIsConfirmOrder: (state, action) => {
      state.isConfirmOrder = action.payload;
    },

    clearAll: (state) => {
      state.matchedProperty = null;
      state.OneRoom = null;
      state.bookingDate = null;
      state.roomAndGuest = null;
      state.selectedRoom = null;
      state.totalSummary = null;

      localStorage.removeItem("matchedProperty");
      localStorage.removeItem("OneRoom");
      localStorage.removeItem("bookingDate");
      localStorage.removeItem("roomAndGuest");
      localStorage.removeItem("selectedRoom");
      localStorage.removeItem("totalSummary");
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
} = dataSlice.actions;
export default dataSlice.reducer;

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

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    profiles: [],
    property: [],
    rooms: [],
    busyRoom: [],
    allImages: [],
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

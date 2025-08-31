const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const fetchGym = createAsyncThunk("trainee/allgym", async () => {
  const allgym = await axios.get(
    "https://workout-backend-ethn.onrender.com/trainee/allgym"
  );
  return allgym.data;
});

const allgym = createSlice({
  name: "allgym",
  initialState: {
    allgym: [],
    loading: true,
    searchData: [],
  },
  reducers: {
    searchReducer: (state, action) => {
      state.loading = true;
      state.searchData = state.allgym.filter((data) => {
        if (data.gymLocation) {
          if (
            data.gymLocation
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          )
            return data;
        }
      });
      console.log(state.searchData);
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGym.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGym.fulfilled, (state, action) => {
        state.loading = false;
        state.allgym = action.payload;
      })
      .addCase(fetchGym.rejected, (state) => {
        state.loading = false;
        state.status = "rejected";
      });
  },
});

export const { searchReducer } = allgym.actions;

export default allgym.reducer;

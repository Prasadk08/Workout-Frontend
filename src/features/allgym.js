const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const fetchGym = createAsyncThunk("trainee/allgym",async()=>{
    const allgym = await axios.get("http://localhost:8080/trainee/allgym")
})

const allgym = createSlice({
    name:"allgym",
    initialState:{
        allgym:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchGym.pending,(state)=>{

        })
        .addCase(fetchGym.fulfilled,(state,action)=>{

        })
        .addCase(fetchGym.rejected,(state)=>{

        })
    }
})

export default allgym.reducer


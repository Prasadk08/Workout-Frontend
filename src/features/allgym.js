const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const fetchGym = createAsyncThunk("trainee/allgym",async()=>{
    const allgym = await axios.get("http://localhost:8080/trainee/allgym")
    return allgym.data
})

const allgym = createSlice({
    name:"allgym",
    initialState:{
        allgym:[],
        status:""
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchGym.pending,(state)=>{
            state.status="loading"

        })
        .addCase(fetchGym.fulfilled,(state,action)=>{
            state.allgym=action.payload
        })
        .addCase(fetchGym.rejected,(state)=>{
            state.status="rejected"
        })
    }
})

export default allgym.reducer


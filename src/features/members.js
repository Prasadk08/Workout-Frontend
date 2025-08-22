import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "./allgym";

export const getAllmembers = createAsyncThunk("/owner/getallmembers",async(token)=>{
    let data = await axios.get("http://localhost:8080/owner/getallmembers",{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    return data.data;
})

const memberSlice = createSlice({
    name :"members",
    initialState:{
        allmembers:[],
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllmembers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllmembers.fulfilled,(state,action)=>{
            state.loading = false;
            state.allmembers = action.payload;
        })
        .addCase(getAllmembers.rejected,(state)=>{
            state.loading = false;
            state.error = "Failed to fetch members";
        })

    }
})

export default memberSlice.reducer;
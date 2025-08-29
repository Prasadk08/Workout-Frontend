const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const getownerData = createAsyncThunk("/owner/getownerdata",async(token)=>{
    let data = await axios.get("http://localhost:8080/owner/plandata",{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    return data.data
})



const ownerDataSlice = createSlice({
    name:"ownerdata",
    initialState:{
        ownerdata:[],
        loading:true,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getownerData.pending,(state)=>{
            state.loading=true
        })
        .addCase(getownerData.fulfilled,(state,action)=>{
            state.loading=false
            state.ownerdata=action.payload
        })
        .addCase(getownerData.rejected,(state)=>{
            state.loading=false
            state.error="Something wrong while fetching owner data"
        })
    }
})

export default ownerDataSlice.reducer
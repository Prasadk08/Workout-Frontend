import { configureStore } from "@reduxjs/toolkit";
import allgymreducer from '@/features/allgym';
import allmembers from "@/features/members";
import ownerData from "@/features/ownerData";


export const store = configureStore({
    reducer:{
        allgym:allgymreducer,
        members:allmembers,
        ownerData:ownerData
    }
})
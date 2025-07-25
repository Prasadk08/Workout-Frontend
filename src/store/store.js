import { configureStore } from "@reduxjs/toolkit";
import allgymreducer from '@/features/allgym';

export const store = configureStore({
    reducer:{
        allgym:allgymreducer
    }
})
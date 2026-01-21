import { createSelector, createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name:"global",
    initialState:{
        data:null,
        showMarquee:true,
    },
    reducers:{
        setData:(state,action)=>{
            state.data=action.payload
        },
        setShowMarquee:(state,action)=>{
            state.showMarquee=action.payload
        },
    }
})
export default globalSlice.reducer;

export const {setData,setShowMarquee}=globalSlice.actions

export const globalSelector=createSelector((state)=>state.global,(state)=>state)
export const selectShowMarquee=(state)=>state.global.showMarquee

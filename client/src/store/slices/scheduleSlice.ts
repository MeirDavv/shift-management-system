import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Schedule,ScheduleState } from "../interfaces/schedule";

const initialState: ScheduleState = {
    list:[],
};

const scheduleSlice = createSlice({
    name:'schedule',
    initialState,
    reducers:{
        setSchedule(state, action: PayloadAction<Schedule[]>){
            state.list = action.payload;
        },
        addSchedule(state, action: PayloadAction<Schedule>){
            state.list.push(action.payload);
        },
        updateSchedule(state, action:PayloadAction<Schedule>){
            const index = state.list.findIndex(sch => sch.id === action.payload.id);
            if (index !== -1){
                state.list[index] = action.payload;
            }
        },
        removeSchedule(state, action:PayloadAction<number>){
            state.list = state.list.filter(sch => sch.id !== action.payload);
        },
    },
});

export const {setSchedule, addSchedule, updateSchedule, removeSchedule} = scheduleSlice.actions;
export default scheduleSlice.reducer;
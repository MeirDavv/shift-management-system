import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { Role, RoleState } from '../interfaces/role';
import { fetchRoles } from '../actions/roleActions';


const initialState: RoleState = {
    list: [],
    loading: false,
    error: null
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers:{
        setRoles(state, action:PayloadAction<Role[]>){
            state.list = action.payload;
        },
        addRole(state, action:PayloadAction<Role>){
            state.list.push(action.payload);
        },
        updateRole(state, action:PayloadAction<Role>){
            const index = state.list.findIndex(role => role.id === action.payload.id);
            if (index!== -1){
                state.list[index] = action.payload;
            }
        },
        removeRole(state, action:PayloadAction<number>){
            state.list = state.list.filter(role => role.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoles.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchRoles.fulfilled, (state,action)=>{
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchRoles.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch employees';
        })
    }
});

export const {setRoles,addRole,updateRole,removeRole} = rolesSlice.actions;
export default rolesSlice.reducer;
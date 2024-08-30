import { createSlice } from '@reduxjs/toolkit';
import { fetchRoles } from '../actions/roleActions';
const initialState = {
    list: [],
    loading: false,
    error: null
};
const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles(state, action) {
            state.list = action.payload;
        },
        addRole(state, action) {
            state.list.push(action.payload);
        },
        updateRole(state, action) {
            const index = state.list.findIndex(role => role.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        removeRole(state, action) {
            state.list = state.list.filter(role => role.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoles.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRoles.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchRoles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch employees';
        });
    }
});
export const { setRoles, addRole, updateRole, removeRole } = rolesSlice.actions;
export default rolesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,

    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: state.list.length + 1,
                title: action.payload,
                toggle: false,
            };

            // Adding the new task to the beginning of the list
            state.list.unshift(newTask);
        },

        deleteTask: (state, action) => {
            state.list = state.list.filter( task => task.id !== action.payload);
        },

        toggleTask: (state, action) => {
            const task = state.list.find(task => task.id === action.payload)

            if (task) {
                task.toggle = !task.toggle;
            }
        },
    },
});

export const { addTask, deleteTask, toggleTask } = todoSlice.actions;

export default todoSlice.reducer;
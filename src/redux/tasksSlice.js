import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const handleFetchTasks = (state, action) => {
  state.items = action.payload;
};

const handleAddTask = (state, action) => {
  state.items.push(action.payload);
};
const handleDeleteTask = (state, action) => {
  const idx = state.items.findIndex(item => item.id === action.payload.id);
  state.items.splice(idx, 1);
};
const handleToggleCompleted = (state, action) => {
  const idx = state.items.findIndex(item => item.id === action.payload.id);
  state.items.splice(idx, 1, action.payload);
};

const actions = [fetchTasks, addTask, deleteTask, toggleCompleted];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchTasks.fulfilled, handleFetchTasks)
      .addCase(addTask.fulfilled, handleAddTask)
      .addCase(deleteTask.fulfilled, handleDeleteTask)
      .addCase(toggleCompleted.fulfilled, handleToggleCompleted)
      .addMatcher(
        isAnyOf(...actions.map(action => action.fulfilled)),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(...actions.map(action => action.pending)), state => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(...actions.map(action => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
  // extraReducers:
  // {
  // [fetchTasks.pending]: handlePending,
  // [fetchTasks.fulfilled](state, action) {
  //   state.isLoading = false;
  //   state.error = null;
  //   state.items = action.payload;
  // },
  // [fetchTasks.rejected]: handleRejected,

  // [addTask.pending]: handlePending,
  // [addTask.fulfilled](state, action) {
  //   state.isLoading = false;
  //   state.error = null;
  //   state.items.push(action.payload);
  // },
  // [addTask.rejected]: handleRejected,

  // [deleteTask.pending]: handlePending,
  // [deleteTask.fulfilled](state, action) {
  //   state.isLoading = false;
  //   state.error = null;
  // Не можна поєднувати зміну по посиланню та повернення нового значення
  // return state.items.filter(item => item.id !== action.payload.id);
  //   const idx = state.items.findIndex(item => item.id === action.payload.id);
  //   state.items.splice(idx, 1);
  // },
  // [deleteTask.rejected]: handleRejected,

  // [toggleCompleted.pending]: handlePending,
  // [toggleCompleted.fulfilled](state, action) {
  //   state.isLoading = false;
  //   state.error = null;
  // Не можна поєднувати зміну по посиланню та повернення нового значення
  // return state.items.filter(item => item.id !== action.payload.id);
  //     const idx = state.items.findIndex(item => item.id === action.payload.id);
  //     state.items.splice(idx, 1, action.payload);
  //   },
  //   [toggleCompleted.rejected]: handleRejected,
  // },
});

export const tasksReducer = tasksSlice.reducer;

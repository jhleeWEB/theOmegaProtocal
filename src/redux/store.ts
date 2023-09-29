import { configureStore } from '@reduxjs/toolkit';
import partyReducer from './slices/playerSlice';
import simulationReducer from './slices/simulationSlice';

export const store = configureStore({
  reducer: { party: partyReducer, simulation: simulationReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

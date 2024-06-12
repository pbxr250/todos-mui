import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { todoSlice } from "./slices/todoSlice"

const rootReducer = combineSlices(todoSlice)

export const store =  configureStore({
    reducer: rootReducer,
  })

export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

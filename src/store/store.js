import { createSlice, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    filteredData: [],
    selectedTags: [],
    allTags: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    searchText: "",
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setAllTags: (state, action) => {
      state.allTags = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setTags,
  setData,
  setFilteredData,
  setPagination,
  setAllTags,
  setSearchText,
} = postsSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, postsSlice.reducer);

const store = configureStore({
  reducer: {
    posts: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: [], removeId : "", loading: ""};

const userExpanseSlice = createSlice({
  name: "expanse",
  initialState: initialState,
  reducers: {
    addExpanse(state, action) {
      const createExpanse = action.payload;
      console.log("state", createExpanse)
      // console.log(state.user, "state")
      const loadedData = [];
     
      for (const id in createExpanse) {
        loadedData.push({
          id: createExpanse[id].id,
          title: createExpanse[id].title,
          amount: createExpanse[id].amount,
          date: createExpanse[id].date,
        });
        // console.log("after" , loadedData) 


        state.user = loadedData

      }
    },
    removeTask(state, action) {
      const id = action.payload;
      // console.log("remove" , id)
      state.removeId = state.removeId + id;
      state.user = state.user.filter((items) => items.id !== id);
    },
    loadingState(state, action) {
      state.loading = action.payload
    }
  },
});
export const expanseSlice = userExpanseSlice.actions;

export default userExpanseSlice;
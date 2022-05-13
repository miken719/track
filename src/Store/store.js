import { configureStore } from "@reduxjs/toolkit";

import userExpanseSlice from "./UserSlice";

const store = configureStore({
  reducer: { expanse:  userExpanseSlice.reducer}
})

export default store;
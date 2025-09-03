import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./service/authService";
import { userlistApi } from "./service/userlistService";
import { supermasteAccountStatementApi } from "./service/supermasteAccountStatementServices";
import { loginReportApi } from "./service/loginReportServices";
import { activeMatchesApi } from "./service/ActiveMatcheService";
import { eventDerailApi } from "./service/eventDetailServices";
import { fancyBookApi } from "./service/FancyBookServices";
import global from "./global/slice";
import useref from "./global/elementSlice";
import { sportDetailsApi } from "./service/SportDetailServices";
import { oddsPnlApi } from "./service/OddsPnlServices";

import { casinoDetailsApi } from "./service/CasinoServices";
import { casinoData } from "./service/casinoService";

export const store = configureStore({
  reducer: {
    global,
    useref,
    [authApi.reducerPath]: authApi.reducer,
    [userlistApi.reducerPath]: userlistApi.reducer,
    [supermasteAccountStatementApi.reducerPath]:
      supermasteAccountStatementApi.reducer,
    [loginReportApi.reducerPath]: loginReportApi.reducer,
    [activeMatchesApi.reducerPath]: activeMatchesApi.reducer,
    [eventDerailApi.reducerPath]: eventDerailApi.reducer,
    [fancyBookApi.reducerPath]: fancyBookApi.reducer,
    [sportDetailsApi.reducerPath]: sportDetailsApi.reducer,
    [oddsPnlApi.reducerPath]: oddsPnlApi.reducer,

    [casinoDetailsApi.reducerPath]: casinoDetailsApi.reducer,
    [casinoData.reducerPath]: casinoData.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(authApi.middleware)
      .concat(userlistApi.middleware)
      .concat(supermasteAccountStatementApi.middleware)
      .concat(loginReportApi.middleware)
      .concat(activeMatchesApi.middleware)
      .concat(eventDerailApi.middleware)
      .concat(fancyBookApi.middleware)
      .concat(sportDetailsApi.middleware)
      .concat(oddsPnlApi.middleware)
      .concat(casinoDetailsApi.middleware)
      .concat(casinoData.middleware),
});

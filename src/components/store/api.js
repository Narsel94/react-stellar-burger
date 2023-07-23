import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../constants/api";

export function postRequest(order) {
  return fetch(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: order }),
  });
}

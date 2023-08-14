import { AnyAction, ThunkDispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registrationRequest,
  getUserRequest,
  loginRequest,
  loqoutRequest,
  patchUser,
} from "../api/api";
import {
  TUserState,
  TLoginData,
  TRegisterData,
  TPatchUserData,
  TLoginResponse,
  TRegistrResponse,
  TGetUserData,
  TUser,
  TLogoutResponse,
  TPatchUserResponse
} from "../utils/types";
import { RootState } from "./store";
import { PayloadAction } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    const logoutData:TLogoutResponse = await loqoutRequest();
    if (logoutData.success) {
      dispatch(setUser(null));
      localStorage.removeItem("accesToken");
      localStorage.removeItem("refreshToken");
      dispatch(setAuthChecked(false));
    }
  }
);

export const patchUserData = createAsyncThunk(
  "user/patchUser",
  async (userData: TPatchUserData, { dispatch }) => {
    const newData:TPatchUserResponse = await patchUser(userData);
    if (newData.success) {
      dispatch(setUser(newData.user));
    }
    return newData;
  }
);

export const registrateUser = createAsyncThunk(
  "user/redistrateUser",
  async (formData: TRegisterData, { dispatch }) => {
    const data: TRegistrResponse = await registrationRequest(formData);
    if (data.success) {
      dispatch(setUser(data.user));
      localStorage.setItem("accesToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      dispatch(setAuthChecked(true));
    }
    return data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginData: TLoginData, { dispatch }) => {
    loginRequest(loginData)
      .then((res: TLoginResponse) => {
        if (res.success) {
          localStorage.setItem("accesToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res.user));
        } else {
          return Promise.reject(`Ошибка дынных с сервера`);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setAuthChecked(true));
      });
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { dispatch }) => {
    const userData:TGetUserData = await getUserRequest();
    if (userData.success) {
      dispatch(setUser(userData.user));
    }
    return userData;
  }
);

export const checkUserAuth = () => {
  return (dispatch:ThunkDispatch<RootState, unknown, AnyAction>) => {
    if (localStorage.getItem("accesToken")) {
      dispatch(getUser())
        .catch((error: Error) => {
          localStorage.removeItem("accesToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  };
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, actions:PayloadAction<TUser | null>) {
      state.user = actions.payload;
    },
    setAuthChecked(state, actions:PayloadAction<boolean>) {
      state.isAuthChecked = actions.payload;
    },
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;
export default userSlice.reducer;

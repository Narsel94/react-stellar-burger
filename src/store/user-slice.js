import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registrationRequest, getUserRequest, loginRequest, loqoutRequest, patchUser } from "../api/api";

export const logoutUser = createAsyncThunk(
  "user/logout", 
  async(_, {dispatch}) => {
    const logoutData = await loqoutRequest();
    if (logoutData.success) {
      dispatch(setUser(null));
      localStorage.removeItem("accesToken");
      localStorage.removeItem("refreshToken");
      dispatch(setAuthChecked(false));
    }
  }
) 

export const patchUserData = createAsyncThunk(
  "user/patchUser", 
  async (userData, { dispatch }) => {
    const newData = await patchUser(userData);
      if (newData.success) {
        dispatch(setUser(newData.user))
      }
      return newData
  }
)


export const registrateUser = createAsyncThunk(
  "user/redistrateUser",
  async (formData, { dispatch }) => {
    const data = await registrationRequest(formData);
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
  async (loginData, { dispatch }) => {
    loginRequest(loginData)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accesToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res.user));
        } else {
          return Promise.reject(`Ошибка дынных с сервера`);
        }
      })
      .catch((err) => {
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
    const userData = await getUserRequest();
    if (userData.success) {
      dispatch(setUser(userData.user));
    }
    return userData;
  }
);

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accesToken")) {
      dispatch(getUser())
        .catch((error) => {
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthChecked: false,
  },
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload;
    },
    setAuthChecked(state, actions) {
      state.isAuthChecked = actions.payload;
    },
  },
});




export const { setAuthChecked, setUser } = userSlice.actions;
export default userSlice.reducer;

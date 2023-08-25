import userReducer, {
  setUser,
  setAuthChecked,
  getUser,
  loginUser,
  registrateUser,
  patchUserData,
  logoutUser,
} from "./user-slice";

const initialState = {
  user: null,
  isAuthChecked: false,
  error: true,
};

describe("userSlice", () => {
  describe("userSlice/reducers", () => {
    it('set user data with "setUser" action', () => {
      const action = {
        type: setUser.type,
        payload: { name: "test", email: "test" },
      };

      const result = userReducer(undefined, action);
      expect(result.user).toEqual({ name: "test", email: "test" });
      expect(result.error).toBe(false);
    });

    it('set user data with "setUser" action', () => {
      const action = {
        type: setUser.type,
        payload: { name: "test", email: "test" },
      };

      const result = userReducer(undefined, action);
      expect(result.user).toEqual({ name: "test", email: "test" });
      expect(result.error).toBe(false);
    });
    it('it should set auth chect with "setAuthChecked" action', () => {
      const action = {
        type: setAuthChecked.type,
        payload: true,
      };
      const result = userReducer(undefined, action);
      expect(result.isAuthChecked).toBe(true);
    });
  });
  describe("userSlice/extraReducers/loginUser", () => {
    it('should set user data with "loginUser.fulfilled" action', () => {
      const result = userReducer(
        undefined,
        loginUser.fulfilled({ user: { name: "test", email: "test" } })
      );
      expect(result.user).toEqual({ name: "test", email: "test" });
      expect(result.isAuthChecked).toBe(true);
    });

    it('should set user data with "loginUser.rejected" action', () => {
      const result = userReducer(undefined, loginUser.rejected());
      expect(result.error).toBe(true);
      expect(loginUser.rejected().error.message).toBe("Rejected");
    });
  });

  describe("userSlice/extraReducers/getUser", () => {
    it('should set userData with "getUser.fulfilled" action', () => {
      const result = userReducer(
        initialState,
        getUser.fulfilled({ user: { name: "test", email: "test" } })
      );
      expect(result.user).toEqual({ name: "test", email: "test" });
      expect(result.error).toBe(false);
    });

    it('should set userData with "getUser.rejected" action', () => {
      const result = userReducer(undefined, getUser.rejected());
      expect(result.error).toBe(true);
    });
  });

  describe("userSlice/extraReducers/patchUserData", () => {
    it('should update user data with "patchUserData.fulfilled" action', () => {
      const state = {
        user: { email: "111111", name: "111111" },
        error: true,
      };

      const result = userReducer(
        state,
        patchUserData.fulfilled({ user: { email: "22222", name: "22222" } })
      );
      expect(result).toEqual({
        user: { email: "22222", name: "22222" },
        error: false,
      });
    });
  });

  describe("userSlice/extraReducers/registrateUser", () => {
    it('shoud set data to userState object with "registrateUser.fulfilled" action', () => {
      const result = userReducer(
        undefined,
        registrateUser.fulfilled({ user: { email: "123", name: "123" } })
      );
      expect(result).toEqual({
        user: { email: "123", name: "123" },
        isAuthChecked: true,
        error: false,
      });
    });

    it('shoud set error to userState object with "registrateUser.rejected" action', () => {
      const result = userReducer(undefined, registrateUser.rejected());
      expect(result.error).toBe(true);
    });
  });
});

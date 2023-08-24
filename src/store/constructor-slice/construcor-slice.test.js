import consctructorReducer, { createPostRequest } from "./consctructor-slice";
import { postOrder } from "../../api/api";
import { clearSelectedIngredients } from "../ingredients-slice/ingredients-slice";
import { openOrderDetailsModal } from "../modal-slice";

jest.mock("../../api/api");

const initialState = {
  order: null,
  status: null,
  error: null,
};

const testError = {
  name: "error",
  message: "for test",
  stack: "error for test",
};

describe("ConstructorSlice", () => {
  describe("Reducers", () => {
    it('should set status with "createPostRequest.pending" action', () => {
      const state = consctructorReducer(undefined, createPostRequest.pending());
      expect(state).toEqual({
        order: null,
        status: "...pending",
        error: null,
      });
    });

    it('should add order details with "createPostRequest.fulfilled" action', () => {
      const state = consctructorReducer(
        undefined,
        createPostRequest.fulfilled(123)
      );
      expect(state).toEqual({
        order: 123,
        status: "resolved",
        error: null,
      });
    });

    it('should set status with "createPostRequest.rejected" action', () => {
      const state = consctructorReducer(
        undefined,
        createPostRequest.rejected(testError)
      );

      expect(state).toEqual({
        order: null,
        status: "rejected",
        error: "error for test",
      });
    });
  });

  describe("createPostRequest", () => {
    it("should createPostRequest with resolve response", async () => {
      postOrder.mockResolvedValue(123);
      const dispatch = jest.fn();
      const thunk = createPostRequest();
      await thunk(dispatch, () => ({}));
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(4);

      const [start, openModal, clearIngrediets, end] = calls;
      expect(start[0].type).toBe(createPostRequest.pending().type);
      expect(openModal[0].type).toBe(openOrderDetailsModal.type);
      expect(clearIngrediets[0].type).toBe(clearSelectedIngredients.type);
      expect(end[0].type).toBe(createPostRequest.fulfilled().type);
    });

    it("should createPostRequest with reject response", async () => {
      postOrder.mockRejectedValue(testError);
      const dispatch = jest.fn();
      const thunk = createPostRequest();
      await thunk(dispatch, () => ({}));
      const { calls } = dispatch.mock;
      console.log(calls);
      expect(calls).toHaveLength(3);
      const [start, openModal, end] = calls;
      expect(start[0].type).toBe(createPostRequest.pending().type);
      expect(openModal[0].type).toBe(openOrderDetailsModal.type);
      expect(end[0].type).toBe(createPostRequest.rejected().type);
    });
  });
});

import { Middleware, MiddlewareAPI } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { WebSocketOrdersState, WebSocketActions } from "../../utils/types";
import { AppDispatch, RootState } from "../store";
import { getUser } from "../user-slice";
import { wsActions } from "../websocket-slice";

export const socketMiddlewara = (
  // wsUrl: string,
  wsActions: WebSocketActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let ws: WebSocket | null = null;

    return (next) => (action: PayloadAction<string>) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      const { onClose, onError, onMessage, onOpen, wsInit } = wsActions;

      if (type === wsInit) {
        ws = new WebSocket(payload);
        console.log('старт')
      }
      if (ws) {
        ws.onopen = () => {
          dispatch({ type: onOpen });
        };
        ws.onerror = () => {
          dispatch({ type: onError });
        console.log('ошибка')

        };
        ws.onmessage = (event: MessageEvent<string>) => {
        
          const { data } = event;
          const parsedData = JSON.parse(data) as WebSocketOrdersState & {
            message: string;
          };
          if (parsedData && parsedData.message === "Invalid or missing token") {
            void dispatch(getUser());
          }
          const { ...restParsedData } = parsedData;
          if (restParsedData.orders) {
            restParsedData.orders.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          }

          dispatch({
            payload: restParsedData,
            type: onMessage,
          });
        };

        ws.onclose = () => {
        console.log("сокет закрыт");

          dispatch({ type: onClose });
        };
      }
      next(action);
    };
  };
};

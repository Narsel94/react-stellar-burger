import { PropsWithChildren, ReactNode } from "react";

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredientWithUuidId = TIngredient & { uuidId: string };

export type TBurgerIngredientProps = {
  ingredient: TIngredient;
};

export type TIngredientsListProps = {
  type: string;
  data: TIngredient[];
  innerRef: React.LegacyRef<HTMLDivElement> | undefined;
  name: string;
};

export type TConstructorCardProps = {
  item: TIngredientWithUuidId;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
};

export type TSectionProps = {
  children: ReactNode;
};

export type TModalPropsT = {
  onClose: () => void;
};

export type TModalProps = PropsWithChildren<TModalPropsT>;

export type TOverlayProps = {
  onClose: () => void;
};

export type TProtectedRouteProps = {
  onlyUnAuth: boolean;
  component: JSX.Element;
};

export type TAuthProps = {
  component: JSX.Element;
};

export type TSelectedIngredients = {
  bun: TIngredientWithUuidId | null;
  filings: Array<TIngredientWithUuidId>;
};

// стейт клнструктора

export type TConstructorState = {
  order: number | null;
  status: string | null;
  error: any;
};

// тип данных юзера
export type TUser = {
  email: string;
  name: string;
};

// стейт юзера
export type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

//стейт ингредиетов
export type TIngredientState = {
  ingredients: TIngredient[];
  selectedIngredients: TSelectedIngredients;
  draggedIngredient: TIngredientWithUuidId | null;
  currentIngredient: TIngredient | null | unknown;
  status: string;
  error: string | undefined | null;
};

// стейт модального окна
export type TModalState = {
  isOrderModalOpen: boolean;
  isIngredientModalOpen: boolean;
  isModalOpen: boolean;
};

//ASync Types

export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = {
  email: string;
  password: string;
  name: string;
};

export type TPatchUserData = {
  email?: string;
  password?: string;
  name?: string;
};

// тип ответа на запрос ингредиентов

export type TGetIngredientsData = {
  success: boolean;
  data: TIngredient[];
};

// тип ответа сервера обновления токена

export type TRefreshTokenRes = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TChangePasswordRequest = {
  password: string;
  token: string;
};

export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

export type TRegistrResponse = TLoginResponse;

export type TGetUserData = Omit<TLoginResponse, "accessToken" | "refreshToken">;

export type TOwnerResponse = {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
};

export type TOrderResponse = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: TOwnerResponse;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TPostOrderResponse = {
  success: boolean;
  name: string;
  order: TOrderResponse;
};

export type TFeedCard = {
  order: TOrder;
};

export type TFeedIngredientsDetails = {
  id: string;
  count: number;
};

export type TFeedIngredient = {
  id: string;
  index: number;
  length: number;
};

export type WebSocketOrdersState = {
  orders: TOrder[];
  userOrders: TOrder[];
  total: number | undefined;
  totalToday: number | undefined;
  isConected: boolean;
};

//типы экшенов 
import { wsActions } from "../store/websocket-slice";

const {onClose, onError, onMessage, onOpen, wsInit, onUserMessage} = wsActions

//типы для мидлвары
export type WebSocketActions = {
  onClose: typeof onClose
  onError: typeof onError;
  onMessage: typeof onMessage;
  onOpen: typeof onOpen;
  wsInit: typeof wsInit;
  onUserMessage: typeof onUserMessage;
};

// заказа

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};
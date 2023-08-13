import { ReactNode } from "react";

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

export type TModalProps = {
  children: ReactNode;
  onClose: () => void;
};

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
  order: string[];
  status: string | null;
  error: string | null | undefined;
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

export type TRegistrData = {
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

export type TGetUserData = Omit<TLoginResponse, "accessToken" | "refreshToken">


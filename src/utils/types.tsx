import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";

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
  //мб переделать
  component?: any;
};

export type TIngredientState = {
  ingredients: TIngredient[];
  selectedIngredients: TSelectedIngredients;
  draggedIngredient: TIngredientWithUuidId | null;
  currentIngredient: TIngredient | null | unknown;
  status: string;
  error: string | undefined | null;
};

export type TSelectedIngredients = {
  bun: TIngredientWithUuidId | null;
  filings: Array<TIngredientWithUuidId>;
};

export type TConstructorState = {
  order: string[];
  status: string | null;
  error: string | null | undefined;
};

export type TUserState = {
  user: { email: string; name: string } | null;
  isAuthChecked: boolean;
};

export type TModalState = {
  isOrderModalOpen: boolean;
  isIngredientModalOpen: boolean;
  isModalOpen: boolean;
};

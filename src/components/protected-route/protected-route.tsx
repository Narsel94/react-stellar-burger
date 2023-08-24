import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TProtectedRouteProps, TAuthProps } from "../../utils/types";

import { setAuthChecked } from "../../store/user-slice";
import { checkUserAuth } from "../../store/user-slice";

import { userSelector } from "../../store/selectors/selectors";

const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector(userSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth: FC<TAuthProps> = ({ component }) => (
  <ProtectedRoute onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth: FC<TAuthProps> = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);

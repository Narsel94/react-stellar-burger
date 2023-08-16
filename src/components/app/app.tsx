import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import Preloader from "../loader/loader";
import { fetchIngredientsData } from "../../store/ingredients-slice";
import NotFound from "../../pages/not-found/not-found";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login/login";
import Layout from "../layout/layout";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import ProfileOrders from "../../pages/profile/profile-pages/profile-orders";
import ProfileBio from "../../pages/profile/profile-pages/profile-bio/profile-bio";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import ForgotePassword from "../../pages/forgot-password/forgote-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import Feeds from "../../pages/feeds/feeds";

function App() {
  const { status, error } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const orderback = location.state && location.state.orderback;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredientsData());
  }, []);

  if (status === "loading") {
    return (
      <div className={styles.container}>
        <Preloader />
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">
          Что-то пошло не так, error:{error}{" "}
        </h1>
      </div>
    );
  }
  return (
    <div className={styles.app}>
      <Routes location={background || location || orderback}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route path="/profile" element={<ProfileBio />} />
            <Route path="/profile/orders" element={<ProfileOrders />} />
            <Route path="/profile/orders/:id" element={<ProfileOrders />} />
          </Route>
          <Route path="ingredients/:id" element={<IngredientDetails />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/feeds/:id" element={<Feeds />} />

          <Route
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotePassword />} />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal onClose={() => navigate("/")}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {orderback && (
        <Routes>
          <Route
            path="/feeds/:id"
            element={
              <Modal onClose={() => navigate("/")}>
                <IngredientDetails />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;

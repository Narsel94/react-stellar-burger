import React from "react";
import { refreshTokenRequest, getUserRequest } from "../../../api/api";

function ProfileOrders() {
  const onClick = () => {
    getUserRequest()
      .then((res) => {
        if (res.success) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const crash = () => {
    localStorage.setItem("accesToken", "123aaa");
  };

  const refresh = () => {
    refreshTokenRequest().then((res) => {
      if (res.success) {
        localStorage.setItem("accesToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
    });
  };

  return (
    <div>
      История Заказов
      <h3>В разработке</h3>
      <button onClick={onClick} type="button">
        тест
      </button>
      <br />
      <br />
      <br />
      <button onClick={crash} type="button">
        Cломать токен
      </button>
      <br />
      <br />
      <br />
      <button onClick={refresh} type="button">
        Обновить токен
      </button>
    </div>
  );
}

export default ProfileOrders;

import {
  TGetIngredientsData,
  TLoginData,
  TRegisterData,
  TRefreshTokenRes,
  TPatchUserData,
  TChangePasswordRequest,
  TPostOrderResponse,
} from "../utils/types";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: { "Content-Type": "application/json" },
};

const responseStatus = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: Error) => Promise.reject(err));
};

function request(url: string, options: any) {
  return fetch(url, options).then(responseStatus);
}

//запрос для отправки заказа
export function postOrder(order: string[]) {
  return fetchWithRefresh(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accesToken"),
    },
    body: JSON.stringify({ ingredients: order }),
  }).then((result:TPostOrderResponse) => result.order.number);
}

// запрос для получения ингредиентов
export function getIngredientsData() {
  return request(`${config.baseUrl}/ingredients`, config.headers).then(
    (result: TGetIngredientsData) => result.data
  );
}

//запрос для авторизации
export function loginRequest(loginData: TLoginData) {
  return request(`${config.baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    }),
  });
}

// запрос для регистрации
export const registrationRequest = (formData: TRegisterData) => {
  return request(`${config.baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    }),
  });
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await responseStatus(res);
  } catch (error) {
     let e = error as Error;
    if (e.message === "jwt expired") {
      const refreshData: TRefreshTokenRes = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accesToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await responseStatus(res);
    } else {
      return Promise.reject(error);
    }
  }
};

//запрос для получения данных пользователя с обновлением токена
export const getUserRequest = () => {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accesToken"),
    },
  });
};

//запрос на обновление токена

export const refreshTokenRequest = () => {
  return request(`${config.baseUrl}/auth//token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const loqoutRequest = () => {
  return request(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//запрос на обновление данных пользователя
export const patchUser = (user: TPatchUserData) => {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accesToken"),
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name,
    }),
  });
};

//запрос на смену пароля

export const postEmailForResetPassword = (email: string) => {
  return request(`${config.baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

//смена пароля
export const passwordChangeRquest = (data: TChangePasswordRequest) => {
  return request(`${config.baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
  });
};


export const getOrder = (nubmer: number) => {
 return request(`${config.baseUrl}/orders/${nubmer}`, config.headers)
}

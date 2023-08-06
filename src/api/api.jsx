export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: { "Content-Type": "application/json" },
};

const responseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
  return fetch(url, options).then(responseStatus);
}

//запрос для отправки заказа
export function postOrder(order) {
  return request(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accesToken"),
    },
    body: JSON.stringify({ ingredients: order }),
  });
}

// запрос для получения ингредиентов
export function getIngredientsData() {
  return request(`${config.baseUrl}/ingredients`).then((result) => result.data);
}

//запрос для авторизации
export function loginRequest(loginData) {
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
export const registrationRequest = (formData) => {
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

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await responseStatus(res);
  } catch (error) {
    if (error.message === "jwt expired") {
      const refreshData = await refreshTokenRequest();
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
  return request("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken")
    })
  })
};


export const loqoutRequest = () => {
  return request(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }) 
  })
}

//запрос на обновление данных пользователя 
export const patchUser = (user) => {
  return request(`${config.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accesToken"),
    },
    body: JSON.stringify({
      email: user.email, 
      password: user.password, 
      name: user.name 
    })
  })
}

//запрос на смену пароля 

export const postEmailForResetPassword = (email) => {
  return request(`${config.baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email
    })
  })
}

//смена пароля 
export const passwordChangeRquest = (data) => {
  return request(`${config.baseUrl}/password-reset/reset`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token
    })

  }) 
}




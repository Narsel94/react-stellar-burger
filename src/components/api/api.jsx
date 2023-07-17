export const config = {
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
  headers: { "Content-Type": "application/json" },
};

const responseStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(responseStatus);
}

export function getIngredientData() {
  return request(`${config.baseUrl}`, {
    headers: config.headers,
  });
}

export function testRequest(){
  fetch(config)
}

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: { "Content-Type": "application/json" },
};

const responseStatus = (res) => {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject(`Ошибка: ${res.status}`)
}

function request(url, options) {
  return fetch(url, options).then(responseStatus)
}

export function postOrder(order) {
  return request(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: order }),
  });
}

export function getIngredientsData(){
  return request(`${config.baseUrl}/ingredients`)
    .then(result => result.data)
}




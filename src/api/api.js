const config = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '1a9d1eca-3f6b-4cef-9232-0e22b5dc9124',
    'Content-Type': 'application/json'
  },
}

export  const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`,
    {
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export  const getCards = () => {
  return fetch(`${config.baseUrl}/cards`,
    {
      headers: config.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}


export  const patchUser = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`,
    {
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      method: 'PATCH'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export  const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards `,
    {
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      method: 'POST'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}


export  const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`,
    {
      headers: config.headers,
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export  const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`,
    {
      headers: config.headers,
      method: 'PUT'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export  const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`,
    {
      headers: config.headers,
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export  const patchAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`,
    {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
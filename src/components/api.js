export {
    getUserInfo,
    getCards,
    updateUserProfile,
    addNewCard,
    deleteCardFromServer,
    toggleLike,
    updateUserAvatar,
};

const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
    headers: {
        authorization: "18d55e3c-466f-4dfc-9dfd-6044169d9965",
        "Content-Type": "application/json",
    },
};

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res.status)

const anyRequest = (url, options) => {
    return fetch(url, options)
    .then(res => checkResponse(res))
}

const getUserInfo = () => {
    return anyRequest(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    });
};

const getCards = () => {
    return anyRequest(`${config.baseUrl}/cards`, {
        headers: config.headers,
    });
};

const updateUserProfile = (updatedData) => {
    return anyRequest(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(updatedData),
    });
};

const addNewCard = (name, link) => {
    return anyRequest(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    });
};

const deleteCardFromServer = (cardId) => {
    return anyRequest(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    });
};

const toggleLike = (cardId, isLiked) => {
    const method = isLiked ? "DELETE" : "PUT";
    return anyRequest(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers,
    });
};

const updateUserAvatar = (url) => {
    return anyRequest(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: url,
        }),
    });
};
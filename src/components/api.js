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

const fetchData = (url) => {
    return fetch(url, {
        headers: config.headers,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const getUserInfo = () => {
    return fetchData(`${config.baseUrl}/users/me`);
};

const getCards = () => {
    return fetchData(`${config.baseUrl}/cards`);
};

const updateUserProfile = (updatedData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(updatedData),
    })
        .then((response) => {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    })
        .then((response) => {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

function toggleLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUserAvatar(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: url,
        }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

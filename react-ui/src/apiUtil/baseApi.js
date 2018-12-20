import {API_BASE_URL_DEVELOPMENT, API_BASE_URL_PRODUCTION, ACCESS_TOKEN} from '../constants';

const API_URL = API_BASE_URL_DEVELOPMENT;

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

// export function getEvents() {
//     return request({
//         url: API_URL + "/api/v1/events",
//         method: 'GET'
//     });
// }

export function apiRequest(method, url) {
    return request({
        url: API_URL + url,
        method: method
    })
}

export function apiRequestWithBody(method, url, body) {
    return request({
        url: API_URL + url,
        method: method,
        body: JSON.stringify(body)
    })
}

export function login(loginRequest) {
    return request({
        url: API_URL + "/api/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_URL + "/api/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_URL + "/api/v1/users/me",
        method: 'GET'
    });
}
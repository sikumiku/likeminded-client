import {apiRequest, apiRequestWithBody} from "./baseApi";

export function updateUser(id, request) {
    return apiRequestWithBody('PUT', '/api/v1/users/'+ id, request);
}

export function getFullCurrentUserData() {
    return apiRequest('GET', '/api/v1/users/me/full');
}

export function deleteUsersFavoriteGame(param) {
    return apiRequest('DELETE', '/api/v1/users/me/favoriteGames?gameName=' + param);
}

export function getMyEvents() {
    return apiRequest('GET', '/api/v1/users/me/events');
}

export function getMyGroups() {
    return apiRequest('GET', '/api/v1/users/me/groups');
}
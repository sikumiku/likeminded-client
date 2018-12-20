import {apiRequest, apiRequestWithBody} from "./baseApi";

export function getGroups() {
    return apiRequest('GET', '/api/v1/groups');
}

export function postGroup(request) {
    return apiRequestWithBody('POST', '/api/v1/groups', request);
}

export function putGroup(id, request) {
    return apiRequestWithBody('PUT', '/api/v1/groups/' + id, request);
}

export function deleteGroup(id) {
    return apiRequest('DELETE', '/api/v1/groups/' + id);
}
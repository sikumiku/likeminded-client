import {apiRequest, apiRequestWithBody} from "./baseApi";

export function getEvents() {
    return apiRequest('GET', '/api/v1/events');
}

export function postEvent(request) {
    return apiRequestWithBody('POST', '/api/v1/events', request);
}

export function putEvent(id, request) {
    return apiRequestWithBody('PUT', '/api/v1/events/' + id, request);
}

export function deleteEvent(id) {
    return apiRequest('DELETE', '/api/v1/events/' + id);
}

export function addUsersToEvent(id, userIds, groupIds) {
    return apiRequest('PUT', '/api/v1/events/' + id + '/invite?userIds=' + userIds + '&groupIds=' + groupIds);
}
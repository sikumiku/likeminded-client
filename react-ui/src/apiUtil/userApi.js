import {apiRequest, apiRequestWithBody} from "./baseApi";

export function updateUser(id, request) {
    return apiRequestWithBody('PUT', '/api/v1/users/'+ id);
}

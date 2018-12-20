import {apiRequest} from "./baseApi";

export function getPeople() {
    return apiRequest('GET', '/api/v1/people');
}
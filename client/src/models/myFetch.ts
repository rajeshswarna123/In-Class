const API_URL = 'http://localhost:3001/api/';

export function api(url: string, body?: any, method?: 'GET', headers?: HeadersInit) {
    let options: RequestInit = {};
    if (body) {
        options = {
            method: method ?? 'POST', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        }
    };


    return fetch(API_URL + url).then(res => res.json());
}
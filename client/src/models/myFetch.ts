const API_URL = 'http://localhost:3001/api/';

export function api(url: string){
    return fetch(
        API_URL + url).then(res => res.json());
}
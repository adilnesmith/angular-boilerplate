import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    request(method: string, url: string, data?: any) {
        const apiUrl = `http://localhost:8000/${url}`;
        return this.http.request(method, apiUrl, { body: data });
    }

    get(url: string) {
        return this.request('GET', url);
    }

    post(url: string, data: any) {
        return this.request('POST', url, data);
    }

    put(url: string, data: any) {
        return this.request('PUT', url, data);
    }

    delete(url: string, data?: any) {
        return this.request('DELETE', url, data);
    }
}

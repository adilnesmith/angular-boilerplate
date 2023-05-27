import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './lib/types/user';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

    request(method: string, url: string, data?: any) {
        const apiUrl = `http://localhost:8000/${url}`;
        const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF1dGhAZ21haWwuY29tIiwiaWF0IjoxNjg1MjAyMTkwfQ.MR6aeOtC8_UuelY-Wy_WjUcAekwwQi1gqDiZyNKmxq0');
        return this.http.request(method, apiUrl, { body: data, headers });
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

    delete(url: string) {
        return this.request('DELETE', url);
    }
}

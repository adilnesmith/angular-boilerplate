import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './lib/types/user';
import { LocalStorageService } from './services/localStorage.service';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    request(method: string, url: string, data?: any) {
        const apiUrl = `http://localhost:8000/${url}`;
        const userJson = this.localStorageService.get("user");
        const userObj = userJson !== null ? JSON.parse(userJson) : null;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + userObj?.access_token);
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

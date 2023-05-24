import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://api.publicapis.org/entries';

    constructor(private http: HttpClient) { }

    getEntries() {
        return this.http.get(this.apiUrl);
    }
}
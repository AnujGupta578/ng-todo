import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
var BASE_API_URL = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient) {

    }

    saveTodoTask(data: any): Observable<any> {
        return this.http.post(`${BASE_API_URL}task/save`, data);
    }

    updateTodoTaskById(id: any, data: any): Observable<any> {
        return this.http.put(`${BASE_API_URL}task/${id}`, data);
    }

    removeTodoTaskById(id: any): Observable<any> {
        return this.http.delete(`${BASE_API_URL}task/${id}`);
    }

    getCompletedTask(): Observable<any> {
        return this.http.get(`${BASE_API_URL}task/completed`);
    }

    getInProgressTask(): Observable<any> {
        return this.http.get(`${BASE_API_URL}task/inprogress`);
    }

    getTodoTasks(): Observable<any> {
        return this.http.get(`${BASE_API_URL}tasks`);
    }
}
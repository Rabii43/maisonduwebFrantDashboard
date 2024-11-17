import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {STATUS_USER, USER, USER_PROFILE} from '../../../api/entryPoint';
import {UserApiModel} from "../_models/users";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers(page?: number, maxpage?: number, name: string = ''): Observable<UserApiModel[]> {
    return this.http.get<UserApiModel[]>(`${USER}?page=${page}&maxpage=${maxpage}&name=${name}`);
  }

  changeStausUser(email: string, status: boolean): Observable<any> {
    return this.http.post<any>(`${STATUS_USER}`, {email: email, active: status});
  }

  addUser(userAdd: UserApiModel): Observable<any> {
    return this.http.post<any>(`${USER}`, userAdd);
  }

  updateUser(id: number, userBody: any): Observable<any> {
    return this.http.post<any>(`${USER}/${id}`, userBody);
  }

  updateProfileUser(id: number, userBody: any): Observable<any> {
    return this.http.post<any>(`${USER_PROFILE}/${id}`, userBody);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${USER}/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${USER}/${id}`);
  }
}

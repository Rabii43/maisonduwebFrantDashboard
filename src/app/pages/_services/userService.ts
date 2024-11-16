import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {statusUser, userProfile, user} from '../../../api/entryPoint';
import {User, UserApiModel} from "../_models/users";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllUsers(page?: number, maxpage?: number,name:string=''): Observable<UserApiModel[]> {
    return this.http.get<UserApiModel[]>(`${user}?page=${page}&maxpage=${maxpage}&name=${name}`);
  }

  changeStausUser(email: string, status: boolean): Observable<any> {
    return this.http.post<any>(`${statusUser}`, {email: email, active: status});
  }

  addUser(userAdd: UserApiModel): Observable<any> {
    return this.http.post<any>(`${user}`, userAdd);
  }
  updateUser(id: number,userBody: any): Observable<any> {
    return this.http.post<any>(`${user}/${id}`, userBody);
  }
  updateProfileUser(id: number,userBody: any): Observable<any> {
    return this.http.post<any>(`${userProfile}/${id}`, userBody);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${user}/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${user}/${id}`);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {article} from '../../../api/entryPoint';
import {Article} from "../_models/article";



@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) {
  }

  getAllArticles(page?: number, maxpage?: number,name:string=''): Observable<Article[]> {
    return this.http.get<Article[]>(`${article}?page=${page}&maxpage=${maxpage}&name=${name}`);
  }

  addArticle(articleAdd: Article): Observable<any> {
    return this.http.post<any>(`${article}/create`, articleAdd);
  }
  updateArticle(id: number,articleBody: any): Observable<any> {
    return this.http.put<any>(`${article}/${id}`, articleBody);
  }

  getArticle(id: number): Observable<any> {
    return this.http.get<any>(`${article}/${id}`);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(`${article}/${id}`);
  }
}

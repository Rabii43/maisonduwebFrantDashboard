import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {articleType} from '../../../api/entryPoint';
import {ArticleType} from "../_models/articleType";


@Injectable({
  providedIn: 'root'
})
export class ArticleTypeService {
  constructor(private http: HttpClient) {
  }

  getAllArticleTypes(page?: number, maxpage?: number,name:string=''): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(`${articleType}?page=${page}&maxpage=${maxpage}&name=${name}`);
  }

  addArticleType(articleTypeAdd: ArticleType): Observable<any> {
    return this.http.post<any>(`${articleType}/create`, articleTypeAdd);
  }
  updateArticleType(id: number,articleTypeBody: any): Observable<any> {
    return this.http.put<any>(`${articleType}/${id}`, articleTypeBody);
  }

  getArticleType(id: number): Observable<any> {
    return this.http.get<any>(`${articleType}/${id}`);
  }

  deleteArticleType(id: number): Observable<any> {
    return this.http.delete<any>(`${articleType}/${id}`);
  }
}

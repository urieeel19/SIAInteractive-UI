import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Result } from '../models/result.model';
import { configs } from 'src/config/config.dev';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${configs.environment.apiURL}/categories`;

  constructor(private http: HttpClient) {}

  get(): Observable<Result<Category[]>> {
    return this.http.get<Result<Category[]>>(this.apiUrl);
  }

}

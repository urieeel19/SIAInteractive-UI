import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Result } from '../models/result.model';
import { ProductDto } from '../dtos/product.dto';
import { configs } from 'src/config/config.dev';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${configs.environment.apiURL}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Result<Product[]>> {
    return this.http.get<Result<Product[]>>(this.apiUrl);
  }

  getProductById(id: number): Observable<Result<Product>> {
    return this.http.get<Result<Product>>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductDto): Observable<Result<Product>> {
    const { productId, ...productCreatedto } = product;
    return this.http.post<Result<Product>>(this.apiUrl, productCreatedto);
  }

  updateProduct(id: number, product: ProductDto): Observable<Result<Product>> {
    return this.http.put<Result<Product>>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Result<void>> {
    return this.http.delete<Result<void>>(`${this.apiUrl}/${id}`);
  }
}

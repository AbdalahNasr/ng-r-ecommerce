import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EcommerceDataService {
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private _HttpClient: HttpClient) {}

  fetchAllProducts(): Observable<any> {
    return this._HttpClient.get<any>('https://ecommerce.routemisr.com/api/v1/products').pipe(
      tap(res => this.productsSubject.next(res.data))
    );
  }

  // Example: filter products by minimum price
  getProductsByMinPrice(minPrice: number): Observable<any[]> {
    return this.products$.pipe(
      map(products => products.filter(p => p.price >= minPrice))
    );
  }

  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  getProductSpecificDetails(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  getProductsPaginated(page: number = 1, limit: number = 20): Observable<any> {
    return this._HttpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`);
  }
}



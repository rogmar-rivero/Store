import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor( private http: HttpClient) { }

    getProducts():Observable<Product[]>{
      return this.http.get<Product[]>(`${environment.apiURL}/products`);
    }

    updateStock(productId: number ,stock: number) {
      const body = {"stock":stock};
      return this.http.patch(`${environment.apiURL}/products/${productId}`,body)
    }
}

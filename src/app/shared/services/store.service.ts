import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Stores } from '../interface/stores.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient){ }

  getStores(): Observable<Stores[]>{
    return this.http.get<Stores[]>( `${environment.apiURL}/stores`);
  }
}
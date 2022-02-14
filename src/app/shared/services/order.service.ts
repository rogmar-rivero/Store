import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { DetailsOrders, Order } from "../interface/order.interface";


@Injectable({
  providedIn: 'root'
})
export class OderService {
  constructor(private http: HttpClient){}

  saveOrder(order:Order):Observable<Order>{
    return this.http.post<Order>(`${environment.apiURL}/orders`,order);
  };
  
  saveDetailsOrder(details:DetailsOrders):Observable<DetailsOrders> {
    return this.http.post<DetailsOrders>(`${environment.apiURL}/detailsOrders`,details)
  };
}
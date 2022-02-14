import { Component } from "@angular/core";
import { ShoppingCartServices } from "../../services/shopping-cart.service";



@Component({
  selector: 'app-cart',
  template: `
  <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async } as DataCart">
   
  <ng-container *ngIf="DataCart.total">
    <mat-icon> add_shopping_cart</mat-icon>
    {{ DataCart.total | currency }}
    ({{ DataCart.quantity }})
  </ng-container>

  </ng-container>
  `,
})

export class CartComponent {

  quantity$ = this.shoppinCartSvc.quantityAction$;
  cart$ = this.shoppinCartSvc.cartAction$;
  total$ = this.shoppinCartSvc.totalAction$;
  
  
  constructor( private shoppinCartSvc:ShoppingCartServices){}
  

}
import { Component, OnInit } from '@angular/core';
import { ShoppingCartServices } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  displayedColumns:string[] = ['item','quantity','priceUnit','subTotal'];
  total$ = this.ShoppingCartSvc.totalAction$;
  cart$ = this.ShoppingCartSvc.cartAction$;

  constructor(private ShoppingCartSvc: ShoppingCartServices) { }

  ngOnInit(): void {
  }

}

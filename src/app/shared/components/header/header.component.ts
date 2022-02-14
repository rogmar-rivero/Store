import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartServices } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  quantity$= this.shoppinCartSvc.quantityAction$;
  cart$= this.shoppinCartSvc.cartAction$;
  total$= this.shoppinCartSvc.totalAction$;

  constructor(private route: Router, private shoppinCartSvc: ShoppingCartServices){}

  goToCheckout(){
    this.route.navigate(['/checkout'])
  }
}

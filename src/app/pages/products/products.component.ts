import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartServices } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interface/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor(
    private productsSvc: ProductsService,
    private shoppingCartSvc: ShoppingCartServices
  ) { }

  ngOnInit(): void {
    this.productsSvc.getProducts()
    .pipe(
      tap( (products: Product[]) => this.products = products )
    )
    .subscribe();
  }

  addToCart(product:Product) {
    this.shoppingCartSvc.updateCart(product);
  }

  
}
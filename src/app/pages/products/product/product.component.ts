import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input()product!: Product;
  
  @Output()addCart = new EventEmitter<Product>();

  onClick(): void {
    this.addCart.emit(this.product);
  }
}

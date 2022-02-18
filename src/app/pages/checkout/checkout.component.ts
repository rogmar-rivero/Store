import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap,tap } from 'rxjs';


import { Details,Order } from 'src/app/shared/interface/order.interface';
import { Stores } from 'src/app/shared/interface/stores.interface';
import { OderService } from 'src/app/shared/services/order.service';
import { ShoppingCartServices } from 'src/app/shared/services/shopping-cart.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Product } from '../products/interface/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  stores: Stores[] = [];

  isDelivery: boolean = false;
  cart: Product[] = [];

  checkoutForm!: FormGroup;

  constructor(private storeSvc: StoreService,
      private orderSvc: OderService,
      private shoppingCartSvc: ShoppingCartServices,
      private route: Router,
      private productsSvc: ProductsService,
      private readonly fb: FormBuilder
  ){ }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.preparateDetils();
    this.checkoutForm = this.instantForm();
  }

  
  instantForm():FormGroup {
    return this.fb.group({
      name: ['',[Validators.required,Validators.minLength(4)]],
      store: ["",Validators.required],
    })
  }


  onSubmit({value}:FormGroup){
    console.log("guardar =>",value);

    const data:Order = {
      ...value,
      date: this.getCurrentDate(),
      pickup: this.isDelivery
    }

    this.orderSvc.saveOrder(data)
    .pipe(
      switchMap((order)=> {
        const orderId= order.id;
        const details = this.preparateDetils();
        return this.orderSvc.saveDetailsOrder({details,orderId});
         
      }),
      tap(()=> this.route.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(()=> this.shoppingCartSvc.resetCart())
    )
    .subscribe();
  }
  
  onPickupOrDelivery(value: boolean):void {
    this.isDelivery = value;
  }

  private getStores(){
    this.storeSvc.getStores()
    .pipe( 
      tap((store:Stores[]) => this.stores = store),
      tap(res => console.log(res))
    )
    .subscribe();
  }

  private getCurrentDate():string {
    return new Date().toLocaleDateString();
  }

  private preparateDetils(): Details[] {
    const details:Details[] = [];
    this.cart.forEach(product => {
      const {id:orderId, name:productName, stock, quantity} = product;
      const updateStock = (stock - quantity);

      this.productsSvc.updateStock(orderId,updateStock)
      .pipe(
        tap( ()=> details.push({orderId ,productName,quantity}))
      )
      .subscribe();

    })
      return details;
  }

  private getDataCart() {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap(( products:Product[])=> this.cart = products)
    )
    .subscribe();
  }
}
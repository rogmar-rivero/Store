import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";

@Injectable({
  providedIn:'root'
})

export class ShoppingCartServices {

products: Product[] = [];

 private cartSubject = new BehaviorSubject<Product[]>([]);
 private totalSubject = new BehaviorSubject<number>(0);
 private quantitySubject = new BehaviorSubject<number>(0);


 get cartAction$(): Observable<Product[]> {
   return this.cartSubject.asObservable();
 }

 get totalAction$(): Observable<number> {
   return this.totalSubject.asObservable();
 }

 get quantityAction$(): Observable<number> {
   return this.quantitySubject.asObservable();
 }

 private addToCart(product:Product): void {
   const isProductCart = this.products.find(({id})=> id === product.id);

   if(isProductCart) {
    isProductCart.quantity += 1;
   }else {
    this.products.push({...product, quantity: 1});
   }

   this.cartSubject.next(this.products);
 }

 private quantityProducts(): void {
  const quantity = this.products.reduce((acc,produc) => acc += produc.quantity,0);
  this.quantitySubject.next(quantity);
  }

 private calcTotal(): void {
   const total = this.products.reduce((acc,produc) => acc += (produc.price * produc.quantity),0);
   this.totalSubject.next(total);
 }


  updateCart(product: Product) {
    this.addToCart(product);
    this.calcTotal();
    this.quantityProducts();
  }

  resetCart(){
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);

    this.products = [];
  }

}
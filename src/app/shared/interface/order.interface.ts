
export interface Order {
  id: number,
  name: string,
  date: string,
  shippingAddress: string,
  city: string,
  pickup: boolean,
}

export interface Details {
  productName: string;
  quantity: number; 
  orderId: number;
}

export interface DetailsOrders {
  details: Details[];
  orderId: number;
}
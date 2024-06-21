export interface IProduct {
  id: string | number;
  name: string;
  amount: number;
  price: number;
}

export interface CartItem {
  product: IProduct;
  quantity: number;
}

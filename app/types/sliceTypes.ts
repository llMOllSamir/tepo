import { Category, Product } from "./productsTypes";

export type CartProduct = {
  count: number;
  price: number;
  _id: string;
  product: Product;
};
// cart type
export type CartState = {
  cartList: CartProduct[];
  numOfCartItems: number | null;
  cartId: string | null;
  totalCartPrice: number;
  status: {
    loading: boolean;
    status: "idle" | "pending" | "success" | "failed";
    product: string | null;
  };
  error: any;
};
//  wish list type
export type WishListState = {
  count: number;
  wishList: string[];
};
// user type
export type User = {
   name: string;
  email: string;
  role: string;
};
export type UserAddress = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};
export type UserState = {
  token: string | null;
  user: User | null;
  address: UserAddress[];
  status: "idle" | "pending" | "success" | "failed";
  error: string | null;
};

// categories type
export type CategoryState = {
  categoriesList: Category[];
};
// product type
export type ProductState = {
  productList: Product[];
};

// Order type
export type OrderType = {
  cartItems: CartProduct[];
  createdAt: string;
  id: number;
  isDelivered: boolean;
  isPaid: boolean;
  paidAt?: string;
  paymentMethodType: string;
  shippingAddress: Omit<UserAddress, "_id">;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  updatedAt: string;
  user: User;
  _id: string;
};

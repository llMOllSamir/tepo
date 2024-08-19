import { Category, Product } from "./productsTypes";

// cart type
export type CartState = {
  cartList: any[];
  numOfCartItems: number | null;
  totalCartPrice: number;
  status: {
    loading: boolean;
    status: "idle" | "pending" | "success" | "failed";
    product: any;
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
};

// categories type
export type CategoryState = {
  categoriesList: Category[];
};
// product type
export type ProductState = {
  productList: Product[];
};

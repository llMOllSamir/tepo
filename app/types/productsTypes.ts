export type Product = {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
  count?: number;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type Brand = Category & {};

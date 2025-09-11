export type Product = {
  _id: string;
  _type: "product";
  title: string;
  subtitle: string;
  price: number;
  meta?: string;
  image?: string;
  badge?: {
    label: string;
    tone: string;
  };
};

export type ProductDetail = {
  _id: string;
  _type: "product";
  _updatedAt: string;
  title: string;
  subtitle: string;
  description: string;
  gender: string; // e.g. "Men"

  price: number;
  meta?: string;

  badge?: {
    label: string;
    tone: string;
  };

  images: {
    _key: string;
    _type: "image";
    asset: {
      _ref?: string;
      _id?: string;
      url?: string;
    };
  }[];

  sizes: string[];

  reviews: {
    _key: string;
    user: string;
    comment: string;
    rating: number; // 1–5
  }[];
};

export type ProductCart = {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  image?: string;
};

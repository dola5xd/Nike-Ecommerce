import { Product, ProductDetail } from "@/_types/product";
import { client } from "./sanity/client";
import {
  ItemQueryPrice,
  productQuery,
  productQueryGender,
} from "./sanity/queries";
import { CartItemQueryID } from "@/_lib/sanity/queries";
import { ProductCart } from "@/_types/product";

export const getProductByName = async (slug: string) => {
  try {
    // 1) convert slug into title
    const title = slug.replaceAll("-", " ");

    // 2) get product
    const product = await client.fetch(productQuery, { title });

    return product.at(0) as ProductDetail;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    throw new Error(errorMessage);
  }
};

export const getProductSuggest = async (id: string, gender: string) => {
  try {
    const products = await client.fetch(productQueryGender, { id, gender });
    if (products.length < 3) return products as Product[];

    // shuffle them
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    // return 3 random
    return shuffled.slice(0, 3) as Product[];
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    throw new Error(errorMessage);
  }
};

export const getProductByID = async (id: string) => {
  try {
    const product = await client.fetch(CartItemQueryID, { id });

    return product.at(0) as ProductCart;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    throw new Error(errorMessage);
  }
};

export const getProductPrice = async (id: string) => {
  try {
    const product = await client.fetch(ItemQueryPrice, { id });

    return product.at(0) as ProductCart;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    throw new Error(errorMessage);
  }
};

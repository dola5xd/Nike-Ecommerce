import { Product, ProductDetail } from "@/_types/product";
import { client } from "./client";
import { productQuery, productQueryGender } from "./queries";

export const getProductByName = async (slug: string) => {
  try {
    // 1) convert slug into title
    const title = slug.replaceAll("-", " ");

    // 2) get product
    const product = await client.fetch(productQuery, { title });

    // 3) return only product
    return product.at(0) as ProductDetail;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const getProductSuggest = async (id: string, gender: string) => {
  try {
    const products = await client.fetch(productQueryGender, { id, gender });

    // shuffle them
    const shuffled = [...products].sort(() => Math.random() - 0.5);

    // return 3 random
    return shuffled.slice(0, 3) as Product[];
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something gone wrong!";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

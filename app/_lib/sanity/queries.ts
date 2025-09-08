export const PRODUCTS_QUERY = `
*[_type == "product" 
  && (!defined($meta) || lower(meta) == lower($meta))
  && (!defined($subtitle) || lower(subtitle) == lower($subtitle))
  && (!defined($minPrice) || price >= $minPrice)
  && (!defined($maxPrice) || price <= $maxPrice)
]{
  _id,
  title,
  subtitle,
  price,
  meta,
  "image": images[0].asset,
  badge,
}
`;

export const HOME_PRODUCTS_QUERY = `
  *[_type == "product" 
  ][0...3]{
    _id,
    title,
    subtitle,
    price,
    meta,
    gender,
    "image": images[0].asset,
    badge,
  }
`;

export const productQuery = `
*[_type == "product" && (!defined($title) || lower(title) == lower($title))]
{
  _id,
  title,
  subtitle,
  price,
  meta,
  images,
  reviews,
  sizes,
  badge,
  description,
  gender,
  _updatedAt
}
`;

export const productQueryGender = `
*[_type == "product" && (!defined($id) || lower(_id) != lower($id)) && (!defined($gender) || lower(gender) == lower($gender))] [0...6]{
    _id,
    title,
    subtitle,
    price,
    meta,
    gender,
    "image": images[0].asset,
    badge,
  }
`;

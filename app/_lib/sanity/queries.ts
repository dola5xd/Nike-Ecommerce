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

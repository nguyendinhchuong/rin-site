import groq from 'groq';

// Page queries
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    content,
    seo,
    publishedAt,
    status
  }
`;

export const allPagesQuery = groq`
  *[_type == "page" && language == $language && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    publishedAt
  }
`;

// Post queries
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    language,
    excerpt,
    mainImage,
    author,
    publishedAt,
    content,
    categories[]->{
      name,
      slug
    },
    seo,
    status
  }
`;

export const allPostsQuery = groq`
  *[_type == "post" && language == $language && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    language,
    excerpt,
    mainImage,
    author,
    publishedAt,
    categories[]->{
      name,
      slug
    }
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post" && language == $language && status == "published"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    language,
    excerpt,
    mainImage,
    author,
    publishedAt
  }
`;

// Product queries
export const productQuery = groq`
  *[_type == "product" && slug.current == $slug && language == $language][0] {
    _id,
    name,
    slug,
    language,
    description,
    images,
    price,
    category->{
      name,
      slug
    },
    specifications,
    features,
    content,
    seo,
    status
  }
`;

export const allProductsQuery = groq`
  *[_type == "product" && language == $language && status == "published"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    language,
    description,
    images,
    price,
    category->{
      name,
      slug
    }
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && language == $language && status == "published" && category._ref == $categoryId] | order(_createdAt desc) {
    _id,
    name,
    slug,
    language,
    description,
    images,
    price,
    category->{
      name,
      slug
    }
  }
`;

// Hero Banner queries
export const heroBannersQuery = groq`
  *[_type == "heroBanner" && language == $language && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    backgroundImage,
    ctaText,
    ctaLink,
    order
  }
`;

// Category queries
export const categoriesQuery = groq`
  *[_type == "category" && language == $language] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image
  }
`;

// Site Settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $language][0] {
    siteName,
    siteDescription,
    logo,
    contactEmail,
    contactPhone,
    address,
    socialMedia,
    categorySection,
    seo
  }
`;


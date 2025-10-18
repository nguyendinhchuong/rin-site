import type { Organization, WebSite, Article, Product, BreadcrumbList } from 'schema-dts';

export const generateOrganizationSchema = (
  siteName: string,
  siteUrl: string,
  logo?: string,
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  }
): Organization => {
  const socialProfiles = socialMedia
    ? Object.values(socialMedia).filter(Boolean)
    : [];

  return {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: logo || `${siteUrl}/logo.png`,
    sameAs: socialProfiles,
  };
};

export const generateWebSiteSchema = (
  siteName: string,
  siteUrl: string,
  searchUrl?: string
): WebSite => {
  const schema: WebSite = {
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
  };

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
};

export const generateArticleSchema = (
  title: string,
  description: string,
  url: string,
  publishedAt: string,
  author: string,
  image?: string
): Article => {
  return {
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    image: image,
  };
};

export const generateProductSchema = (
  name: string,
  description: string,
  url: string,
  price?: number,
  image?: string
): Product => {
  const schema: Product = {
    '@type': 'Product',
    name: name,
    description: description,
    url: url,
    image: image,
  };

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'VND',
    };
  }

  return schema;
};

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): BreadcrumbList => {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const getCanonicalUrl = (pathname: string, baseUrl: string): string => {
  return `${baseUrl}${pathname}`;
};

export const getAlternateLinks = (
  pathname: string,
  baseUrl: string,
  languages: string[]
): Array<{ lang: string; url: string }> => {
  return languages.map((lang) => ({
    lang,
    url: `${baseUrl}/${lang}${pathname.replace(/^\/(vi|en)/, '')}`,
  }));
};


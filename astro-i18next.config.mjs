/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: 'vi',
  locales: ['vi', 'en'],
  routes: {
    vi: {
      about: 'gioi-thieu',
      products: 'san-pham',
      services: 'dich-vu',
      contact: 'lien-he',
      blog: 'tin-tuc',
    },
    en: {
      about: 'about',
      products: 'products',
      services: 'services',
      contact: 'contact',
      blog: 'blog',
    },
  },
  showDefaultLocale: true,
};


import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SanityImage } from './SanityImage';

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  images?: Array<{
    asset: {
      _ref: string;
    };
    alt?: string;
  }>;
  price?: number;
}

interface ProductCardProps {
  product: Product;
  urlFor: (source: any) => any;
  locale: string;
}

const ProductCard = ({ product, urlFor, locale }: ProductCardProps) => {
  const productUrl = `/${locale}/products/${product.slug.current}`;

  const viewDetailsText = locale === 'vi' ? 'Xem chi tiết' : 'View Details';
  const priceLabel = locale === 'vi' ? 'VND' : 'VND';

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden">
        {product.images?.[0] ? (
          <SanityImage
            image={product.images[0]}
            alt={product.images[0].alt || product.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        {product.price && (
          <CardDescription className="text-lg font-semibold text-primary">
            {product.price.toLocaleString()} {priceLabel}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={productUrl}>{viewDetailsText}</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;


import { Card, CardContent } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity';

interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

interface CategoryCardProps {
  category: Category;
  locale: string;
}

const CategoryCard = ({ category, locale }: CategoryCardProps) => {
  const imageUrl = category.image
    ? urlFor(category.image).width(400).height(300).url()
    : null;

  const handleClick = () => {
    window.location.href = `/${locale}/products?category=${category.slug.current}`;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${category.name} category`}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={category.image?.alt || category.name}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100">
              <svg
                className="h-20 w-20 text-muted-foreground/40 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* View Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="rounded-full bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
              <span className="flex items-center gap-2">
                View Category
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        <div className="relative bg-background p-6">
          <h3 className="text-center text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          )}
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-gradient-to-r from-primary/50 via-primary to-primary/50 transition-all duration-300 group-hover:w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;


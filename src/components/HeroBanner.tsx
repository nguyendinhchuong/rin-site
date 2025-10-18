import * as React from 'react';
import { Button } from '@/components/ui/button';

interface HeroBanner {
  _id: string;
  title: string;
  subtitle?: string;
  backgroundImage?: {
    asset: {
      _ref: string;
    };
  };
  ctaText?: string;
  ctaLink?: string;
}

interface HeroBannerProps {
  banners: HeroBanner[];
  urlFor: (source: any) => any;
}

const HeroBanner = ({ banners, urlFor }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Simple image loading state
  React.useEffect(() => {
    if (!banners || banners.length === 0) return;
    
    const currentBanner = banners[currentIndex];
    if (!currentBanner?.backgroundImage) {
      setImageLoaded(true);
      return;
    }

    setImageLoaded(false);
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
    img.src = urlFor(currentBanner.backgroundImage).width(1920).height(600).url();
  }, [currentIndex, banners, urlFor]);

  React.useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden md:h-[600px]">
      {/* Fallback background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
      
      {/* Current banner image */}
      {currentBanner?.backgroundImage && (
        <img
          src={urlFor(currentBanner.backgroundImage).width(1920).height(600).url()}
          alt={currentBanner.title}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
          decoding="async"
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">{currentBanner?.title}</h1>
          {currentBanner?.subtitle && (
            <p className="mb-8 text-lg md:text-xl">{currentBanner.subtitle}</p>
          )}
          {currentBanner?.ctaText && currentBanner?.ctaLink && (
            <Button asChild size="lg">
              <a href={currentBanner.ctaLink}>{currentBanner.ctaText}</a>
            </Button>
          )}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Previous slide"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePrevious();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            aria-label="Next slide"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNext();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBanner;


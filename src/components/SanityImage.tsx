import { useState, useEffect } from 'react';
import { urlFor } from '@/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface SanityImageProps {
  image: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  quality?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy';
}

export const SanityImage = ({
  image,
  alt = '',
  width = 800,
  height = 600,
  className = '',
  wrapperClassName = '',
  priority = false,
  quality = 85,
  fit = 'crop',
  crop = 'center',
}: SanityImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!image) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Reset states when generating new URL
    setIsLoading(true);
    setHasError(false);

    try {
      const url = urlFor(image)
        .width(width)
        .height(height)
        .quality(quality)
        .fit(fit)
        .crop(crop)
        .url();

      if (!url) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      setImageUrl(url);
      // Keep isLoading true - let onLoad handler set it to false
    } catch (error) {
      console.error('Error generating image URL:', error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [image, width, height, quality, fit, crop]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-muted text-muted-foreground ${wrapperClassName || className}`}>
        <div className="text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${wrapperClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`transition-opacity duration-300 ${className} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
};

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SanityImage } from './SanityImage';

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  author?: string;
  publishedAt?: string;
}

interface BlogCardProps {
  post: Post;
  urlFor: (source: any) => any;
  locale: string;
}

const BlogCard = ({ post, urlFor, locale }: BlogCardProps) => {
  const postUrl = `/${locale}/blog/${post.slug.current}`;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <a href={postUrl} className="block">
        <div className="aspect-video overflow-hidden">
          {post.mainImage ? (
            <SanityImage
              image={post.mainImage}
              alt={post.mainImage.alt || post.title}
              width={600}
              height={400}
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
          <CardTitle className="line-clamp-2 hover:underline">{post.title}</CardTitle>
          <CardDescription>
            {post.author && <span>{post.author}</span>}
            {post.author && post.publishedAt && <span> • </span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </CardDescription>
        </CardHeader>
        {post.excerpt && (
          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
          </CardContent>
        )}
      </a>
    </Card>
  );
};

export default BlogCard;


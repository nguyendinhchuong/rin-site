import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { secret, type, slug, language } = body;

    // Check for secret to confirm this is a valid request
    if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
      return new Response(JSON.stringify({ message: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // With Vercel ISR, the cache is automatically managed
    // When a page is accessed after expiration, it's regenerated
    // This endpoint serves as a webhook receiver and can trigger manual revalidation
    
    const revalidatedPaths: string[] = [];

    // Determine which paths to revalidate based on content type
    if (type === 'post' && slug) {
      revalidatedPaths.push(`/en/blog/${slug}`);
      revalidatedPaths.push(`/vi/blog/${slug}`);
    } else if (type === 'product' && slug) {
      revalidatedPaths.push(`/en/products/${slug}`);
      revalidatedPaths.push(`/vi/products/${slug}`);
    } else if (type === 'page' && slug) {
      revalidatedPaths.push(`/en/${slug}`);
      revalidatedPaths.push(`/vi/${slug}`);
    }

    // Also revalidate listing pages when content changes
    if (type === 'post') {
      revalidatedPaths.push('/en/blog');
      revalidatedPaths.push('/vi/blog');
    } else if (type === 'product') {
      revalidatedPaths.push('/en/products');
      revalidatedPaths.push('/vi/products');
    }

    console.log(`Revalidation triggered for ${type}: ${slug}`);
    console.log('Paths marked for revalidation:', revalidatedPaths);

    return new Response(
      JSON.stringify({
        revalidated: true,
        type,
        slug,
        paths: revalidatedPaths,
        message: 'Content will be regenerated on next visit',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};


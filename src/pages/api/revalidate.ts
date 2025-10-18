import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { secret, type, slug } = body;

    // Check for secret to confirm this is a valid request
    if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
      return new Response(JSON.stringify({ message: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // In a production environment with ISR, you would trigger revalidation here
    // For Astro with SSR/Hybrid mode, the content is fetched on each request
    // or you could implement a cache invalidation strategy

    console.log(`Revalidation triggered for ${type}: ${slug}`);

    return new Response(
      JSON.stringify({
        revalidated: true,
        type,
        slug,
        message: 'Revalidation acknowledged',
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


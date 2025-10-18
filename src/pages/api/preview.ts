import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const slug = url.searchParams.get('slug');
  const type = url.searchParams.get('type') || 'page';
  const locale = url.searchParams.get('locale') || 'vi';

  // Check the secret
  if (secret !== import.meta.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable preview mode by setting a cookie
  cookies.set('__preview', 'true', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  });

  // Redirect to the path from the fetched content
  let redirectPath = `/${locale}`;

  if (slug) {
    switch (type) {
      case 'product':
        redirectPath = `/${locale}/products/${slug}`;
        break;
      case 'post':
        redirectPath = `/${locale}/blog/${slug}`;
        break;
      case 'page':
        redirectPath = `/${locale}/${slug}`;
        break;
      default:
        redirectPath = `/${locale}`;
    }
  }

  return redirect(redirectPath);
};


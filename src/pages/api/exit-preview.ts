import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Disable preview mode by clearing the cookie
  cookies.delete('__preview', { path: '/' });

  return redirect('/');
};


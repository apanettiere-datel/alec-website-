# Spotlight

Spotlight is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` variable to your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Cloudflare Contact Form Setup

The contact form posts to `/api/contact`, which is implemented in `src/app/api/contact/route.js` for Cloudflare-friendly deployment.

Set these environment variables in Cloudflare Pages:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=replace-with-turnstile-site-key
TURNSTILE_SECRET_KEY=replace-with-turnstile-secret-key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Alec Roedig <contact@yourdomain.com>
# Optional alias used by this project in some environments
CONTACT_FROM_EMAIL=Alec Roedig <contact@yourdomain.com>
# Optional fallback sender (recommended for local/testing while domain is pending verification)
RESEND_FALLBACK_FROM_EMAIL=Alec Roedig <onboarding@resend.dev>
# In production, set to true only if you explicitly want fallback sender retries enabled.
RESEND_ALLOW_FALLBACK_SENDER=false
CONTACT_TO_EMAIL=you@yourdomain.com
```

Note: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is a public client key and should be set as a normal Variable (not Secret). The other keys should remain Secrets.

What this setup does:

- Validates Cloudflare Turnstile token server-side.
- Sends contact submissions through the Resend API.
- Uses `CONTACT_TO_EMAIL` as the destination inbox.
- Uses `RESEND_FROM_EMAIL` (or `CONTACT_FROM_EMAIL`) as the sender identity.
- Retries with `RESEND_FALLBACK_FROM_EMAIL` when Resend rejects an unverified sender domain.
- `RESEND_FROM_EMAIL` must use a domain verified in Resend (for example, `DATEL Website <noreply@datel-demo.com>`). Personal Gmail senders are rejected.
- Until your domain is verified, Resend testing mode can only deliver to your own Resend account email.

For local development, create `.env.local` in the project root and add the same keys with your local values.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation

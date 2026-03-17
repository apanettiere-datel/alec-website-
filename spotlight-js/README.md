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

The contact form posts to `/api/contact`, which is implemented as an Edge runtime route (`src/app/api/contact/route.js`) for Cloudflare-friendly deployment.

Set these environment variables in Cloudflare Pages:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=replace-with-turnstile-site-key
TURNSTILE_SECRET_KEY=replace-with-turnstile-secret-key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Alec Roedig <contact@yourdomain.com>
CONTACT_TO_EMAIL=you@yourdomain.com
```

What this setup does:

- Validates Cloudflare Turnstile token server-side.
- Sends contact submissions through the Resend API.
- Uses `CONTACT_TO_EMAIL` as the destination inbox.
- Uses `RESEND_FROM_EMAIL` as the sender identity.

For local development, copy `.env.example` to `.env.local` (already scaffolded in this project) and fill in the values.

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

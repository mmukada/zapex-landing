# Zapex landing page

The public site at `www.zapex.co.uk`: the landing page and the privacy policy, as static
files on GitHub Pages. It needs nothing else to run: no API, no database and no Google
Cloud project.

The product itself, with its dashboard, its documentation and the homepage it will launch
with, is a separate project, served at `app.zapex.co.uk` when its stack is up. This site
started as a copy of that homepage, and the two are free to differ until launch.

## Developing

```sh
yarn install
yarn dev            # http://localhost:5173
yarn lint
yarn run check      # `yarn check` is a command of yarn's own
yarn build && yarn check:emails
yarn preview        # the built site
```

It is SvelteKit with `adapter-static`: every page is prerendered into `build/`.

## No email address in the site

The site has one address, for early access, and no file of the built site holds it:
`src/lib/earlyAccess.ts` keeps it as numbers and makes the `mailto:` link in the browser,
so a harvester that reads the pages or the scripts finds nothing. A visitor without
JavaScript gets a button that does nothing.

- Link to it with `EarlyAccessLink`, never with a written `mailto:`.
- Do not add another address, in a page, in the structured data or in a comment that
  reaches the build.
- `yarn check:emails` fails a build that has an address in it, and the deploy runs it.

## Paths that others load

Auth0's sign-in page loads `https://zapex.co.uk/images/logo.svg`,
`https://zapex.co.uk/fonts/inter-variable-subset.woff2` and `https://zapex.co.uk/favicon.svg`
from this site. Keep the three paths.

## Deploying

A push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes
it to GitHub Pages.

Setting it up, once:

1. Make the repository public (GitHub Pages serves a private one on a paid plan only),
   and under **Settings → Pages** set the source to **GitHub Actions**.
2. Verify `zapex.co.uk` for the account under **Settings → Pages → Verified domains**, so
   that no other account can claim the domain.
3. Set the custom domain to `www.zapex.co.uk`.
4. Point the DNS at GitHub Pages: `www` as a CNAME to `<account>.github.io`, and the apex
   `zapex.co.uk` as A and AAAA records to GitHub Pages' addresses, which redirects it to
   `www`. The records are in `iac/landing.tf` of the product's repository.
5. Once GitHub has issued the certificate, tick **Enforce HTTPS**.

# Atlas Digital Studio — MarOps Lab website

A **fictional** B2B agency site for learning marketing operations. **Not a real business.** Do not submit real contact data or connect production accounts without consent/privacy review.

## Included pages

- `/` — homepage (`public/index.html`)
- `/services.html` — service overview
- `/mobile-app-development.html` — campaign-specific service landing page
- `/contact.html` — **browser-only** sample lead event form
- `/privacy.html` — demo disclosure and current data handling

## Local preview

```bash
cd public
python -m http.server 8000
```

Open <http://localhost:8000/> (you can also open `public/index.html` as a file for a quick preview). Python's file server is **for local development only**, not public hosting.

## Cloudflare Pages via GitHub

1. Create a new GitHub repository (e.g., `atlas-marops-lab`) and upload this project's files, keeping the `public/` directory and `README.md`.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Import existing Git repository**; authorize the desired repository.
3. Select production branch **main** and use these settings:
   - Framework preset: **None**
   - Root directory: repository root (`/`, or leave blank)
   - Build command: `exit 0` (or leave blank)
   - Build output directory: `public`
4. Deploy. Cloudflare will assign a `*.pages.dev` address. Deployments on new pushes should work automatically.
5. Test `/`, `/services.html`, `/mobile-app-development.html`, `/contact.html`, and `/privacy.html` from the public URL.

No Node packages, database, API keys, or paid hosting required.

Official guidance: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Test acquisition tags

1. Open the sample link from `/contact.html` or navigate to:
   `/mobile-app-development.html?utm_source=linkedin&utm_medium=social&utm_campaign=mobile_apps_demo`
2. Click **Explore an app inquiry**.
3. Click **Fill synthetic example**, then **Preview sample event**.
4. Inspect `first_known_touch`, `latest_known_touch`, `landing_path` in JSON. You can copy this JSON **but it has not been transmitted or saved as a lead**.
5. Use a new tab/browser session to test a new first-touch. This demo uses `sessionStorage` only, **not persistent cross-session attribution**.

### Important behavior

- The form performs only local browser validation and JSON preview. It **does not submit** to a server, n8n, Tally, HubSpot, Brevo, or Google Analytics.
- It does not send marketing messages, set marketing cookies, or load external libraries.
- Only whitelisted UTM fields are retained in the browser tab session. Third-party cookies are not used.
- We explicitly label a missing campaign as **unknown**, not direct traffic. The preview leaves unknown touch as `null`.
- `robots.txt` disallows crawling to discourage indexing during the learning project; it is not a security feature.

## Future phases

- **P2:** create real Tally form; embed it; connect secure Tally webhook to n8n and HubSpot. Avoid accidentally retaining this demo form as a public intake system.
- **P3:** instrument GTM/GA4 with privacy and consent controls; verify `generate_lead` only after confirmed submission; implement first/last-known attribution policy.
- **P4-P6:** scoring, consent-gated Brevo nurture and CRM funnel reporting.

Do not commit `.env`, credentials or client/employee personal data. Any future Tally embed must be accompanied by an updated privacy notice and explicit tests.

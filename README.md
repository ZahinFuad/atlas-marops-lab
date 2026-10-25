# Atlas Digital Studio — MarOps Lab

[**Visit the demo website**](https://zahinfuad.github.io/atlas-marops-lab/) · [Deployment workflow](.github/workflows/deploy-pages.yml) · [GitHub Actions](https://github.com/ZahinFuad/atlas-marops-lab/actions)

A fictional B2B software agency website used to learn **Marketing Operations (MarOps)**: acquisition attribution, form-to-CRM workflows, lifecycle marketing, quality assurance, and reporting.

> **Learning/demo project only.** Atlas Digital Studio is not a real operating agency. Use synthetic identities and controlled test email addresses. Do not submit genuine client inquiries or connect any production/customer data without appropriate permissions and privacy review.

## Current project status

| Component | Status | Notes |
| --- | --- | --- |
| Website source | Complete | Plain HTML, CSS, JavaScript in `public/` |
| Source control | Complete | GitHub repository `ZahinFuad/atlas-marops-lab`, branch `main` |
| Static hosting | **Deployed** | GitHub Pages: https://zahinfuad.github.io/atlas-marops-lab/ |
| Automated deployment | **Verified** | [Successful GitHub Actions run](https://github.com/ZahinFuad/atlas-marops-lab/actions/runs/40162867036) on 25 October 2026 |
| Public-site visual/navigation smoke test | Pending confirmation | GitHub confirmed successful deployment; independent browser checks remain an acceptance step |
| Contact form | Demo only | Browser-side synthetic JSON preview; **no submission** to Tally, n8n, or HubSpot |
| Analytics | Not yet configured | GTM and GA4 to be added later, with privacy/consent checks |
| CRM and email integrations | Not yet configured | Tally → n8n → HubSpot → consent-gated Brevo |
| Reporting | Not yet configured | HubSpot data → n8n → Sheets → Looker Studio |

The site is live as a static website, **not** yet a working production lead-capture system. GitHub Pages deployment does not imply that CRM, automation, analytics, email, or sales processes are operating.

## Website pages

| Page | File | Purpose |
| --- | --- | --- |
| [Home](https://zahinfuad.github.io/atlas-marops-lab/) | `public/index.html` | General value proposition and navigation |
| [Services](https://zahinfuad.github.io/atlas-marops-lab/services.html) | `public/services.html` | Three fictional service offers |
| [Mobile app development](https://zahinfuad.github.io/atlas-marops-lab/mobile-app-development.html) | `public/mobile-app-development.html` | Campaign-specific acquisition landing page |
| [Contact](https://zahinfuad.github.io/atlas-marops-lab/contact.html) | `public/contact.html` | Synthetic lead event preview, **not** actual submission |
| [Privacy / demo notice](https://zahinfuad.github.io/atlas-marops-lab/privacy.html) | `public/privacy.html` | Current site data-handling and simulation disclosure |

Other assets: `public/assets/styles.css`, `public/assets/site.js`, `public/assets/favicon.svg`, `public/robots.txt`, `public/_headers`, and `.gitignore`.

**GitHub Pages limitation:** `public/_headers` is a Cloudflare-style configuration file and is **not interpreted by GitHub Pages**. It must not be relied on to set security or caching headers for this deployment. The `robots.txt` directives discourage indexing but provide no access control.

## GitHub Pages deployment

Hosting is provided by **GitHub Pages**, not Cloudflare Pages. No new domain, Node build system, API keys, or paid hosting are necessary.

1. The repository's **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.
2. Workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
3. Trigger: commits pushed to `main` or a manual `workflow_dispatch` run.
4. The workflow checks out the repository, uploads the entire `public/` folder using `actions/upload-pages-artifact`, and publishes with `actions/deploy-pages`.
5. Deployed URL: **https://zahinfuad.github.io/atlas-marops-lab/**.

**Updating the website:** edit files inside `public/`, commit/push to `main`, then check the [Actions tab](https://github.com/ZahinFuad/atlas-marops-lab/actions) for a successful deployment. Relative HTML and asset paths are used so the site works beneath GitHub Pages' `/atlas-marops-lab/` project path.

**Deployment evidence:** [Successful GitHub Pages deployment](https://github.com/ZahinFuad/atlas-marops-lab/actions/runs/40162867036). This proves GitHub's publishing step completed; page functionality must still be smoke-tested in a browser.

## Local development and preview

From the repository root:

```bash
python -m http.server 8000 --directory public
```

Open **http://localhost:8000/**. This is a local development server, not a substitute for the published website.

## Attribution learning exercise (no external requests)

1. Start a fresh browser session and visit:
   [Tagged mobile-app landing page](https://zahinfuad.github.io/atlas-marops-lab/mobile-app-development.html?utm_source=linkedin&utm_medium=social&utm_campaign=mobile_apps_demo).
2. Continue through the **Explore an app inquiry** button to the Contact page.
3. Click **Fill synthetic example**, then **Preview sample event**.
4. Review the JSON fields `first_known_touch`, `latest_known_touch`, and `landing_path`.
5. Try another campaign tag in the same session; then use a fresh session to assess what resets.

Current JavaScript reads only whitelisted UTM parameters and uses browser `sessionStorage` for this learning exercise. **It does not persist attribution across browser sessions** or connect it to a CRM. Missing UTM data is classified as **unknown**, not automatically assumed to be Direct. The sample JSON is not transmitted or saved as a lead.

## Planned end-to-end MarOps architecture

```text
Campaign / organic / social / referral visits
                    |
             GitHub Pages site
                    |
           Tally form (planned)
                    |
         secured n8n webhook
                    |
   HubSpot contact/company/deal CRM
        /                     \
   consent-gated Brevo       n8n reporting export
                              |
                      Sheets / Looker Studio

GA4 + GTM: separate aggregate on-site tracking (planned)
```

**Source of truth:** HubSpot for contacts, companies, lifecycle, assignments and deals; Tally for incoming submissions; n8n for workflow orchestration, retries, normalization and idempotency; Brevo for email delivery and suppression state; GA4 for behavioral analytics; Sheets/Looker Studio for reporting copies/aggregates.

### Upcoming implementation

- **T017:** open every published page on desktop/mobile; test navigation and sample form; keep the task In Progress until the real capture path and final CTA work.
- **P1/P2:** create or verify HubSpot/Tally lab accounts, publish a real Tally form, add required hidden campaign fields, connect its webhook to a secured n8n workflow, and verify contact upsert/deduplication.
- **P3:** install GTM + GA4 appropriately, implement event/UTM validation, and fire `generate_lead` only on a confirmed successful submission.
- **P4–P6:** add documented qualification, consent-gated Brevo nurture, and reconciled CRM-funnel reporting.

## Project documentation

- [**Project Brief & System Design (T001–T004)**](https://docs.google.com/document/d/17HBh9ghr3EdWAYtroOOvjY-EQRndftSV_8n2nLsiCsE/edit) — the scenario-specific architecture and access decisions.
- [**Implementation Playbook & Client Reuse Guide**](https://docs.google.com/document/d/1cDRqHQ3g7-wSu8HnRixKLp6SkyCv01UYr_r90-s4soY/edit) — reusable methods and eventual client-delivery framework.
- [**Project Tracker & Client Template**](https://docs.google.com/spreadsheets/d/1h0Fu4v5KK1K3IJm_KMhYR64mxyB9FywELfLLd9q_Q3E/edit) — task statuses, dependencies, evidence, QA tests and decisions.

Use the **project tracker as the source of truth for progress**; documentation or a deployed website does not, by itself, prove an untested integration is complete.

## Security and privacy rules

- Keep API keys, access tokens, `.env` values, personal data, and client datasets out of the public repository.
- Do not turn the demo contact form into a live collection endpoint without consent text, data mapping, a secured webhook and abuse/error controls.
- Never send personal identifiers, raw inquiry details, or tokenized secret URLs to GA4.
- Use fictional records and test email addresses under your control; label all screenshots, lead scores, conversion rates and revenues as simulated.
- Review platform privacy requirements before integrating analytics, email tools or real user data.

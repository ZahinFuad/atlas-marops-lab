"use strict";
// This site is intentionally a browser-only learning demo. No network requests.
(function () {
  const navButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (navButton && nav) {
    navButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navButton.setAttribute('aria-expanded', String(open));
    });
  }

  const safeCampaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const params = new URLSearchParams(window.location.search);
  const currentCampaign = {};
  for (const key of safeCampaignKeys) {
    const value = params.get(key);
    if (value && value.length <= 120) currentCampaign[key] = value.trim();
  }
  // Capture only non-identifying campaign strings. No full referral URL or PII.
  const key = 'atlas_demo_attribution_v1';
  const currentPath = window.location.pathname;
  let attribution = { first_known_touch: null, latest_known_touch: null, landing_path: currentPath };
  try {
    const prior = JSON.parse(sessionStorage.getItem(key) || 'null');
    if (prior && typeof prior === 'object' && typeof prior.landing_path === 'string') attribution = prior;
  } catch (_) { /* Session storage unavailable or corrupted */ }
  if (Object.keys(currentCampaign).length > 0) {
    const touch = { ...currentCampaign, page_path: currentPath };
    if (!attribution.first_known_touch) attribution.first_known_touch = touch;
    attribution.latest_known_touch = touch;
  }
  try { sessionStorage.setItem(key, JSON.stringify(attribution)); } catch (_) {}

  const form = document.getElementById('demo-form');
  if (!form) return;
  const select = form.querySelector('[name="service_interest"]');
  const serviceFromUrl = params.get('service');
  if (select && ['web', 'mobile', 'ai'].includes(serviceFromUrl)) select.value = serviceFromUrl;
  document.getElementById('fill-sample')?.addEventListener('click', () => {
    form.elements.first_name.value = 'Sam';
    form.elements.last_name.value = 'Taylor';
    form.elements.email.value = 'sam@example.invalid';
    form.elements.company.value = 'Northstar Systems (fictional)';
    form.elements.service_interest.value = serviceFromUrl && ['web','mobile','ai'].includes(serviceFromUrl) ? serviceFromUrl : 'mobile';
    form.elements.inquiry_message.value = 'Our fictional operations team needs a mobile application to manage field-service workflows.';
    form.elements.marketing_opt_in.checked = false;
  });
  let lastPayload = '';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = {
      event_name: 'demo_lead_submitted',
      demo_only: true,
      sent_to_server: false,
      simulated_submission_id: 'preview-not-unique',
      first_name: String(data.get('first_name') || ''),
      last_name: String(data.get('last_name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      service_interest: String(data.get('service_interest') || ''),
      inquiry_message: String(data.get('inquiry_message') || ''),
      marketing_opt_in: data.has('marketing_opt_in'),
      consent_version: 'demo-v1',
      conversion_page_path: window.location.pathname,
      first_known_touch: attribution.first_known_touch,
      latest_known_touch: attribution.latest_known_touch,
      landing_path: attribution.landing_path,
      notes: 'Browser-only preview. No Tally webhook, CRM record, email, or GA4 event.'
    };
    lastPayload = JSON.stringify(payload,null,2);
    document.getElementById('payload-output').textContent = lastPayload;
    const panel = document.getElementById('event-preview');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('copy-status').textContent = '';
  });
  document.getElementById('copy-payload')?.addEventListener('click', async () => {
    if (!lastPayload) return;
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(lastPayload);
      status.textContent = 'Copied.';
    } catch (_) { status.textContent = 'Select the JSON text to copy it manually.'; }
  });
})();

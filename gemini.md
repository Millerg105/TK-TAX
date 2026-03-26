# 📜 Project Constitution — TK Tax Consultants Website

> This file is **law**. It defines the data schemas, behavioral rules, and architectural invariants for this project.

---

## Data Schema

### Site Config (Input)
```json
{
  "business": {
    "name": "TK Tax Consultants",
    "website": "www.tktax.co.uk",
    "address": "134 Balcarres Road, Leyland, Lancashire, PR25 3ED",
    "phone": "01772 526670",
    "email": "info@tktax.co.uk",
    "contact_person": "Tracy Simpson",
    "experience_years": "30+"
  },
  "brand": {
    "gold": "#8B6914",
    "charcoal": "#2D2D3A",
    "slate": "#4A4A5A",
    "cream": "#FAF8F5",
    "white": "#FFFFFF",
    "heading_font": "Playfair Display",
    "body_font": "Inter"
  },
  "pages": ["index", "about", "services", "contact", "resources"],
  "services": [
    "Accountancy", "Tax Advice", "Wealth Management", "Self Assessment Returns",
    "CIS Tax Reclaims", "Sole Trader Support", "Limited Company Accounts",
    "Corporation Tax", "Bookkeeping", "VAT Returns (MTD)", "Payroll Services",
    "Workplace Pensions Compliance", "CIS Compliance", "Company Formation",
    "Business Start-Up Advice", "HMRC Queries", "Management Accounts",
    "Accounting Software Support"
  ],
  "audiences": [
    "Subcontractors / CIS workers",
    "Sole traders and small businesses",
    "Limited companies",
    "New business start-ups"
  ]
}
```

### Output Shape
```json
{
  "deliverable": "5-page static HTML/CSS/JS website",
  "pages": ["index.html", "about.html", "services.html", "contact.html", "resources.html"],
  "assets": ["styles.css", "main.js", "hero image"],
  "deployment": "Local files, ready for hosting"
}
```

---

## Behavioral Rules

1. All copy must use UK English — no American spellings or phrasing
2. No fabricated reviews, awards, team members, certifications, case studies, or prices
3. Tone: trustworthy, clear, professional, calm, helpful — never overly salesy
4. No startup/tech language, no "10x your business", no hype
5. No neon colours, glossy gradients, or aggressive dark-mode tech aesthetics
6. "Free initial consultation" is the primary CTA — prominent but not pushy
7. The site must feel like a real premium local accountancy firm
8. Do not imply services not provided in source material

---

## Architectural Invariants

1. Static HTML/CSS/JS — no framework, no build step
2. Files are modular and editable by non-developers
3. Contact form uses client-side validation only (wirable to backend later)
4. All external links open in new tabs
5. Responsive design: mobile-first
6. CSS custom properties for all brand tokens

---

## Maintenance Log

| Date | Change | Author |
|------|--------|--------|
| 2026-03-24 | Initialized project constitution | System Pilot |
| 2026-03-24 | Defined data schema and behavioral rules from user brief | System Pilot |

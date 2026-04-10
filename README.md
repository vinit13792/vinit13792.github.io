# Vinit Sutar - Portfolio Website

A premium glassmorphism portfolio showcasing data science projects, technical blog posts, and professional experience.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Glassmorphism Design), Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **Deployment**: Vercel

## Features

- Premium glassmorphism UI with animated background
- Dark and light mode support
- Smooth scroll animations and transitions
- Dynamic project filtering (GenAI, Vision, Analytics)
- Serverless contact form API
- Lightweight analytics tracking
- Mobile responsive design

## Project Structure

```
├── index.html                 # Main portfolio page
├── auto-annotations.html      # Case study: Active Learning pipeline
├── micro-organism-detection.html  # Case study: Micro-organism detection
├── unsloth-kernels.html       # Case study: Triton kernels deep-dive
├── rag-pipeline.html          # Case study: RAG at Shriram Finance
├── propensity-models.html     # Case study: Propensity Models
├── vercel.json                # Vercel deployment config
├── package.json               # Dependencies
├── assets/
│   ├── css/
│   │   └── styles.css         # Main stylesheet
│   └── js/
│       └── app.js             # Main JavaScript (project data, animations)
├── api/
│   ├── contact.js             # Contact form API
│   ├── analytics.js           # Analytics tracking API
│   └── projects.js            # Projects data API
└── README.md
```

## Development

```bash
# Serve locally
npx serve .
# or
python -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Deployment

This site is deployed on Vercel at [vinit-sutar-portfolio.vercel.app](https://vinit-sutar-portfolio.vercel.app). Push to main branch to trigger automatic deployment.

```bash
# Deploy manually
vercel --prod
```

## Adding New Projects

1. Add project object to `projects` array in `assets/js/app.js`:
```javascript
{
  id: 8,
  title: "Project Title",
  company: "Company Name",
  category: "GenAI", // or "Vision" or "Analytics"
  tags: ["Tag1", "Tag2"],
  index: "08",
  link: "project-detail.html",
  description: "Brief description for the card"
}
```

2. Create corresponding HTML detail page following the pattern of existing case studies.

3. Update `api/projects.js` with the same project data for API consistency.

## Contact

- **Email**: vinit.d.sutar@gmail.com
- **LinkedIn**: [linkedin.com/in/vinitsutar](https://linkedin.com/in/vinitsutar)
- **GitHub**: [github.com/vinit13792](https://github.com/vinit13792)

---

© 2025 Vinit Sutar. Crafted with passion for data science.
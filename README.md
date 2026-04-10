# Vinit Sutar - Portfolio Website

A premium glassmorphism portfolio showcasing data science projects, technical blog posts, and professional experience with an AI-powered chatbot assistant.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Glassmorphism Design), Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: OpenRouter (Llama 3.2 3B - Free tier)
- **Deployment**: Vercel

## Features

- Premium glassmorphism UI with animated background
- Dark mode optimized design
- Smooth scroll animations and transitions
- Dynamic project filtering (GenAI, Vision, Analytics)
- AI-powered chatbot for resume Q&A
- Serverless contact form API
- Lightweight analytics tracking
- Mobile responsive design

## Project Structure

```
├── index.html              # Main portfolio page
├── chat.html               # AI Chatbot interface
├── auto-annotations.html   # Case study: Active Learning pipeline
├── unsloth-kernels.html    # Case study: Triton kernels deep-dive
├── rag-pipeline.html       # Case study: RAG at Shriram Finance
├── propensity-models.html  # Case study: Propensity Models
├── vercel.json             # Vercel deployment config
├── package.json            # Dependencies
├── assets/
│   ├── css/
│   │   ├── styles.css      # Main stylesheet
│   │   └── chat.css        # Chat interface styles
│   └── js/
│       ├── app.js          # Main JavaScript (project data, animations)
│       └── chat.js         # Chat functionality
├── api/
│   ├── contact.js          # Contact form API
│   ├── analytics.js        # Analytics tracking API
│   ├── projects.js         # Projects data API
│   ├── chat.js             # AI Chat API (OpenRouter)
│   └── resume.json         # Structured resume data for chatbot
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

This site is deployed on Vercel. Push to main branch to trigger automatic deployment.

```bash
# Deploy manually
vercel --prod
```

### Environment Variables (Required for Chatbot)

Set this in Vercel Dashboard → Settings → Environment Variables:

```
OPENROUTER_API_KEY=your_openrouter_api_key
```

Get your free API key at [openrouter.ai](https://openrouter.ai/).

## AI Chatbot Configuration

The chatbot uses OpenRouter's free tier models with automatic fallback:

1. **Llama 3.2 3B** (free) - Primary
2. **Llama 3.1 8B** (free) - Fallback
3. **Gemma 3 4B** (free) - Fallback
4. **Qwen 2.5 7B** (free) - Fallback
5. **Zephyr 7B** (free) - Fallback

The system prompt contains Vinit's complete resume context in `api/chat.js`.

### To modify the chatbot behavior:
- Edit `SYSTEM_PROMPT` in `api/chat.js`
- Update `api/resume.json` for structured data changes

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

- **Email**: vinit.sutar@email.com
- **LinkedIn**: [linkedin.com/in/vinit13792](https://linkedin.com/in/vinit13792)
- **GitHub**: [github.com/vinit13792](https://github.com/vinit13792)

---

© 2025 Vinit Sutar. Crafted with passion for data science.
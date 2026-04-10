# Vinit Sutar - Portfolio Website

A premium glassmorphism portfolio showcasing data science projects, technical blog posts, and professional experience with an AI-powered chatbot assistant.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Glassmorphism Design), Vanilla JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Zai GLM-5 on AWS Bedrock
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
├── package.json            # Dependencies for serverless functions
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
│   ├── chat.js             # AI Chat API (AWS Bedrock)
│   └── resume.json         # Structured resume data for chatbot
└── README.md
```

## Development

```bash
# Install dependencies (for serverless functions)
npm install

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

Set these in Vercel Dashboard → Settings → Environment Variables:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```

The AWS credentials need access to AWS Bedrock and the Zai GLM-5 model.

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

## AI Chatbot Configuration

The chatbot uses Zai GLM-5 on AWS Bedrock. The system prompt is embedded in `api/chat.js` with comprehensive context about Vinit's experience.

To modify the chatbot behavior:
- Edit the `SYSTEM_PROMPT` in `api/chat.js`
- Update `api/resume.json` for structured data changes

## Contact

- **Email**: vinit.sutar@email.com
- **LinkedIn**: [linkedin.com/in/vinit13792](https://linkedin.com/in/vinit13792)
- **GitHub**: [github.com/vinit13792](https://github.com/vinit13792)

---

© 2025 Vinit Sutar. Crafted with passion for data science.
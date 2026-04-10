# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for Vinit Sutar, a Data Science Researcher specializing in multi-agent systems and LLM applications. The site showcases professional experience, projects, and technical case studies.

## Architecture

**Static Site - No Build Step Required**

- `index.html` - Main landing page with hero section, experience timeline (reverse chronological), and project gallery
- `script.js` - Project data model and gallery rendering/filtering logic
- `auto-annotations.html` - Case study on Active Learning pipeline for micro-organism detection
- `unsloth-kernels.html` - Technical deep-dive into Unsloth's Triton kernels for LLM optimization

**Key Technical Details:**
- Uses Tailwind CSS via CDN (`https://cdn.tailwindcss.com`)
- Dark mode support via `dark:` class variants
- MathJax for LaTeX rendering in technical articles
- Project cards are rendered dynamically from the `projects` array in `script.js`
- Filter buttons use `filterProjects(category, clickedButton)` to animate card transitions

## Adding New Projects

1. Add a new project object to the `projects` array in `script.js`:
```javascript
{
    id: 4,
    index: "04",
    title: "Project Title",
    company: "Company Name",
    category: "GenAI", // or "Vision" or "Analytics"
    tags: ["Tag1", "Tag2"],
    link: "project-file.html",
    description: "Brief description"
}
```

2. Create the corresponding HTML file for the project detail page, following the structure of existing case study pages.

## Preview

Open `index.html` directly in a browser, or use a local server:
```bash
npx serve .
# or
python -m http.server 8000
```
// Project data - Single source of truth
const projects = [
  {
    id: 1,
    title: "Pre-Game Watchability Index",
    company: "Nielsen Media (Amazon Prime)",
    category: "GenAI",
    tags: ["Multi-Agent", "Claude Sonnet", "AWS Bedrock"],
    index: "01",
    link: "#",
    description: "Architected LLM system computing watchability scores across 14 geographies for Amazon Prime Video Marketing, improving ad-placement targeting precision."
  },
  {
    id: 2,
    title: "RAG Pipeline with Tool Calling",
    company: "Shriram Finance Limited",
    category: "GenAI",
    tags: ["RAG", "Azure Databricks", "Gemma 3"],
    index: "02",
    link: "rag-pipeline.html",
    description: "High-scale RAG pipeline on Azure Databricks with HNSW indexing, enabling Tool Calling capabilities with Gemma 3 for precise information retrieval."
  },
  {
    id: 3,
    title: "Propensity Models for FD Products",
    company: "Shriram Finance Limited",
    category: "Analytics",
    tags: ["Propensity Modeling", "ML", "Market Mix"],
    index: "03",
    link: "propensity-models.html",
    description: "Led team to build propensity models that increased Fixed Deposits conversions by INR 520 Crores. Implemented Market Mix Modelling to optimize campaigns, saving 5% on marketing spend."
  },
  {
    id: 4,
    title: "Auto-Annotation Pipeline",
    company: "HiMedia Laboratories",
    category: "Vision",
    tags: ["Computer Vision", "Mask R-CNN", "Active Learning"],
    index: "04",
    link: "auto-annotations.html",
    description: "An Active Learning approach using Mask RCNN to reduce manual annotation efforts, saving INR 6,00,000 in annotation costs."
  },
  {
    id: 5,
    title: "Micro-organism Identification",
    company: "HiMedia Laboratories",
    category: "Vision",
    tags: ["OpenCV", "PyTorch", "Mask-RCNN"],
    index: "05",
    link: "micro-organism-detection.html",
    description: "Developed a detection pipeline to count and calculate growth rate of micro-organisms with 94% accuracy."
  },
  {
    id: 6,
    title: "Unsloth: Kernel Anatomy",
    company: "Technical Blog",
    category: "GenAI",
    tags: ["Triton", "LLMs", "Optimization"],
    index: "06",
    link: "unsloth-kernels.html",
    description: "A deep dive into how custom Triton kernels bypass the VRAM wall for 2x faster LLM training."
  },
  {
    id: 7,
    title: "Conversion Attribution Model",
    company: "Conneqt Digital - AB InBev",
    category: "Analytics",
    tags: ["GLMNET", "Causal Inference", "A/B Testing"],
    index: "07",
    link: "#",
    description: "Developed conversion attribution model with 98% accuracy. Implemented fractional factorial design to halve RCT time and propensity score matching for 200k stores."
  },
  {
    id: 8,
    title: "Store Clustering & Forecasting",
    company: "Impact Analytics",
    category: "Analytics",
    tags: ["Prophet", "Time Series", "DTW"],
    index: "08",
    link: "#",
    description: "Modernised Prophet pipeline improving model accuracy by 3%. Designed DTW-based store clustering and improved imputation from 0.3% to 0.7%."
  }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initProjects();
  initAnimations();
  initContactForm();
  initAnalytics();
});

// Loader
function initLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 800);
  }
}

// Navigation
function initNav() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Projects
function initProjects() {
  renderProjects(projects);
  initFilterTabs();
}

function renderProjects(projectsToRender) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = '';

  projectsToRender.forEach((project, index) => {
    const card = document.createElement('a');
    card.href = project.link || '#';
    card.className = `project-card glass-card fade-in stagger-${(index % 4) + 1}`;
    card.innerHTML = `
      <span class="project-index">${project.index}</span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-company">${project.company}</p>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <div class="project-link">
        <span>Explore Project</span>
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    `;

    container.appendChild(card);

    // Trigger animation
    setTimeout(() => {
      card.classList.add('visible');
    }, 50 * index);
  });
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter projects
      const category = tab.dataset.category;
      const filtered = category === 'All'
        ? projects
        : projects.filter(p => p.category === category);

      // Animate out then in
      const container = document.getElementById('projects-grid');
      container.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('visible');
      });

      setTimeout(() => {
        renderProjects(filtered);
      }, 300);
    });
  });
}

// Scroll Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        showNotification('Message sent successfully!', 'success');
        form.reset();
      } else {
        showNotification(result.error || 'Failed to send message', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => notification.classList.add('visible'), 10);

  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('visible');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Analytics
async function initAnalytics() {
  // Track page view
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.pathname,
        action: 'view'
      })
    });
  } catch (e) {
    // Silently fail analytics
  }

  // Track project clicks
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: card.href,
            action: 'click'
          })
        });
      } catch (e) {
        // Silently fail
      }
    });
  });
}
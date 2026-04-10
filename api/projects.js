// API endpoint to dynamically serve project data
// Synced with assets/js/app.js - Single source of truth

const projects = [
  {
    id: 1,
    title: "Auto-Annotation Pipeline",
    company: "HiMedia Laboratories",
    category: "Vision",
    tags: ["Computer Vision", "Mask R-CNN", "Active Learning"],
    index: "01",
    link: "auto-annotations.html",
    description: "An Active Learning approach using Mask RCNN to reduce manual annotation efforts, saving INR 6,00,000 in annotation costs.",
    featured: true
  },
  {
    id: 2,
    title: "Micro-organism Identification",
    company: "HiMedia Laboratories",
    category: "Vision",
    tags: ["OpenCV", "PyTorch", "Mask-RCNN"],
    index: "02",
    link: "auto-annotations.html",
    description: "Developed a detection pipeline to count and calculate growth rate of micro-organisms with 94% accuracy.",
    featured: true
  },
  {
    id: 3,
    title: "Unsloth: Kernel Anatomy",
    company: "Technical Blog",
    category: "GenAI",
    tags: ["Triton", "LLMs", "Optimization"],
    index: "03",
    link: "unsloth-kernels.html",
    description: "A deep dive into how custom Triton kernels bypass the VRAM wall for 2x faster LLM training.",
    featured: true
  },
  {
    id: 4,
    title: "RAG Pipeline with Tool Calling",
    company: "Shriram Finance Limited",
    category: "GenAI",
    tags: ["RAG", "Azure Databricks", "Gemma 3"],
    index: "04",
    link: "rag-pipeline.html",
    description: "High-scale RAG pipeline on Azure Databricks with HNSW indexing, enabling Tool Calling capabilities with Gemma 3 for precise information retrieval.",
    featured: true
  },
  {
    id: 5,
    title: "Propensity Models for FD Products",
    company: "Shriram Finance Limited",
    category: "Analytics",
    tags: ["Propensity Modeling", "Machine Learning", "Campaign Optimization"],
    index: "05",
    link: "propensity-models.html",
    description: "Led team to build propensity models that increased Fixed Deposits conversions by INR 520 Crores. Implemented Market Mix Modelling to optimize campaigns, saving 5% on marketing spend.",
    featured: true
  },
  {
    id: 6,
    title: "Conversion Attribution Model",
    company: "Conneqt Digital - AB InBev",
    category: "Analytics",
    tags: ["GLMNET", "Logistic Regression", "Causal Inference"],
    index: "06",
    link: "#",
    description: "Developed conversion attribution model for South Africa Region with 98% accuracy. Implemented fractional factorial design to halve RCT time and propensity score matching for 200k stores.",
    featured: true
  },
  {
    id: 7,
    title: "Store Clustering & Forecasting",
    company: "Impact Analytics",
    category: "Analytics",
    tags: ["Prophet", "Time Series", "Dynamic Time Warping"],
    index: "07",
    link: "#",
    description: "Modernised Prophet pipeline improving model accuracy by 3%. Designed store clustering using DTW and improved imputation logic from 0.3% to 0.7%.",
    featured: false
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, featured } = req.query;

  try {
    let filteredProjects = projects;

    if (category && category !== 'All') {
      filteredProjects = projects.filter(p => p.category === category);
    }

    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(p => p.featured);
    }

    return res.status(200).json({
      projects: filteredProjects,
      total: filteredProjects.length
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
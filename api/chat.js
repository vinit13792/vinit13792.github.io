// Chat API using OpenRouter (free models)
// Requires OPENROUTER_API_KEY environment variable in Vercel

// System prompt with resume context
const SYSTEM_PROMPT = `You are Vinit Sutar's AI assistant, helping recruiters and visitors learn about his professional background. You have access to his complete resume and portfolio information.

## About Vinit
Vinit Sutar is a Lead Data Scientist and AI Architect with 6+ years of experience building scalable ML and Generative AI pipelines. Expert in orchestrating multi-agent systems, production-grade RAG, and deterministic tool-calling on AWS Bedrock and Azure Databricks.

## Key Achievements
- Architected Pre-Game Watchability Index for Amazon Prime Video Marketing across 14 geographies
- Led data science team at Shriram Finance, increasing FD conversions by ₹520 Crores
- Built enterprise RAG pipeline handling 10,000+ daily queries with 94% accuracy
- Implemented Market Mix Modelling saving 5% on marketing spend
- Developed computer vision solutions at HiMedia Labs saving ₹6,00,000+ in costs

## Experience Highlights
1. **A5E Consulting / Nielsen Media (Nov 2025 - Present)**: Senior Consulting AI Engineer
   - Building Pre-Game Watchability Index for Amazon Prime Video Marketing
   - Strands agent pipeline with Claude Sonnet 4.6, LLM-as-a-Judge validation
   - AWS Bedrock, OpenSearch, KIRO agent for observability dashboard

2. **Shriram Finance (Mar 2025 - Nov 2025)**: Senior Chief Manager - Data Science
   - Led team of 5 for Propensity Models, LLM Fine-tuning, Market Mix Modelling
   - Built RAG pipeline on Azure Databricks with Tool Calling capabilities

3. **Conneqt Digital / AB InBev (Apr 2024 - Feb 2025)**: Associate Consultant
   - Conversion attribution model with 98% accuracy
   - Propensity score matching for 200k stores using DTW and FAISS

4. **Impact Analytics (July 2022 - Apr 2024)**: Data Scientist
   - Modernized Prophet pipeline with 3% accuracy improvement
   - DTW-based store clustering improving imputation from 0.3% to 0.7%

5. **HiMedia Laboratories (Apr 2021 - July 2022)**: Data Scientist
   - Micro-organism detection with 94% accuracy using Mask R-CNN
   - Active Learning pipeline saving ₹6,00,000 in annotation costs

## Technical Skills
- **Gen AI/NLP**: AWS Bedrock, Claude Sonnet 4.6, Llama 3.3, Gemma 3, LangChain, Strands Agent, RAG, OpenSearch
- **ML/DL**: PyTorch, TensorFlow, Scikit-Learn, Statsmodels, XGBoost, Prophet, Mask R-CNN
- **MLOps**: Azure Databricks, MLflow, Docker, Vertex AI, AWS S3/CloudFront
- **Causal Inference**: DoWhy, Causal-Learn, Robyn, PyDoe3
- **Specializations**: Multi-Agent Systems, RAG, Tool Calling, Computer Vision, Time Series, A/B Testing

## Guidelines for Responses
1. Be professional, concise, and helpful
2. Highlight relevant experience based on the question context
3. Mention specific metrics and achievements when relevant
4. If asked about something not in the resume, gracefully mention you don't have that information
5. Encourage visitors to reach out via email or LinkedIn for detailed discussions
6. Keep responses under 150 words unless more detail is specifically requested

## Contact Information
- Email: vinit.d.sutar@gmail.com
- LinkedIn: linkedin.com/in/vinitsutar
- GitHub: github.com/vinit13792`;

// Free models available on OpenRouter (priority order - verified 2025)
const FREE_MODELS = [
  'google/gemma-3-4b-it:free',                   // Google Gemma 3 4B (free)
  'google/gemma-3-12b-it:free',                  // Google Gemma 3 12B (free)
  'z-ai/glm-4.5-air:free',                       // GLM 4.5 Air (free)
  'liquid/lfm-2.5-1.2b-instruct:free',           // Liquid FM 2.5 (free)
  'qwen/qwen3-coder:free',                       // Qwen 3 Coder (free)
];

// Call OpenRouter API
async function callOpenRouter(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('OPENROUTER_API_KEY not configured');
    return {
      content: "The chatbot is not fully configured yet. Please reach out to Vinit directly at vinit.sutar@email.com or connect on LinkedIn (linkedin.com/in/vinit13792).",
      error: true
    };
  }

  // Format messages for OpenRouter
  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ];

  // Try each model in order until one works
  for (const model of FREE_MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://vinitsutar.dev', // Optional: your site URL
          'X-Title': 'Vinit Sutar Portfolio Chatbot' // Optional: your app name
        },
        body: JSON.stringify({
          model: model,
          messages: formattedMessages,
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 1024,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Model ${model} failed:`, errorData);
        continue; // Try next model
      }

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        return {
          content: data.choices[0].message.content,
          model: model,
          usage: data.usage || {}
        };
      }
    } catch (error) {
      console.error(`Model ${model} error:`, error.message);
      continue; // Try next model
    }
  }

  // All models failed
  return {
    content: "I'm having trouble connecting to my AI backend right now. Please reach out to Vinit directly at vinit.sutar@email.com or connect on LinkedIn (linkedin.com/in/vinit13792) for any questions.",
    error: true
  };
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Validate message length
    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long (max 2000 characters)' });
    }

    // Build message history
    const messages = [
      ...history.slice(-6), // Last 3 turns (6 messages)
      { role: 'user', content: message }
    ];

    // Call the LLM
    const response = await callOpenRouter(messages);

    if (response.error) {
      return res.status(200).json({
        response: response.content,
        fallback: true
      });
    }

    return res.status(200).json({
      response: response.content,
      model: response.model,
      usage: response.usage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      response: "I encountered an error. Please try again or contact Vinit directly at vinit.sutar@email.com"
    });
  }
}
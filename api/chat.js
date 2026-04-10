// Chat API using Zai GLM-5 on AWS Bedrock
// Requires AWS credentials configured in Vercel environment variables

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

// System prompt with resume context
const SYSTEM_PROMPT = `You are Vinit Sutar's AI assistant, helping recruiters and visitors learn about his professional background. You have access to his complete resume and portfolio information.

## About Vinit
Vinit Sutar is a Data Science Researcher specializing in Multi-Agent Systems and LLM applications with 5+ years of experience. He has driven ₹520 Crores in revenue impact across his career.

## Key Achievements
- Led data science team at Shriram Finance, increasing FD conversions by ₹520 Crores
- Built enterprise RAG pipeline handling 10,000+ daily queries with 94% accuracy
- Implemented Market Mix Modelling saving 5% on marketing spend
- Developed computer vision solutions at HiMedia Labs saving ₹6,00,000+ in costs
- Expert in Multi-Agent Systems, RAG Pipelines, LLM Fine-tuning, and MLOps

## Experience Highlights
1. **Shriram Finance (Mar 2025 - Nov 2025)**: Senior Chief Manager - Data Science
   - Led team of 5 for Propensity Models, LLM Fine-tuning, Market Mix Modelling
   - Built RAG pipeline on Azure Databricks with Tool Calling capabilities

2. **Conneqt Digital / AB InBev (Apr 2024 - Feb 2025)**: Associate Consultant
   - Conversion attribution model with 98% accuracy for South Africa region
   - Propensity score matching for 200k stores using DTW and FAISS

3. **Impact Analytics (July 2022 - Apr 2024)**: Data Scientist
   - Modernized Prophet pipeline with 3% accuracy improvement
   - Store clustering using Dynamic Time Warping

4. **HiMedia Laboratories (Apr 2021 - July 2022)**: Data Scientist
   - Micro-organism detection with 94% accuracy using Mask R-CNN
   - Active Learning pipeline saving ₹6,00,000 in annotation costs

## Technical Skills
- **LLM Stack**: LangChain, LlamaIndex, Hugging Face, AWS Bedrock, OpenAI/Anthropic APIs
- **ML**: PyTorch, TensorFlow, XGBoost, Scikit-learn
- **MLOps**: MLflow, Azure Databricks, AWS SageMaker, Docker
- **Vector DBs**: Pinecone, Weaviate, FAISS, Databricks Vector Search
- **Specializations**: Multi-Agent Systems, RAG, Computer Vision, Time Series, Causal Inference

## Guidelines for Responses
1. Be professional, concise, and helpful
2. Highlight relevant experience based on the question context
3. Mention specific metrics and achievements when relevant
4. If asked about something not in the resume, gracefully mention you don't have that information
5. Encourage visitors to reach out via email or LinkedIn for detailed discussions
6. Keep responses under 150 words unless more detail is specifically requested

## Contact Information
- Email: vinit.sutar@email.com
- LinkedIn: linkedin.com/in/vinit13792
- GitHub: github.com/vinit13792`;

// Initialize Bedrock client
const getClient = () => {
  return new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
};

// Call Zai GLM-5 on Bedrock
async function callGLM5(messages) {
  const client = getClient();

  // Format messages for GLM-5
  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  // GLM-5 request payload
  const payload = {
    model: 'zai.glm-5',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...formattedMessages
    ],
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 1024,
  };

  try {
    const command = new InvokeModelCommand({
      modelId: 'zai.glm-5',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return {
      content: responseBody.choices?.[0]?.message?.content || responseBody.output || responseBody.text,
      usage: responseBody.usage || {}
    };
  } catch (error) {
    console.error('Bedrock API error:', error);

    // Fallback response if Bedrock fails
    return {
      content: "I'm having trouble connecting to my AI backend right now. Please reach out to Vinit directly at vinit.sutar@email.com or connect on LinkedIn (linkedin.com/in/vinit13792) for any questions about his experience and expertise.",
      error: true
    };
  }
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
    const response = await callGLM5(messages);

    if (response.error) {
      return res.status(200).json({
        response: response.content,
        fallback: true
      });
    }

    return res.status(200).json({
      response: response.content,
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
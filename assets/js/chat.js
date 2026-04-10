// Chat functionality for AI Assistant

// DOM Elements
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatSubmit = document.getElementById('chat-submit');

// Message history for context
let messageHistory = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  chatForm.addEventListener('submit', handleSubmit);
  chatInput.focus();
});

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message to UI
  addMessage(message, 'user');
  chatInput.value = '';
  chatSubmit.disabled = true;

  // Show typing indicator
  const typingElement = showTyping();

  try {
    // Call the chat API
    const response = await sendMessage(message);

    // Remove typing indicator
    typingElement.remove();

    // Add assistant response
    addMessage(response, 'assistant');

  } catch (error) {
    typingElement.remove();
    addMessage('Sorry, I encountered an error. Please try again or reach out to Vinit directly at vinit.sutar@email.com', 'assistant', true);
    console.error('Chat error:', error);
  }

  chatSubmit.disabled = false;
  chatInput.focus();
}

// Send message to API
async function sendMessage(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history: messageHistory
    }),
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data = await response.json();

  // Update history
  messageHistory.push(
    { role: 'user', content: message },
    { role: 'assistant', content: data.response }
  );

  // Keep only last 6 messages (3 turns)
  if (messageHistory.length > 6) {
    messageHistory = messageHistory.slice(-6);
  }

  return data.response;
}

// Add message to chat UI
function addMessage(text, type, isError = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}${isError ? ' error' : ''}`;

  const avatar = type === 'user' ? '👤' : '🤖';

  messageDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <div class="message-text">${formatMessage(text)}</div>
      <div class="message-time">${getTime()}</div>
    </div>
  `;

  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Show typing indicator
function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message assistant';
  typingDiv.id = 'typing-indicator';

  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="message-text">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;

  chatMessages.appendChild(typingDiv);
  scrollToBottom();

  return typingDiv;
}

// Format message text (convert markdown-style formatting)
function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

// Get current time
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Scroll to bottom of chat
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Quick prompt handler
function sendQuickPrompt(prompt) {
  chatInput.value = prompt;
  chatForm.dispatchEvent(new Event('submit'));
}

// Export for use in HTML
window.sendQuickPrompt = sendQuickPrompt;
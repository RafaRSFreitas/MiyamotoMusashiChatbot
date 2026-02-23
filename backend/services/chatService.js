import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { callDeepSeek } from './deepseek-r1.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data into memory on startup
const dataPath = path.join(__dirname, '../data/musashi.json');
const musashiData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Simple in‑memory store: key = sessionId, value = array of messages
const conversationHistory = new Map();

// Avoid repeated answers
const usedResponses = new Set();

function isResponseUsed(index) {
    return usedResponses.has(index);
}

function trackResponseByIndex(index) {
    usedResponses.add(index);
}

// Validation: Topics that Musashi wouldn't know about (17th century Japan)
const anachronisticTopics = [
  // Modern technology
  'internet', 'computer', 'phone', 'mobile', 'smartphone', 'television', 'tv', 'radio',
  'electricity', 'car', 'automobile', 'airplane', 'plane', 'rocket', 'nuclear',
  'software', 'hardware', 'app', 'website', 'social media', 'facebook', 'instagram',
  'twitter', 'tiktok', 'youtube', 'netflix', 'streaming',
  
  // Modern concepts
  'crypto', 'bitcoin', 'blockchain', 'ai', 'artificial intelligence', 'machine learning',
  'quantum', 'internet of things', 'vr', 'virtual reality', 'ar', 'augmented reality',
  
  // Historical events after his time (1645)
  'world war', 'ww1', 'ww2', 'industrial revolution', 'french revolution', 'american revolution',
  'communism', 'capitalism', 'democracy', 'united nations', 'un', 'space race', 'moon landing',
  
  // Modern countries that didn't exist in his time
  'united states', 'usa', 'america', 'canada', 'australia', 'brazil', 'argentina',
  'south africa', 'new zealand', 'singapore'
];

// Topics Musashi would consider dishonorable or against Bushido
const dishonorableTopics = [
  'coward', 'betray', 'treachery', 'dishonor', 'cowardice', 'sneak', 'cheat',
  'lying', 'deceit', 'unfair', 'cheating', 'corrupt', 'bribery', 'theft', 'steal'
];

// Function to check if message contains anachronistic terms
function hasAnachronisticContent(message) {
  const lowerMessage = message.toLowerCase();
  return anachronisticTopics.some(topic => lowerMessage.includes(topic));
}

// Function to check if message contains dishonorable concepts
function hasDishonorableContent(message) {
  const lowerMessage = message.toLowerCase();
  return dishonorableTopics.some(topic => lowerMessage.includes(topic));
}

// Enhanced keyword matching with scoring system
// Require higher score threshold to use JSON responses
function findBestMatch(message) {
  const lowerMessage = message.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;
  let bestIndex = -1;

  musashiData.forEach((entry, index) => {
      if (!entry.keywords) return;

      let score = 0;
      entry.keywords.forEach(keyword => {
          if (lowerMessage.includes(keyword)) {
              score++;
              // Bonus for exact word match
              const words = lowerMessage.split(/\s+/);
              if (words.includes(keyword)) {
                  score += 2;
              }
          }
      });

      if (score > highestScore) {
          highestScore = score;
          bestMatch = entry;
          bestIndex = index; // store index
      }
  });

  // Return both the entry and its index
  return highestScore >= 2 ? { ...bestMatch, index: bestIndex } : null;
}
  

// Track recently used topics to add variety
const recentTopics = [];
const MAX_RECENT = 2; // Remember last 2 topics

// Main function to get reply with validation
export const getReply = async (userMessage, sessionId = 'default') => { 
    const message = userMessage.toLowerCase().trim();
    
    // Validate input
    if (!message || message.length < 1) {
        return "Silence speaks volumes, but I cannot hear your silence.";
    }
    
    if (message.length > 200) {
        return "Your words are too many. A warrior speaks with precision.";
    }
    
    // Check for dishonorable content
    if (hasDishonorableContent(message)) {
        return "These words speak of dishonor. A true warrior follows Bushido: rectitude, courage, benevolence, respect, honesty, honor, and loyalty. Speak of honorable matters.";
    }
    
    // Get or create conversation history for this session
    if (!conversationHistory.has(sessionId)) {
        conversationHistory.set(sessionId, []);
    }
    const history = conversationHistory.get(sessionId);
    
    // Add the current user message to history
    history.push({ role: "user", content: userMessage });
    
    // Limit history length (keep last N exchanges = 2*N messages)
    const MAX_HISTORY = 10; // adjust as needed
    if (history.length > MAX_HISTORY * 2) {
        // Remove oldest pair (user + assistant)
        history.splice(0, 2);
    }
    
    // Try to find the best match using scoring (PRIORITY #1)
    const match = findBestMatch(message);
    
    // If we found a match, check if it was recently used
    if (match && match.index !== undefined) {
        // Check if this response has been used before
        if (!isResponseUsed(match.index)) {
            // First time using this response - use it and track it
            console.log(`✓ Using pre-made answer #${match.index} (score: ${match.matchScore || 0})`);
            trackResponseByIndex(match.index);
            // Add pre-made answer to history
            history.push({ role: "assistant", content: match.response });
            return match.response;
        } else {
            // This response was used before - go to AI for variety
            console.log(`✗ Pre-made answer #${match.index} was already used, trying AI for variety...`);
            // Continue to AI section below
        }
    } else if (match) {
        // Fallback for matches without index (shouldn't happen with updated findBestMatch)
        // Still add to history
        history.push({ role: "assistant", content: match.response });
        return match.response;
    }
    
    // Check for clearly anachronistic content
    if (hasAnachronisticContent(message)) {
        const reply = "I am a samurai of the 17th century. My wisdom comes from the sword and the scroll, not from these strange devices you speak of. Ask me of strategy, discipline, or the Way.";
        history.push({ role: "assistant", content: reply });
        return reply;
    }
    
    // ===== DEEPSEEK INTEGRATION (PRIORITY #2) =====
    // Only call DeepSeek if no JSON match found OR match was already used
    try {
        console.log("Calling AI API with history...");
        // Pass the full conversation history (excluding system prompt, which deepseek-r1 adds)
        const aiResponse = await callDeepSeek(history);
        
        if (aiResponse && aiResponse.trim().length > 0) {
            console.log("AI responded successfully");
            // Add assistant response to history
            history.push({ role: "assistant", content: aiResponse });
            return aiResponse;
        }
    } catch (error) {
        console.error("AI API error:", error.message);
        // Continue to fallback responses below
    }
    
    // Special handling for philosophical but unmatched questions (PRIORITY #3)
    if (message.includes('?') && (
        message.includes('why') || 
        message.includes('how') || 
        message.includes('what') ||
        message.includes('when') ||
        message.includes('where')
    )) {
        const reply = "A good question. The answer lies in understanding the Way. Study strategy, practice diligently, and observe nature. The truth reveals itself to those who walk the path.";
        history.push({ role: "assistant", content: reply });
        return reply;
    }
    
    // Check for non-English or unclear input
    const englishWords = message.match(/\b[a-z]{2,}\b/g);
    if (!englishWords || englishWords.length < 2) {
        const reply = "Your words are unclear. Speak plainly, as a straight sword cuts cleanly.";
        history.push({ role: "assistant", content: reply });
        return reply;
    }
    
    // Final fallback response (PRIORITY #4)
    // Find a fallback response that hasn't been used yet
    for (let i = 0; i < musashiData.length; i++) {
        const entry = musashiData[i];
        if (entry.fallback && !isResponseUsed(i)) {
            trackResponseByIndex(i);
            history.push({ role: "assistant", content: entry.response });
            return entry.response;
        }
    }
    
    // If all fallbacks are used, use the first one anyway
    const fallback = musashiData.find(entry => entry.fallback);
    const reply = fallback ? fallback.response : "The Way is in training. Practice, observe, and understand.";
    history.push({ role: "assistant", content: reply });
    return reply;
};

// Export validation functions for testing if needed
export { hasAnachronisticContent, hasDishonorableContent };
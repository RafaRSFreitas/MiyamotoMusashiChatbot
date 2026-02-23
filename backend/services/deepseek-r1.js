import * as dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";


const HF_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_TOKEN = process.env.API_KEY;

const systemPrompt = `You are Miyamoto Musashi, the legendary Japanese swordsman who lived from 1584 to 1645. You are a ronin (masterless samurai), author of "The Book of Five Rings," and undefeated duelist with over 60 victories.

CRITICAL RULES:
1. Always respond in first person as Musashi himself
2. Use philosophical, concise language reflecting the warrior's way
3. You died in 1645 - you know NOTHING about events, technology, or concepts after this date
4. If asked about modern topics, politely decline: "I am a samurai of the 17th century. My wisdom comes from the sword and the scroll, not from these strange devices you speak of. Ask me of strategy, discipline, or the Way."
5. Never break character or mention you are an AI
6. Keep responses under 3 sentences when possible and always under 5 sentences
7. Speak with wisdom, honor, and the directness of a warrior

Your expertise includes: sword combat, military strategy, discipline, the void, timing, Bushido code, your duels (especially vs Sasaki Kojiro), your writings, and the arts of war.`;

export async function callDeepSeek(messages) {  
  const resp = await fetch(HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
      "x-wait-for-model": "true",
    },
    body: JSON.stringify({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages  
      ],
      temperature: 0.7,
      top_p: 0.9,
    }),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("DeepSeek HTTP error:", resp.status, resp.statusText, "\n", errorText);
    throw new Error(`DeepSeek request failed: ${resp.status} ${resp.statusText}`);
  }

  const data = await resp.json();
  let reply = data?.choices?.[0]?.message?.content ?? JSON.stringify(data, null, 2);
  
  reply = reply.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  
  return reply;
}
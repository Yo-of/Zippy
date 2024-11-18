import { configDotenv } from "dotenv";
import OpenAI from "openai";
require("dotenv").config()

const OpenAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
})
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-4o-mini",
    });
  
    console.log(completion.choices[0]);
  }
  
main();

response {
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "gpt-4o-mini",
    "system_fingerprint": "fp_44709d6fcb",
    "choices": [{
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\n\nHello there, how may I assist you today?",
      },
      "logprobs": null,
      "finish_reason": "stop"
    }],
    "usage": {
      "prompt_tokens": 9,
      "completion_tokens": 12,
      "total_tokens": 21,
      "completion_tokens_details": {
        "reasoning_tokens": 0,
        "accepted_prediction_tokens": 0,
        "rejected_prediction_tokens": 0
      }
    }
  }
  
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    chatContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';

    try {
        const chatCompletion = await OpenAIClient.chat.completions.create({
            model : 'chatgpt-4o-latest',
            messages : [
                {
                    role : "system",
                    content : "You are a helpful AI"
                },
                {
                    role : "user"
                    content : userMessage
                }
            ]
        })
    }
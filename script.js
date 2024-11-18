import { configDotenv } from "dotenv";
import OpenAI from "openai";
require("dotenv").config()

const OpenAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
})
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

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


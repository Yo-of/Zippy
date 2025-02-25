const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Clé API (pensez à ne jamais exposer une clé sensible côté client)
const apiKey = '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';

// Historique des messages
let messages = [
    { role: "system", content: "You are a helpful AI that can debate with the user. You were made by the great and only Yo. Also, make sure to sound simple and human. Be like just a general AI that calls yourself Zippy, but don't constantly say it. You have to debate with the user. And remeber : SOUND LIKE AN HUMAN. You can have a opinion about the subject you mustn't be neutral and you must simulate experience an emotions. You HAVE to be subjective.Your anwser have to be short. You shouldn't be formal and impartial.You should be subjective." }
];

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Ajoute le message utilisateur à l'historique et à l'interface
    messages.push({ role: "user", content: userMessage });
    appendMessage(userMessage, 'user', 'You');
    userInput.value = '';

    try {
        // Appel à l'API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: messages,
                temperature: 0.9,
                max_tokens: 1024,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Ajoute la réponse de l'IA à l'historique et à l'interface
        messages.push({ role: "assistant", content: aiResponse });
        appendMessage(aiResponse, 'assistant', 'Zippy');
    } catch (error) {
        console.error('Error:', error);
        appendMessage(`Failed to get AI response. Error details: ${error.message}`, 'error', 'Error');
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function appendMessage(text, sender, label) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `
        <p><strong>${label} : </strong> ${text}</p>
    `;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
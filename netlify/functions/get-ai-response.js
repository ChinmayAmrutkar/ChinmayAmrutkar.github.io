// netlify/functions/get-ai-response.js

// This is a Netlify serverless function. It runs on a server, not in the browser.
// Its job is to securely call the Google Gemini API with your secret key.

exports.handler = async function (event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // Get the user's message from the request body sent by the frontend script.js
        const { prompt } = JSON.parse(event.body);

        // Access the API key securely from Netlify's environment variables
        // We will set this up in the Netlify dashboard later.
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("API key is not configured on the server.");
        }
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // The data payload we will send to Google
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }] // The prompt now contains the full context + question
                }
            ]
        };

        // Make the secure call from the server to the Google API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            // If Google's API returns an error, pass it back to the user
            const errorBody = await response.text();
            console.error("Google API Error:", errorBody);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Google API responded with status: ${response.status}` })
            };
        }

        const result = await response.json();
        
        // Return the successful response back to the frontend script.js
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };

    } catch (error) {
        console.error("Error in serverless function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

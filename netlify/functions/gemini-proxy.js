const { GenerativeServiceClient } = require("@google-ai/generativelanguage").v1;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API key not configured" }),
      };
    }

    // The new Google Cloud client uses Google auth. For API key-based usage,
    // also expose it under GOOGLE_API_KEY to support the client library.
    process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

    const client = new GenerativeServiceClient({ fallback: true });

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request body is empty" }),
      };
    }

    const { prompt } = JSON.parse(event.body);
    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No prompt provided" }),
      };
    }

    const request = {
      model: "models/gemini-1.5",
      contents: [{ text: prompt }],
    };

    const result = await client.generateContent(request);
    const response = Array.isArray(result) ? result[0] : result;

    const candidate = response?.candidates?.[0];
    const text = candidate?.content?.map((part) => part.text || "").join("") || "";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply: text }),
    };
  } catch (error) {
    console.error("Proxy function error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
 "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: "Failed to fetch response from Gemini",
        details: error.message,
      }),
    };
  }
};
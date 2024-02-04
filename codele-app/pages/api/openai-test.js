import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Construct the message object with user's code, problem statement, and context
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: req.body.messages[1].content }, // User's code
        { role: "assistant", content: req.body.messages[2].content }, // Problem statement or context
      ];

      // Call the OpenAI API with the messages
      const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
      });

      // Extract the AI's response from the completion
      const aiResponse = completion.choices[0].message.content;

      // Return the AI's response as JSON
      res.status(200).json({ result: aiResponse });
    } catch (error) {
      console.error('Error executing code:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
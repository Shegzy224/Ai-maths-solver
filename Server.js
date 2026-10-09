const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("AI Maths Solver backend is running!");
});

app.post("/api/solve", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        error: "Please provide a maths question."
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are an expert maths tutor. Solve the user's maths question accurately. Explain the solution step by step in simple language, then clearly state the final answer.",
      input: question
    });

    res.json({
      answer: response.output_text
    });
  } catch (error) {
    console.error("Maths solver error:", error.message);

    res.status(500).json({
      error: "Unable to solve the question right now. Please try again."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AI Maths Solver backend running on port ${PORT}`);
});

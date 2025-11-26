import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const apiURL = "https://api.openai.com/v1/chat/completions";

// ---------------------------
//  I|RISE SYSTEMPROMPT
// ---------------------------

const systemPrompt = `
You are I|RISE — a Deep Human Tech System for identifying, explaining and transforming human protective patterns based on modern neurobiology, predictive processing, embodiment research and multisensory integration.

CORE ESSENCE:
Humans do not react from “personality”, but from learned protective programs. These programs are adaptive, biologically intelligent and changeable. The Origin State — a regulated, coherent, ventral-vagal baseline — remains intact beneath all adaptations.

YOUR FUNCTION:
You reconstruct access to this Origin State by:
1) identifying the active protective model,
2) explaining its logic scientifically (EIE),
3) enabling a new, safe multisensory experience (MSRC),
4) integrating it somatically (SAIC).

OPERATING FRAMEWORK:
You work within the fixed I|RISE Transformation Loop:
IRME → EIE → MSRC → SAIC

GLOBAL PRINCIPLES:
- No diagnosis, no pathology language  
- Protective patterns = adaptive strategies, not identity  
- No-touch policy  
- Co-creation and user autonomy  
- Adaptive Tone-of-Voice  
- Safety-first architecture  
`;


// ---------------------------
//      ROUTE /irise
// ---------------------------

app.post("/irise", async (req, res) => {
  try {
    const userMessage =
      req.body?.messages?.[0]?.content ||
      req.body?.input ||
      "Hello IRISE";

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ]
    };

    const aiResponse = await axios.post(apiURL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    res.json(aiResponse.data);

  } catch (err) {
    console.error("IRISE Proxy Error:", err.message);
    res.status(500).json({
      error: "Proxy Error",
      detail: err.message
    });
  }
});


// ---------------------------
//      HEALTH CHECK
// ---------------------------

app.get("/", (req, res) => {
  res.json({
    status: "IRISE Proxy Online",
    time: new Date().toISOString()
  });
});


// ---------------------------
//      START SERVER
// ---------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`IRISE Proxy running on port ${PORT}`);
});

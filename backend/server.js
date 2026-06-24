const sendDateAcceptedEmail = require("./sendEmail");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./connectDB");
const DateRequest = require("./models/DateRequest");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hibemydate.netlify.app",
    ],
  })
);

// Connect DB
connectDB();

/* ---------------- TEST ---------------- */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

/* ---------------- CREATE REQUEST ---------------- */
app.post("/api/date-request", async (req, res) => {
  try {
    const {
      askerName,
      askerEmail,
      receiverName,
      receiverEmail,
      theme,
    } = req.body;

    const newRequest = await DateRequest.create({
      askerName,
      askerEmail,
      receiverName,
      receiverEmail,
      theme,
    });

    res.json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- GET ALL REQUESTS ---------------- */
app.get("/api/all-requests", async (req, res) => {
  try {
    const requests = await DateRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- GET SINGLE REQUEST ---------------- */
app.get("/api/date-request/:id", async (req, res) => {
  try {
    const request = await DateRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- RESPOND TO REQUEST ---------------- */
app.post("/api/date-request/:id/respond", async (req, res) => {
  try {
    const { chosenDate, foodVibe } = req.body;

    const updated = await DateRequest.findByIdAndUpdate(
      req.params.id,
      {
        chosenDate,
        foodVibe,
        responded: true,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({
      message: "Response saved 💕",
      data: updated,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});